"""
Adversarial regression test for the 15-panel Intesa microsite
(Executive working session agenda + Itaú panel + Live workflow preview +
executive refinement).

Panel index map (15 main + 1 appendix):
  0  Hero / opening
  1  Executive working session (Agenda)  ← NEW
  2  Execution gap
  3  Current state
  4  Discovery (executive alignment)
  5  Modernization demo (P5 BusinessImpact)
  6  Live workflow preview (P5b)
  7  Enterprise trust
  8  Capacity redeployment
  9  ROI signal
  10 Itaú enterprise reference  (counter teaser still visible here)
  11 Counter climax (reveal panel)
  12 4-week pilot
  13 Mutual commitment
  14 Final ask / closing
  15 Appendix

Tests:
  A. Overflow on dense panels at 1440x900 + 1280x800 + 1366x768
  B. Counter reveal moves from idx 10 -> idx 11
  C. Itaú panel content (idx 10): 4 KPI tiles, Factory workflow, Gartner source
  D. Panel 7 capacity formula (idx 8): 400 / 30% / 120
  E. Panel 4 discovery (idx 4): 3 Strategic Q + 2 Detail question + new headline
  F. Panel 5 demo (idx 5): repo disclaimer
  G. Panel 12 + 13 (idx 13, 14): jointly governed + Commercial alignment
  H. Sales-methodology sweep (full HTML): 0 occurrences
  I. Appendix toggle moves to idx 15, Esc returns to idx 14
  J. Wheel handler regression: deltaY=200 from idx 0 -> active becomes 1
  K. Live workflow preview (idx 6): 4 steps + executive insight + disclaimer
  L. Counter climax (idx 11): framing line + dev-equivalent translation +
     business interpretation
  M. Enterprise alignment refinement statements (P2 / P3 / P5b / P11)
  N. Counter pacing reaches 8–18 envelope at idx 14 (Final ask)
  O. Executive working session agenda (idx 1): 5 focus blocks + subhead
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
# NOTE: idx 11 (counter climax) is intentionally excluded — visiting it would
# set `visited[CLIMAX_INDEX]` and unlock the counter reveal, breaking the
# B1 "teaser still hidden at idx 10" assertion. The climax panel is centered
# text and not at risk of overflow anyway. Test L covers its content.
PANELS_TO_FIT = [
    (1, "panel1b-agenda"),
    (2, "panel2-execution-gap"),
    (3, "panel3-current-state"),
    (4, "panel4-discovery"),
    (5, "panel5-demo"),
    (6, "panel5b-workflow-preview"),
    (7, "panel6-trust"),
    (8, "panel7-capacity"),
    (9, "panel8-roi"),
    (10, "panel9-itau"),
    (12, "panel11-pilot"),
    (13, "panel12-mutual"),
]

# Includes typical laptop viewport (1366x768) and conference-screen at 90% zoom (~1422x800).
VIEWPORTS = [(1440, 900), (1280, 800), (1366, 768)]


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

    # === Test B: counter teaser at idx 10 (Itaú) / reveal at idx 11 (climax) ===
    await goto_panel(page, 10)
    header_at_9 = await get_header_text(page)
    teaser_visible_at_9 = "?" in header_at_9 and "modeled execution capacity reclaimed" not in header_at_9.lower()
    print(f"[{label}] B1: counter teaser at idx 10 -> {'PASS' if teaser_visible_at_9 else 'FAIL'} | header={header_at_9!r}", flush=True)
    results.append({"viewport": label, "test": "B1-teaser-at-idx-9", "passed": teaser_visible_at_9, "header": header_at_9})

    await goto_panel(page, 11)
    header_at_10 = await get_header_text(page)
    revealed_at_10 = "modeled execution capacity reclaimed" in header_at_10.lower()
    print(f"[{label}] B2: counter reveal at idx 11 -> {'PASS' if revealed_at_10 else 'FAIL'} | header={header_at_10!r}", flush=True)
    results.append({"viewport": label, "test": "B2-reveal-at-idx-10", "passed": revealed_at_10, "header": header_at_10})

    # === Test C: Itaú panel content at idx 10 ===
    await goto_panel(page, 10)
    p9_text = await get_section_text(page, 10)
    p9_html = await page.evaluate("""(idx) => document.querySelectorAll('section')[idx].innerHTML""", 10)
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

    # === Test D: Panel 7 capacity formula at idx 7 (was 6) ===
    await goto_panel(page, 8)
    p7_text = await get_section_text(page, 8)
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

    # === Test E: Panel 4 discovery (idx 4) — 3 primary alignment areas + 2 secondary (in accordion) + new headline ===
    await goto_panel(page, 4)
    p4_text = await get_section_text(page, 4)
    p4_html = await page.evaluate("""(idx) => document.querySelectorAll('section')[idx].innerHTML""", 4)
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

    # === Test F: Panel 5 demo (idx 5) — repo disclaimer ===
    await goto_panel(page, 5)
    p5_text = await get_section_text(page, 5)
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

    # === Test G: Panel 12 (idx 13) Mutual + Panel 13 (idx 14) Final Ask ===
    await goto_panel(page, 13)
    p12_text = await get_section_text(page, 13)
    p12_checks = {
        "jointly governed validation initiative": "jointly governed validation initiative" in p12_text,
        "Success depends not only on technical execution": "Success depends not only on technical execution" in p12_text,
        "go-live transition 'structured validation path'":
            "structured validation path toward broader enterprise deployment" in p12_text.lower(),
    }
    await goto_panel(page, 14)
    p13_text = await get_section_text(page, 14)
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

    # === Test I: appendix toggle moves to idx 15 (15 main panels + 1 appendix) ===
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
    appendix_idx_pass = appendix_state["idx"] == 15
    appendix_text_pass = (
        "discovery framework" in appendix_state["sectionText"].lower()
        and "bulletproof" in appendix_state["sectionText"].lower()
    )
    print(f"[{label}] I1: appendix click -> idx {appendix_state['idx']} (expect 15) -> {'PASS' if appendix_idx_pass else 'FAIL'}", flush=True)
    print(f"[{label}] I2: appendix section text contains discovery framework + bulletproof -> {'PASS' if appendix_text_pass else 'FAIL'}", flush=True)
    results.append({"viewport": label, "test": "I1-appendix-idx", "passed": appendix_idx_pass, "actual_idx": appendix_state["idx"]})
    results.append({"viewport": label, "test": "I2-appendix-text", "passed": appendix_text_pass, "section_text_excerpt": appendix_state["sectionText"][:200]})

    # Esc -> back to last main panel (idx 14)
    await page.keyboard.press("Escape")
    await page.wait_for_timeout(800)
    after_esc = await page.evaluate(
        """() => {
            const scroller = document.querySelector('.no-scrollbar');
            return Math.round(scroller.scrollLeft / scroller.clientWidth);
        }"""
    )
    esc_pass = after_esc == 14
    print(f"[{label}] I3: Esc from appendix -> idx {after_esc} (expect 14) -> {'PASS' if esc_pass else 'FAIL'}", flush=True)
    results.append({"viewport": label, "test": "I3-esc-from-appendix", "passed": esc_pass, "actual_idx": after_esc})

    # === Test K: Live workflow preview at idx 6 ===
    await goto_panel(page, 6)
    p5b_text = await get_section_text(page, 6)
    p5b_html = await page.evaluate("""(idx) => document.querySelectorAll('section')[idx].innerHTML""", 6)
    p5b_checks = {
        "eyebrow 'Live workflow preview'": "live workflow preview" in p5b_text.lower(),
        "step 1 Repository analysis": "Repository analysis" in p5b_text,
        "step 2 Modernization planning": "Modernization planning" in p5b_text,
        "step 3 Controlled execution": "Controlled execution" in p5b_text,
        "step 4 Governance & review": "Governance & review" in p5b_text,
        "sub-bullet Dependency mapping": "Dependency mapping" in p5b_text,
        "sub-bullet Reviewable PR creation": "Reviewable PR creation" in p5b_text,
        "sub-bullet Human approval workflow": "Human approval workflow" in p5b_text,
        "no mock review card": 'data-testid="workflow-review-card"' not in p5b_html,
        "no PR-mock title leakage": "Modernize legacy reconciliation flow" not in p5b_text,
        "exec insight 'not whether AI can generate code'":
            "the question is not whether ai can generate code" in p5b_text.lower(),
        "exec insight 'governance constraints'":
            "operate inside enterprise governance constraints" in p5b_text.lower(),
        "illustrative disclaimer": "illustrative workflow visualization" in p5b_text.lower(),
    }
    p5b_passed = all(p5b_checks.values())
    print(f"[{label}] K: Live workflow preview -> {'PASS' if p5b_passed else 'FAIL'}", flush=True)
    for k, v in p5b_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "K-live-workflow-preview", "passed": p5b_passed, "checks": p5b_checks})

    # === Test L: Counter climax storytelling at idx 11 ===
    await goto_panel(page, 11)
    p10_text = await get_section_text(page, 11)
    p10_checks = {
        "framing 'large-scale modernization'": "large-scale modernization programs often consume" in p10_text.lower(),
        "developer-equivalent translation": "developer-equivalent capacity / year" in p10_text.lower(),
        "engineering hours translation": "engineering hours" in p10_text.lower(),
        "business interpretation 'strategic value'": "strategic value is not reducing engineering teams" in p10_text.lower(),
        "interpretation 'transformation throughput'": "transformation throughput" in p10_text.lower(),
        "dev-equivalent footnote": "developer-equivalent figures are illustrative" in p10_text.lower(),
        "NOT headcount-reduction language": "headcount reduction" not in p10_text.lower() and "workforce replacement" not in p10_text.lower(),
    }
    p10_passed = all(p10_checks.values())
    print(f"[{label}] L: Counter climax storytelling -> {'PASS' if p10_passed else 'FAIL'}", flush=True)
    for k, v in p10_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "L-counter-climax", "passed": p10_passed, "checks": p10_checks})

    # === Test M: Enterprise alignment refinement statements (P2 idx 2 / P3 idx 3 / P5b idx 6 / P11 idx 12) ===
    await goto_panel(page, 2)
    p2_text = await get_section_text(page, 2)
    await goto_panel(page, 3)
    p3_text = await get_section_text(page, 3)
    await goto_panel(page, 6)
    p5b_text_m = await get_section_text(page, 6)
    await goto_panel(page, 12)
    p11_text = await get_section_text(page, 12)
    m_checks = {
        "P2 'Beyond engineering efficiency'":
            "beyond engineering efficiency" in p2_text.lower()
            and "scaling strategic transformation execution" in p2_text.lower(),
        "P3 'transformation constraints are often operational'":
            "transformation constraints are often operational before they are technological"
            in p3_text.lower(),
        "P5b 'not whether AI can generate code'":
            "the question is not whether ai can generate code" in p5b_text_m.lower(),
        "P11 executive framing 'measurable operational outcomes jointly agreed'":
            "measurable operational outcomes jointly agreed" in p11_text.lower(),
        "P11 validation maturity 'operational fit, governance readiness'":
            "operational fit, governance readiness" in p11_text.lower(),
    }
    m_passed = all(m_checks.values())
    print(f"[{label}] M: enterprise alignment refinement -> {'PASS' if m_passed else 'FAIL'}", flush=True)
    for k, v in m_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "M-enterprise-alignment-refinement", "passed": m_passed, "checks": m_checks})

    # === Test N: counter pacing — value at idx 14 must reach the headline 8–18 envelope ===
    # Visit every main panel in order so cumulative add fires for each.
    for idx in range(0, 15):
        await goto_panel(page, idx)
        await page.wait_for_timeout(120)
    header_at_13 = await get_header_text(page)
    # Extract the "≈ X.X–Y.Y" pair from the header.
    m = re.search(r"≈\s*([\d.]+)\s*[–-]\s*([\d.]+)", header_at_13)
    counter_min = float(m.group(1)) if m else 0.0
    counter_max = float(m.group(2)) if m else 0.0
    n_checks = {
        "counter min reaches >= 7.5 at idx 14": counter_min >= 7.5,
        "counter max reaches >= 17.5 at idx 14": counter_max >= 17.5,
        "counter max never exceeds final envelope (<= 18.0)": counter_max <= 18.0,
    }
    n_passed = all(n_checks.values())
    print(
        f"[{label}] N: counter pacing -> {'PASS' if n_passed else 'FAIL'} | "
        f"min={counter_min} max={counter_max}",
        flush=True,
    )
    for k, v in n_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "N-counter-pacing", "passed": n_passed, "min": counter_min, "max": counter_max})

    # === Test O: Executive working session agenda at idx 1 ===
    await goto_panel(page, 1)
    p1b_text = await get_section_text(page, 1)
    o_checks = {
        "eyebrow 'Executive working session'": "executive working session" in p1b_text.lower(),
        "subhead '55-minute strategic discussion'":
            "55-minute strategic discussion" in p1b_text
            and "modernization execution scalability" in p1b_text.lower(),
        "block 1 Transformation Context": "Transformation Context" in p1b_text
            and "current execution constraints" in p1b_text.lower(),
        "block 2 Executive Alignment": "Executive Alignment" in p1b_text
            and "still requires validation" in p1b_text.lower(),
        "block 3 Live Workflow Preview": "Live Workflow Preview" in p1b_text
            and "governance-aware modernization" in p1b_text.lower(),
        "block 4 Enterprise Impact": "Enterprise Impact" in p1b_text
            and "operational leverage" in p1b_text.lower(),
        "block 5 Pilot & Go-Live Path": "Pilot & Go-Live Path" in p1b_text
            and "deployment alignment" in p1b_text.lower(),
        "exactly 5 numbered focus blocks": p1b_text.lower().count("focus") >= 5,
    }
    o_passed = all(o_checks.values())
    print(f"[{label}] O: Executive agenda panel -> {'PASS' if o_passed else 'FAIL'}", flush=True)
    for k, v in o_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "O-executive-agenda", "passed": o_passed, "checks": o_checks})

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
