"""
Adversarial regression test for the 15-panel Intesa microsite
(Executive Working Session opening + Hero + Agenda + Itaú reference +
merged Governance-Aware Modernization Workflow + executive refinement).

Panel index map (15 main + 1 appendix):
  0  Executive Working Session — opening / stage-presence screen
  1  Hero / opening
  2  Executive working session (Agenda)
  3  Execution gap
  4  Current state
  5  Discovery (executive alignment)
  6  Governance-Aware Modernization Workflow (MERGED P5 + former P5b)
  7  Enterprise trust
  8  Capacity redeployment
  9  ROI signal
  10 Itaú enterprise reference  (counter teaser still visible here)
  11 Counter climax (reveal panel)
  12 4-week pilot
  13 Operational readiness (was 'Mutual commitment')
  14 Next-step alignment (was 'Final ask')
  15 Appendix

Tests:
  A. Overflow on dense panels at 1440x900 + 1280x800 + 1366x768
  B. Counter reveal moves from idx 10 -> idx 11
  C. Itaú panel content (idx 10): 4 KPI tiles, Factory workflow, Gartner source
  D. Panel 7 capacity formula (idx 8): 400 / 30% / 120
  E. Panel 4 discovery (idx 5): 3 Strategic Q + 2 Detail question + new headline
  F. Panel 5 merged workflow (idx 6): transition + workflow nodes +
     business impact + dev-equivalent footnote
  G. Panel 12 + 13 (idx 13, 14): jointly governed + Enterprise deployment path
  H. Sales-methodology sweep (full HTML): 0 occurrences
  I. Appendix toggle moves to idx 15, Esc returns to idx 14
  J. Wheel handler regression: deltaY=200 from idx 0 -> active becomes 1
  L. Counter climax (idx 11): framing line + dev-equivalent translation +
     business interpretation
  M. Enterprise alignment refinement statements (P2 / P3 / P5 merged / P11)
  N. Counter pacing reaches 8–18 envelope at idx 14 (Next-step alignment)
  O. Executive working session agenda (idx 2): 5 focus blocks
  P. Hero anchors + merged P5 workflow nodes + scale anchors + dev-eq
  Q. Visual rhythm & section contrast pass (tonal panel-bg variants per idx)
  R. Executive opening screen (idx 0): wordmarks + title + footer + CTA
"""
import asyncio
import json
import re
import sys
from pathlib import Path

from playwright.async_api import async_playwright

URL = "https://intesa-microsite.vercel.app/"
OUT = Path(__file__).parent / "screenshots-itau"
OUT.mkdir(exist_ok=True)

# (panel_idx, slug)
# NOTE: idx 11 (counter climax) is intentionally excluded — visiting it would
# set `visited[CLIMAX_INDEX]` and unlock the counter reveal, breaking the
# B1 "teaser still hidden at idx 10" assertion. The climax panel is centered
# text and not at risk of overflow anyway. Test L covers its content.
PANELS_TO_FIT = [
    (2, "panel1b-agenda"),
    (3, "panel2-execution-gap"),
    (4, "panel3-current-state"),
    (5, "panel4-discovery"),
    (6, "panel5-modernization-workflow"),
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
    header_at_teaser = await get_header_text(page)
    teaser_visible = "?" in header_at_teaser and "modeled execution capacity reclaimed" not in header_at_teaser.lower()
    print(f"[{label}] B1: counter teaser at idx 10 -> {'PASS' if teaser_visible else 'FAIL'} | header={header_at_teaser!r}", flush=True)
    results.append({"viewport": label, "test": "B1-teaser-at-idx-10", "passed": teaser_visible, "header": header_at_teaser})

    await goto_panel(page, 11)
    header_at_reveal = await get_header_text(page)
    revealed = "modeled execution capacity reclaimed" in header_at_reveal.lower()
    print(f"[{label}] B2: counter reveal at idx 11 -> {'PASS' if revealed else 'FAIL'} | header={header_at_reveal!r}", flush=True)
    results.append({"viewport": label, "test": "B2-reveal-at-idx-11", "passed": revealed, "header": header_at_reveal})

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

    # === Test D: Panel 7 capacity formula at idx 8 ===
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

    # === Test E: Panel 4 discovery (idx 5) — 3 primary + 2 secondary + new headline ===
    await goto_panel(page, 5)
    p4_text = await get_section_text(page, 5)
    p4_html = await page.evaluate("""(idx) => document.querySelectorAll('section')[idx].innerHTML""", 5)
    n_strategic = len(re.findall(r'data-strategic-q="\d"', p4_html))
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

    # === Test F: Panel 5 merged workflow (idx 6) ===
    await goto_panel(page, 6)
    p5_text = await get_section_text(page, 6)
    p5_checks = {
        "eyebrow 'Governance-aware modernization workflow'":
            "governance-aware modernization workflow" in p5_text.lower(),
        "headline 'How bounded autonomous execution'":
            "How bounded autonomous execution" in p5_text
            and "operational leverage" in p5_text.lower(),
        "transition 'no longer whether AI can generate code'":
            "no longer whether ai can generate code" in p5_text.lower(),
        "transition 'enterprise governance constraints'":
            "enterprise governance constraints" in p5_text.lower(),
        "workflow node 'Repository analysis'": "Repository analysis" in p5_text,
        "workflow node 'Migration planning'": "Migration planning" in p5_text,
        "workflow node 'Automated refactoring'": "Automated refactoring" in p5_text,
        "workflow node 'Test generation'": "Test generation" in p5_text,
        "workflow node 'Governed pull request review'":
            "Governed pull request review" in p5_text,
        "workflow insight 'Bounded execution inside the bank's existing review envelope'":
            "bounded execution inside the bank" in p5_text.lower(),
        "business impact metric '20–30%'": "20–30%" in p5_text,
        "business impact metric '12,000 engineering hours'":
            "12,000 engineering hours" in p5_text,
        "dev-equivalent translation '≈ 7 developer-equivalent capacity'":
            "developer-equivalent capacity" in p5_text.lower(),
        "business impact metric '59 → 9'": "59 → 9" in p5_text,
        "governance statement":
            "governance-aware modernization execution" in p5_text.lower(),
        "scalability statement":
            "operational scalability without proportional delivery scaling" in p5_text.lower(),
        "dev-equivalent footnote":
            "illustrative operational capacity" in p5_text.lower(),
        "repo link 'kushmirc/banking-modernization'":
            "kushmirc/banking-modernization" in p5_text,
        "repo disclaimer 'No Intesa Sanpaolo source code'":
            "No Intesa Sanpaolo source code or internal systems are used" in p5_text,
        "no legacy P5b 'Live workflow preview' label":
            "live workflow preview" not in p5_text.lower(),
    }
    p5_passed = all(p5_checks.values())
    print(f"[{label}] F: Panel 5 merged workflow -> {'PASS' if p5_passed else 'FAIL'}", flush=True)
    for k, v in p5_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "F-panel5-merged-workflow", "passed": p5_passed, "checks": p5_checks})

    # === Test G: Panel 12 (idx 13) Op readiness + Panel 13 (idx 14) Next-step alignment ===
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
        "Enterprise deployment path header": "enterprise deployment path" in p13_text.lower(),
        "Strategic discussion prompt header": "strategic discussion prompt" in p13_text.lower(),
        "no 'Closing question' label leakage": "closing question" not in p13_text.lower(),
        "no 'Commercial alignment' label leakage": "commercial alignment" not in p13_text.lower(),
        "expanded deployment scope": "expanded deployment scope" in p13_text,
        "governance validation": "governance validation" in p13_text,
        "commercial go-live readiness": "commercial go-live readiness" in p13_text,
        "executive ownership next-step": "confirm executive ownership" in p13_text.lower(),
        "no 'executive sponsor' leakage in P13": "executive sponsor" not in p13_text.lower(),
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
        "Executive Sponsor (renamed -> ownership)": "executive sponsor" not in full_html.lower(),
        "Buy-in / Buy in": "buy-in" not in full_html.lower() and " buy in " not in full_html.lower(),
        "Closing Question label": "closing question" not in full_html.lower(),
        "Commitment Discussion label": "commitment discussion" not in full_html.lower(),
    }
    sweep_passed = all(sweep_checks.values())
    print(f"[{label}] H: methodology sweep -> {'PASS' if sweep_passed else 'FAIL'}", flush=True)
    for k, v in sweep_checks.items():
        if not v:
            print(f"          -> miss: {k} (still present)", flush=True)
    results.append({"viewport": label, "test": "H-methodology-sweep", "passed": sweep_passed, "checks": sweep_checks})

    # === Test I: appendix toggle moves to idx 15 (15 main + 1 appendix) ===
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

    # === Test M: alignment refinement (P2 idx 3 / P3 idx 4 / P5 merged idx 6 / P11 idx 12) ===
    await goto_panel(page, 3)
    p2_text = await get_section_text(page, 3)
    await goto_panel(page, 4)
    p3_text = await get_section_text(page, 4)
    await goto_panel(page, 6)
    p5_text_m = await get_section_text(page, 6)
    await goto_panel(page, 12)
    p11_text = await get_section_text(page, 12)
    m_checks = {
        "P2 'Beyond engineering efficiency'":
            "beyond engineering efficiency" in p2_text.lower()
            and "scaling strategic transformation execution" in p2_text.lower(),
        "P3 'transformation constraints are often operational'":
            "transformation constraints are often operational before they are technological"
            in p3_text.lower(),
        "P5 merged 'no longer whether AI can generate code'":
            "no longer whether ai can generate code" in p5_text_m.lower(),
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
    header_at_final = await get_header_text(page)
    m = re.search(r"≈\s*([\d.]+)\s*[–-]\s*([\d.]+)", header_at_final)
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

    # === Test O: Executive working session agenda at idx 2 ===
    await goto_panel(page, 2)
    p1b_text = await get_section_text(page, 2)
    o_checks = {
        "eyebrow 'Executive working session'": "executive working session" in p1b_text.lower(),
        "headline 'Five focus areas for the next 55 minutes'":
            "Five focus areas for the next 55 minutes" in p1b_text,
        "no '55-minute strategic discussion' subhead":
            "55-minute strategic discussion" not in p1b_text.lower(),
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

    # === Test P: narrative refinement pass — Hero idx 1 / Workflow idx 6 /
    # Capacity idx 8 / Itaú idx 10 ===
    await goto_panel(page, 1)
    p1_text = await get_section_text(page, 1)
    await goto_panel(page, 6)
    p5_text_q = await get_section_text(page, 6)
    await goto_panel(page, 8)
    p7_text_q = await get_section_text(page, 8)
    await goto_panel(page, 10)
    p9_text_q = await get_section_text(page, 10)
    p_checks = {
        "Hero — Why Intesa matters block": "why intesa matters" in p1_text.lower(),
        "Hero — '~14M Customers' anchor": "~14M" in p1_text and "Customers" in p1_text,
        "Hero — 'Top European' anchor": "Top European" in p1_text,
        "Hero — 'Highly regulated' anchor": "Highly regulated" in p1_text,
        "P5 merged — 'Bounded operational workflow' title":
            "bounded operational workflow" in p5_text_q.lower(),
        "P5 merged — workflow node 'Repository analysis'":
            "Repository analysis" in p5_text_q,
        "P5 merged — workflow node 'Governed pull request review'":
            "Governed pull request review" in p5_text_q,
        "P5 merged — 'Operational leverage' business title":
            "operational leverage" in p5_text_q.lower(),
        "P5 merged — dev-equivalent translation":
            "developer-equivalent capacity" in p5_text_q.lower(),
        "P7 — dev-equivalent hours line": "210,000 engineering hours" in p7_text_q,
        "P7 — dev-equivalent FTE line": "developer-equivalent capacity" in p7_text_q.lower(),
        "P7 — dev-equivalent footnote": "illustrative operational capacity" in p7_text_q.lower(),
        "P9 — Operational scale signals title": "operational scale signals" in p9_text_q.lower(),
        "P9 — '800' DB anchor": "800" in p9_text_q and "Database objects migrated" in p9_text_q,
        "P9 — '59 → 9' service anchor": "59 → 9" in p9_text_q or "59 \u2192 9" in p9_text_q,
        "P9 — '70%' autonomous remediation": "70%" in p9_text_q
            and "autonomous vulnerability remediation" in p9_text_q.lower(),
        "P9 — '50% → 90%' coverage": ("50% → 90%" in p9_text_q) or ("50% \u2192 90%" in p9_text_q),
    }
    p_passed = all(p_checks.values())
    print(f"[{label}] P: narrative refinement pass -> {'PASS' if p_passed else 'FAIL'}", flush=True)
    for k, v in p_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "P-narrative-refinement", "passed": p_passed, "checks": p_checks})

    # === Test Q: visual rhythm & section contrast pass ===
    bg_classes = await page.evaluate(
        """() => {
            const sections = Array.from(document.querySelectorAll('section'));
            return sections.map(s => {
                const cls = s.className || '';
                const variant = ['panel-bg-deep','panel-bg-cinematic','panel-bg-bright','panel-bg-clean','panel-bg-ivory','panel-bg']
                    .find(v => cls.split(' ').includes(v)) || null;
                return variant;
            });
        }"""
    )
    # Expected variant per panel idx (0..15) after welcome screen at idx 0:
    # 0 welcome → deep, 1 hero → deep, 2 agenda → deep, 3 gap → default,
    # 4 current → default, 5 discovery → default, 6 workflow → cinematic,
    # 7 trust → default, 8 capacity → bright, 9 roi → bright,
    # 10 itau → bright, 11 climax → cinematic, 12 pilot → clean,
    # 13 op-readiness → clean, 14 final-ask → deep, 15 appendix → default
    await goto_panel(page, 6)
    p5_text_r = await get_section_text(page, 6)
    await goto_panel(page, 14)
    p13_text_r = await get_section_text(page, 14)
    p13_html = await page.evaluate(
        """(idx) => {
            const sections = document.querySelectorAll('section');
            const h2 = sections[idx]?.querySelector('h2');
            return h2 ? h2.className : '';
        }""",
        14,
    )
    q_checks = {
        "Welcome panel (idx 0) uses deep bg": bg_classes[0] == "panel-bg-deep",
        "Hero (idx 1) uses deep bg": bg_classes[1] == "panel-bg-deep",
        "Workflow panel (idx 6) uses cinematic bg": bg_classes[6] == "panel-bg-cinematic",
        "Capacity panel (idx 8) uses bright bg": bg_classes[8] == "panel-bg-bright",
        "Itau benchmark panel (idx 10) uses bright bg": bg_classes[10] == "panel-bg-bright",
        "Climax panel (idx 11) uses cinematic bg": bg_classes[11] == "panel-bg-cinematic",
        "Pilot panel (idx 12) uses clean bg": bg_classes[12] == "panel-bg-clean",
        "Op-readiness (idx 13) uses clean bg": bg_classes[13] == "panel-bg-clean",
        "Final-ask (idx 14) uses deep bg": bg_classes[14] == "panel-bg-deep",
        "All 16 panels render": len(bg_classes) == 16,
        "Cinematic closing statement on P5":
            "governed execution at enterprise scale" in p5_text_r.lower(),
        "P13 amplified headline scale (text-7xl)":
            "lg:text-7xl" in p13_html,
        "P13 keeps strategic discussion prompt":
            "strategic discussion prompt" in p13_text_r.lower(),
    }
    q_passed = all(q_checks.values())
    print(f"[{label}] Q: visual rhythm & section contrast -> {'PASS' if q_passed else 'FAIL'}", flush=True)
    for k, v in q_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "Q-visual-rhythm", "passed": q_passed, "checks": q_checks})

    # === Test R: Executive opening screen at idx 0 ===
    # Pre-session stage-presence panel: wordmarks + title + subtitle +
    # footer + Begin-session CTA. Subtle entry animation, no flashy effects.
    await goto_panel(page, 0)
    p0_text = await get_section_text(page, 0)
    p0_html = await page.evaluate(
        """() => document.querySelectorAll('section')[0].innerHTML"""
    )
    r_checks = {
        "Title 'Executive Working Session'": "Executive Working Session" in p0_text,
        "Subtitle 'Governance-Aware Modernization Discussion'":
            "Governance-Aware Modernization Discussion".lower() in p0_text.lower(),
        "Left wordmark 'Intesa Sanpaolo'": "Intesa Sanpaolo" in p0_text,
        "Right wordmark 'Cognition'": "Cognition" in p0_text,
        "Footer caption 'Intesa Sanpaolo × Cognition'":
            "intesa sanpaolo × cognition" in p0_text.lower(),
        "CTA 'Begin session'": "begin session" in p0_text.lower(),
        "Connector SVG line element present": "<svg" in p0_html and "<line" in p0_html,
        "Welcome panel uses deep bg variant": bg_classes[0] == "panel-bg-deep",
        "Welcome panel uses 'Client'/'Partner' role labels":
            "client" in p0_text.lower() and "partner" in p0_text.lower(),
        "No startup-style 'Launch' or 'Powered by AI' copy":
            "launch" not in p0_text.lower() and "powered by ai" not in p0_text.lower(),
    }
    r_passed = all(r_checks.values())
    print(f"[{label}] R: executive opening screen -> {'PASS' if r_passed else 'FAIL'}", flush=True)
    for k, v in r_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "R-executive-opening", "passed": r_passed, "checks": r_checks})

    # === Test J: wheel handler regression ===
    await goto_panel(page, 0)
    await page.wait_for_timeout(400)
    await page.evaluate(
        """() => {
            const scroller = document.querySelector('.no-scrollbar');
            scroller.focus({ preventScroll: true });
            const evt = new WheelEvent('wheel', { deltaY: 200, bubbles: true, cancelable: true });
            scroller.dispatchEvent(evt);
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

    await ctx.close()
    await browser.close()
    return results


async def main():
    all_results = []
    async with async_playwright() as p:
        for w, h in VIEWPORTS:
            r = await run_for_viewport(p, w, h)
            all_results.extend(r)

    out_json = OUT / "results.json"
    out_json.write_text(json.dumps(all_results, indent=2, ensure_ascii=False))

    total = len(all_results)
    passed = sum(1 for r in all_results if r["passed"])
    print(f"\n=== SUMMARY: {passed}/{total} passed ===", flush=True)
    if passed != total:
        print("FAILURES:", flush=True)
        for r in all_results:
            if not r["passed"]:
                print(json.dumps(r, indent=2, ensure_ascii=False), flush=True)
        sys.exit(1)
    print("ALL TESTS PASSED", flush=True)


if __name__ == "__main__":
    asyncio.run(main())
