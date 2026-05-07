"""
Adversarial regression test for the 13-panel Intesa microsite (Itaú panel + executive refinement).

Tests:
  A. Overflow on dense panels (3, 4, 5, 7, 9 [Itaú], 11, 12) at 1280x800 + 1440x900
  B. Counter reveal moves from idx 8 -> idx 9
  C. Itaú panel content (idx 8): 4 KPI tiles, Factory workflow, Gartner source
  D. Panel 7 capacity formula (idx 6): 400 / 30% / 120
  E. Panel 4 (idx 3): 3 Strategic Q + 2 Detail question + new headline
  F. Panel 5 (idx 4): repo disclaimer
  G. Panel 12 + 13 (idx 10, 12): jointly governed + Commercial alignment
  H. Sales-methodology sweep (full HTML): 0 occurrences
  I. Appendix toggle moves to idx 13
  J. Wheel handler regression: deltaY=200 from idx 0 -> active becomes 1
"""
import asyncio
import json
import re
import sys
from pathlib import Path

from playwright.async_api import async_playwright

URL = "https://intesa-devin-microsite.netlify.app/"
OUT = Path(__file__).parent / "screenshots-itau"
OUT.mkdir(exist_ok=True)

# (panel_idx, slug, must-have substrings, must-NOT-have substrings)
PANELS_TO_FIT = [
    (2, "panel3-current-state"),
    (3, "panel4-discovery"),
    (4, "panel5-demo"),
    (6, "panel7-capacity"),
    (8, "panel9-itau"),
    (10, "panel11-pilot"),
    (11, "panel12-mutual"),
]

VIEWPORTS = [(1440, 900), (1280, 800)]


async def goto_panel(page, idx: int):
    await page.evaluate(
        """(idx) => {
            const scroller = document.querySelector('.no-scrollbar');
            if (!scroller) return null;
            scroller.scrollTo({ left: scroller.clientWidth * idx, behavior: 'auto' });
            // Force a synchronous layout to flush scroll handler.
            void scroller.offsetWidth;
            return scroller.scrollLeft;
        }""",
        idx,
    )
    await page.wait_for_timeout(800)


async def measure(page, idx: int):
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
                innerScrollHeight: inner.scrollHeight,
                innerClientHeight: inner.clientHeight,
                viewportH: window.innerHeight,
                overflowsInner: inner.scrollHeight - inner.clientHeight,
                overflowsViewport: ir.bottom - window.innerHeight,
                text: sec.innerText,
            };
        }""",
        idx,
    )


async def get_section_text(page, idx: int):
    return await page.evaluate(
        """(idx) => {
            const sections = document.querySelectorAll('section');
            const sec = sections[idx];
            return sec ? sec.innerText : '';
        }""",
        idx,
    )


async def get_header_text(page):
    return await page.evaluate(
        """() => document.querySelector('header')?.innerText || ''"""
    )


def assert_contains(haystack: str, needle: str, case_insensitive=False) -> bool:
    if case_insensitive:
        return needle.lower() in haystack.lower()
    return needle in haystack


async def run_for_viewport(p, w: int, h: int):
    label = f"{w}x{h}"
    print(f"\n=== Viewport {label} ===", flush=True)
    browser = await p.chromium.launch(args=["--no-sandbox", "--disable-dev-shm-usage"])
    ctx = await browser.new_context(viewport={"width": w, "height": h}, reduced_motion="reduce")
    page = await ctx.new_page()
    await page.goto(URL, wait_until="networkidle")
    await page.wait_for_selector("section")

    results = []

    # === Test A: overflow regression ===
    for idx, name in PANELS_TO_FIT:
        await goto_panel(page, idx)
        m = await measure(page, idx)
        screenshot_path = OUT / f"{name}_{label}.png"
        await page.screenshot(path=str(screenshot_path), full_page=False)
        passed = m["found"] and m["overflowsInner"] <= 2 and m["overflowsViewport"] <= 2
        print(f"[{label}] A: panel-{idx} ({name}) overflowsInner={m['overflowsInner']:.1f} overflowsViewport={m['overflowsViewport']:.1f} -> {'PASS' if passed else 'FAIL'}", flush=True)
        results.append({"viewport": label, "test": f"A-overflow-{name}", "panel_idx": idx, "passed": passed, "measurement": {k: m.get(k) for k in ("overflowsInner", "overflowsViewport", "innerScrollHeight", "innerClientHeight", "viewportH")}, "screenshot": str(screenshot_path)})

    # === Test B: counter reveal moves to idx 9 ===
    await goto_panel(page, 8)
    header_at_8 = await get_header_text(page)
    teaser_visible_at_8 = "?" in header_at_8 and "modeled execution capacity reclaimed" not in header_at_8.lower()
    print(f"[{label}] B1: counter teaser at idx 8 -> {'PASS' if teaser_visible_at_8 else 'FAIL'} | header={header_at_8!r}", flush=True)
    results.append({"viewport": label, "test": "B1-teaser-at-idx-8", "passed": teaser_visible_at_8, "header": header_at_8})

    await goto_panel(page, 9)
    header_at_9 = await get_header_text(page)
    revealed_at_9 = "modeled execution capacity reclaimed" in header_at_9.lower()
    print(f"[{label}] B2: counter reveal at idx 9 -> {'PASS' if revealed_at_9 else 'FAIL'} | header={header_at_9!r}", flush=True)
    results.append({"viewport": label, "test": "B2-reveal-at-idx-9", "passed": revealed_at_9, "header": header_at_9})

    # === Test C: Itaú panel content at idx 8 ===
    await goto_panel(page, 8)
    p9_text = await get_section_text(page, 8)
    p9_html = await page.evaluate("""(idx) => document.querySelectorAll('section')[idx].innerHTML""", 8)
    itau_checks = {
        "Itaú": "Itaú" in p9_text,
        "20–30% increase": "20–30% increase" in p9_text,
        "15% improvement": "15% improvement" in p9_text,
        "25% reduction": "25% reduction" in p9_text,
        "5–6× faster": "5–6× faster" in p9_text,
        "Factory workflow model": "Factory workflow model" in p9_text or "Factory workflow model".lower() in p9_text.lower(),
        "factory examples (>=4)": sum(1 for ex in ["Dependency upgrades", "Migration preparation", "Test generation", "Remediation", "Documentation"] if ex in p9_text) >= 4,
        "Gartner source label": "Gartner Research" in p9_text and "7778353" in p9_text,
        "Gartner href": "gartner.com/document-reader/document/7778353" in p9_html,
        "governance language": "governance" in p9_text.lower(),
        "illustrative disclaimer": "illustrative" in p9_text.lower(),
    }
    p9_passed = all(itau_checks.values())
    print(f"[{label}] C: Itaú panel content -> {'PASS' if p9_passed else 'FAIL'}", flush=True)
    for k, v in itau_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "C-itau-content", "passed": p9_passed, "checks": itau_checks})

    # === Test D: Panel 7 capacity formula at idx 6 ===
    await goto_panel(page, 6)
    p7_text = await get_section_text(page, 6)
    p7_checks = {
        "400 engineers": "400 engineers" in p7_text,
        "30% repetitive": "30% repetitive" in p7_text.lower() or "× 30% repetitive" in p7_text,
        "120 engineering-equivalent": "120 engineering-equivalent" in p7_text,
        "From repetitive execution": "From repetitive execution" in p7_text,
        "leverage statement (not replacing engineers)": "not replacing engineers" in p7_text.lower(),
    }
    p7_passed = all(p7_checks.values())
    print(f"[{label}] D: Panel 7 capacity formula -> {'PASS' if p7_passed else 'FAIL'}", flush=True)
    for k, v in p7_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "D-panel7-capacity", "passed": p7_passed, "checks": p7_checks})

    # === Test E: Panel 4 (idx 3) — 3 primary alignment areas + 2 secondary (in accordion) + new headline ===
    await goto_panel(page, 3)
    p4_text = await get_section_text(page, 3)
    p4_html = await page.evaluate("""(idx) => document.querySelectorAll('section')[idx].innerHTML""", 3)
    # Count primary cards by data attribute (executive alignment areas)
    n_strategic = len(re.findall(r'data-strategic-q="\d"', p4_html))
    # Count secondary detail items by data attribute (rendered even when <details> is collapsed)
    n_detail = p4_html.count('data-category="detail-question"')
    p4_checks = {
        "headline 'identified so far'": "What has been identified so far" in p4_text,
        "headline 'executive alignment'": "executive alignment" in p4_text.lower(),
        "exactly 3 alignment-area cards": n_strategic == 3,
        "exactly 2 detail questions in accordion": n_detail == 2,
        "Capacity Constraints category": "capacity constraints" in p4_text.lower(),
        "Governance Requirements category": "governance requirements" in p4_text.lower(),
        "Success Criteria category": "success criteria" in p4_text.lower(),
        "Q1 wording": "Where is engineering capacity currently constrained" in p4_text,
    }
    p4_passed = all(p4_checks.values())
    print(f"[{label}] E: Panel 4 discovery -> {'PASS' if p4_passed else 'FAIL'} | strategicQ={n_strategic} detailQ={n_detail}", flush=True)
    for k, v in p4_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "E-panel4-discovery", "passed": p4_passed, "checks": p4_checks, "strategic_count": n_strategic, "detail_count": n_detail})

    # === Test F: Panel 5 (idx 4) — repo disclaimer ===
    await goto_panel(page, 4)
    p5_text = await get_section_text(page, 4)
    p5_checks = {
        "Representative demonstration repository": "Representative demonstration repository" in p5_text,
        "No Intesa Sanpaolo source code": "No Intesa Sanpaolo source code or internal systems are used" in p5_text,
        "kushmirc/banking-modernization": "kushmirc/banking-modernization" in p5_text,
    }
    p5_passed = all(p5_checks.values())
    print(f"[{label}] F: Panel 5 repo disclaimer -> {'PASS' if p5_passed else 'FAIL'}", flush=True)
    for k, v in p5_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "F-panel5-repodisclaimer", "passed": p5_passed, "checks": p5_checks})

    # === Test G: Panel 12 (idx 11) Mutual + Panel 13 (idx 12) Final Ask ===
    await goto_panel(page, 11)
    p12_text = await get_section_text(page, 11)
    p12_checks = {
        "jointly governed validation initiative": "jointly governed validation initiative" in p12_text,
        "Success depends not only on technical execution": "Success depends not only on technical execution" in p12_text,
    }
    await goto_panel(page, 12)
    p13_text = await get_section_text(page, 12)
    p13_checks = {
        "Commercial alignment header": "Commercial alignment" in p13_text or "COMMERCIAL ALIGNMENT" in p13_text,
        "expanded deployment scope": "expanded deployment scope" in p13_text,
        "governance validation": "governance validation" in p13_text,
        "commercial go-live readiness": "commercial go-live readiness" in p13_text,
    }
    g_passed = all(p12_checks.values()) and all(p13_checks.values())
    print(f"[{label}] G: Panel 12 + Panel 13 -> {'PASS' if g_passed else 'FAIL'}", flush=True)
    for k, v in {**p12_checks, **p13_checks}.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "G-mutual-and-final", "passed": g_passed, "checks": {**p12_checks, **p13_checks}})

    # === Test H: sales-methodology sweep (full HTML) ===
    full_html = await page.content()
    sweep_checks = {
        "Champion": full_html.lower().count("champion") == 0,
        "Executive Buyer": "executive buyer" not in full_html.lower(),
        "MEDDIC": "meddic" not in full_html.lower(),
        "MEDDPICC": "meddpicc" not in full_html.lower(),
        "Economic Buyer": "economic buyer" not in full_html.lower(),
        "EB whole-word": not bool(re.search(r"\bEB\b", full_html)),
    }
    sweep_passed = all(sweep_checks.values())
    print(f"[{label}] H: methodology sweep -> {'PASS' if sweep_passed else 'FAIL'}", flush=True)
    for k, v in sweep_checks.items():
        if not v:
            print(f"          -> miss: {k} (still present)", flush=True)
    results.append({"viewport": label, "test": "H-methodology-sweep", "passed": sweep_passed, "checks": sweep_checks})

    # === Test I: appendix toggle moves to idx 13 ===
    await goto_panel(page, 0)
    await page.click("header button[title*='appendix' i]")
    await page.wait_for_timeout(900)
    appendix_state = await page.evaluate(
        """() => {
            const scroller = document.querySelector('.no-scrollbar');
            const cw = scroller.clientWidth;
            const left = scroller.scrollLeft;
            const idx = Math.round(left / cw);
            const sec = document.querySelectorAll('section')[idx];
            return { idx, left, cw, sectionText: sec ? sec.innerText.slice(0, 600) : '' };
        }"""
    )
    appendix_idx_pass = appendix_state["idx"] == 13
    # Appendix uses eyebrow 'Appendix · Discovery framework' + headline starting with 'To bulletproof the business case'.
    appendix_text_pass = (
        "discovery framework" in appendix_state["sectionText"].lower()
        and "bulletproof" in appendix_state["sectionText"].lower()
    )
    print(f"[{label}] I1: appendix click -> idx {appendix_state['idx']} (expect 13) -> {'PASS' if appendix_idx_pass else 'FAIL'}", flush=True)
    print(f"[{label}] I2: appendix section text contains discovery framework + bulletproof -> {'PASS' if appendix_text_pass else 'FAIL'}", flush=True)
    results.append({"viewport": label, "test": "I1-appendix-idx", "passed": appendix_idx_pass, "actual_idx": appendix_state["idx"]})
    results.append({"viewport": label, "test": "I2-appendix-text", "passed": appendix_text_pass, "section_text_excerpt": appendix_state["sectionText"][:200]})

    # Esc -> back to idx 12
    await page.keyboard.press("Escape")
    await page.wait_for_timeout(800)
    after_esc = await page.evaluate(
        """() => {
            const scroller = document.querySelector('.no-scrollbar');
            return Math.round(scroller.scrollLeft / scroller.clientWidth);
        }"""
    )
    esc_pass = after_esc == 12
    print(f"[{label}] I3: Esc from appendix -> idx {after_esc} (expect 12) -> {'PASS' if esc_pass else 'FAIL'}", flush=True)
    results.append({"viewport": label, "test": "I3-esc-from-appendix", "passed": esc_pass, "actual_idx": after_esc})

    # === Test J: wheel handler regression ===
    await goto_panel(page, 0)
    await page.wait_for_timeout(400)
    await page.evaluate(
        """() => {
            const scroller = document.querySelector('.no-scrollbar');
            scroller.dispatchEvent(new WheelEvent('wheel', { deltaY: 200, bubbles: true, cancelable: true }));
        }"""
    )
    await page.wait_for_timeout(900)
    after_wheel = await page.evaluate(
        """() => {
            const scroller = document.querySelector('.no-scrollbar');
            return Math.round(scroller.scrollLeft / scroller.clientWidth);
        }"""
    )
    wheel_pass = after_wheel == 1
    print(f"[{label}] J: wheel deltaY=200 idx 0 -> idx {after_wheel} (expect 1) -> {'PASS' if wheel_pass else 'FAIL'}", flush=True)
    results.append({"viewport": label, "test": "J-wheel-handler", "passed": wheel_pass, "actual_idx": after_wheel})

    await browser.close()
    return results


async def main():
    all_results = []
    async with async_playwright() as p:
        for w, h in VIEWPORTS:
            r = await run_for_viewport(p, w, h)
            all_results.extend(r)

    out = OUT / "results.json"
    out.write_text(json.dumps(all_results, indent=2, ensure_ascii=False))
    failed = [r for r in all_results if not r.get("passed", False)]
    print(f"\n=== SUMMARY: {len(all_results) - len(failed)}/{len(all_results)} passed ===", flush=True)
    if failed:
        print(f"FAILED:")
        for f in failed:
            print(f"  - [{f['viewport']}] {f['test']}", flush=True)
        sys.exit(1)
    print("ALL TESTS PASSED")


if __name__ == "__main__":
    asyncio.run(main())
