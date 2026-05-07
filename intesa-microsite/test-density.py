"""
Adversarial test for the density fix on Panels 3, 4, 5.

For viewports 1440x900 and 1280x800:
  - navigate horizontally to the panel via the inner scroller
  - measure the active section's content container against the viewport
  - PASS if scrollHeight <= clientHeight + 2 AND boundingRect.bottom <= innerHeight + 2
  - capture full-viewport screenshot

Plus regression spot-checks: counter reveal text, appendix toggle, wheel handler.
"""
import asyncio
import json
import os
import sys
from pathlib import Path

from playwright.async_api import async_playwright

URL = "https://intesa-devin-microsite.netlify.app/"
OUT = Path(__file__).parent / "screenshots-density"
OUT.mkdir(exist_ok=True)

PANELS_TO_FIT = [
    (2, "panel3-current-state"),
    (3, "panel4-discovery-gaps"),
    (4, "panel5-modernization-demo"),
]

VIEWPORTS = [
    (1440, 900),
    (1280, 800),
]


async def goto_panel(page, idx: int):
    """Drive the horizontal scroller to a given panel index and wait for snap."""
    await page.evaluate(
        """(idx) => {
            const scroller = document.querySelector('.no-scrollbar');
            if (!scroller) return null;
            scroller.scrollTo({ left: scroller.clientWidth * idx, behavior: 'auto' });
            return { left: scroller.scrollLeft, w: scroller.clientWidth };
        }""",
        idx,
    )
    await page.wait_for_timeout(700)


async def measure_active_panel(page, idx: int):
    """Read overflow / overflow-bottom for the active panel content."""
    return await page.evaluate(
        """(idx) => {
            const sections = document.querySelectorAll('section');
            const sec = sections[idx];
            if (!sec) return { found: false };
            const inner = sec.querySelector(':scope > div');
            const r = sec.getBoundingClientRect();
            const ir = inner.getBoundingClientRect();
            return {
                found: true,
                sectionTop: r.top,
                sectionBottom: r.bottom,
                innerTop: ir.top,
                innerBottom: ir.bottom,
                innerScrollHeight: inner.scrollHeight,
                innerClientHeight: inner.clientHeight,
                innerOffsetHeight: inner.offsetHeight,
                viewportH: window.innerHeight,
                overflowsInner: inner.scrollHeight - inner.clientHeight,
                overflowsViewport: ir.bottom - window.innerHeight,
            };
        }""",
        idx,
    )


async def run_for_viewport(p, w: int, h: int):
    label = f"{w}x{h}"
    print(f"\n=== Viewport {label} ===", flush=True)
    browser = await p.chromium.launch(args=["--no-sandbox", "--disable-dev-shm-usage"])
    ctx = await browser.new_context(
        viewport={"width": w, "height": h},
        reduced_motion="reduce",
    )
    page = await ctx.new_page()
    await page.goto(URL, wait_until="networkidle")
    # Disable framer-motion staggered reveals: prefers-reduced-motion already handled,
    # but also force-resolve viewport-triggered animations by reading layout.
    await page.wait_for_selector("section")

    results = []

    for idx, name in PANELS_TO_FIT:
        await goto_panel(page, idx)
        m = await measure_active_panel(page, idx)
        screenshot_path = OUT / f"{name}_{label}.png"
        await page.screenshot(path=str(screenshot_path), full_page=False)
        passed = (
            m["found"]
            and m["overflowsInner"] <= 2
            and m["overflowsViewport"] <= 2
        )
        print(
            f"[{label}] panel-idx-{idx} ({name}) "
            f"overflowsInner={m['overflowsInner']:.1f}px "
            f"overflowsViewport={m['overflowsViewport']:.1f}px "
            f"-> {'PASS' if passed else 'FAIL'}",
            flush=True,
        )
        results.append({
            "viewport": label,
            "panel_idx": idx,
            "name": name,
            "measurement": m,
            "screenshot": str(screenshot_path),
            "passed": passed,
        })

    # Counter reveal regression: at panel idx 8, header pill should reveal full label.
    await goto_panel(page, 8)
    counter_text = await page.evaluate(
        """() => {
            const header = document.querySelector('header');
            return header ? header.innerText : '';
        }"""
    )
    counter_pass = "Modeled execution capacity reclaimed" in counter_text
    print(f"[{label}] counter-reveal -> {'PASS' if counter_pass else 'FAIL'} | header={counter_text!r}", flush=True)
    results.append({
        "viewport": label,
        "test": "counter_reveal_panel9",
        "header_text": counter_text,
        "passed": counter_pass,
    })

    # Appendix toggle regression: click the Appendix button -> idx 12, dots count == 12, Esc -> back.
    await goto_panel(page, 0)
    appendix_btn = page.locator("header button[title*='appendix' i], header button[title*='Appendix' i]").first
    btn_visible = await appendix_btn.is_visible()
    if not btn_visible:
        print(f"[{label}] appendix-toggle -> FAIL (button not visible)", flush=True)
        results.append({"viewport": label, "test": "appendix_toggle", "passed": False, "reason": "button not visible"})
    else:
        await appendix_btn.click()
        await page.wait_for_timeout(800)
        active_after_click = await page.evaluate(
            """() => {
                const scroller = document.querySelector('.no-scrollbar');
                return scroller ? Math.round(scroller.scrollLeft / scroller.clientWidth) : -1;
            }"""
        )
        dots_count = await page.evaluate(
            """() => document.querySelectorAll('footer button[aria-label^=\"Go to panel\"]').length"""
        )
        await page.screenshot(path=str(OUT / f"appendix-open_{label}.png"))
        await page.keyboard.press("Escape")
        await page.wait_for_timeout(800)
        active_after_esc = await page.evaluate(
            """() => {
                const scroller = document.querySelector('.no-scrollbar');
                return scroller ? Math.round(scroller.scrollLeft / scroller.clientWidth) : -1;
            }"""
        )
        appendix_pass = active_after_click == 12 and dots_count == 12 and active_after_esc == 11
        print(
            f"[{label}] appendix-toggle click->{active_after_click} dots={dots_count} esc->{active_after_esc} "
            f"-> {'PASS' if appendix_pass else 'FAIL'}",
            flush=True,
        )
        results.append({
            "viewport": label,
            "test": "appendix_toggle",
            "active_after_click": active_after_click,
            "dots_count": dots_count,
            "active_after_esc": active_after_esc,
            "passed": appendix_pass,
        })

    # Wheel handler regression: from idx 0, dispatch a real WheelEvent w/ deltaY=100 -> active should become 1.
    await goto_panel(page, 0)
    await page.wait_for_timeout(300)
    # Use page.mouse.wheel to dispatch a realistic small tick (100px), then wait for cooldown.
    await page.mouse.move(w / 2, h / 2)
    await page.mouse.wheel(0, 100)
    await page.wait_for_timeout(900)
    active_after_wheel = await page.evaluate(
        """() => {
            const scroller = document.querySelector('.no-scrollbar');
            return scroller ? Math.round(scroller.scrollLeft / scroller.clientWidth) : -1;
        }"""
    )
    wheel_pass = active_after_wheel == 1
    print(f"[{label}] wheel-handler 0+100px -> active={active_after_wheel} {'PASS' if wheel_pass else 'FAIL'}", flush=True)
    results.append({
        "viewport": label,
        "test": "wheel_advance",
        "active_after_wheel": active_after_wheel,
        "passed": wheel_pass,
    })

    await ctx.close()
    await browser.close()
    return results


async def main():
    all_results = []
    async with async_playwright() as p:
        for w, h in VIEWPORTS:
            all_results.extend(await run_for_viewport(p, w, h))

    # HTML content presence sweep (sanity, decoupled from layout).
    import urllib.request
    html = urllib.request.urlopen(URL).read().decode()
    expected_present = [
        "Where modernization compounds first",
        "Modeled execution capacity reclaimed",
        "Scope a safe slice",
        "Already framed by the Champion",
        "Validated observation",
        "Hypothesis to confirm",
        "Requires executive alignment",
        "kushmirc/banking-modernization",
    ]
    expected_absent = [
        "Modernization safety vs. velocity tension",
        "Release governance bottlenecks",
        "Long testing and validation cycles",
        "How are release risks currently mitigated",
        "How is operational resilience measured",
    ]
    print("\n=== HTML content sweep ===", flush=True)
    for s in expected_present:
        c = html.count(s)
        ok = c >= 1
        print(f"  PRESENT {ok and 'PASS' or 'FAIL'}: {s} (count={c})", flush=True)
        all_results.append({"test": "html_present", "needle": s, "count": c, "passed": ok})
    for s in expected_absent:
        c = html.count(s)
        ok = c == 0
        print(f"  ABSENT  {ok and 'PASS' or 'FAIL'}: {s} (count={c})", flush=True)
        all_results.append({"test": "html_absent", "needle": s, "count": c, "passed": ok})

    out_json = OUT / "results.json"
    out_json.write_text(json.dumps(all_results, indent=2))
    total = len(all_results)
    passed = sum(1 for r in all_results if r.get("passed"))
    print(f"\n=== {passed}/{total} assertions PASS ===", flush=True)
    return 0 if passed == total else 1


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
