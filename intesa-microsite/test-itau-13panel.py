"""
Adversarial regression test for the 14-panel Intesa microsite (post
executive-minimalism pass: standalone counter climax page removed,
Why Now · 2029 replaces former Execution Gap, contextual counter
popover replaces standalone explanation page).

Panel index map (14 main + 1 appendix):
  0  Executive working session — opening / stage-presence screen
  1  Hero / opening
  2  Agenda (5 minimal focus areas: Context / Validation / Workflow /
     Impact / Rollout)
  3  Why now · 2029 (replaces Execution gap)
  4  Current state
  5  Discovery (executive validation)
  6  Governed modernization workflow (MERGED P5 + former P5b)
  7  Enterprise trust
  8  Capacity redeployment
  9  ROI signal
  10 Itaú enterprise reference
  11 4-week pilot
  12 Operational readiness (was 'Mutual commitment')
  13 Next-step alignment (was 'Final ask')
  14 Appendix

Tests:
  A. Overflow on dense panels at 1440x900 + 1280x800 + 1366x768
  B. Counter widget always revealed (no teaser/reveal split) and "?"
     popover surfaces 'Illustrative modernization signal' + 3 bullets
  C. Itaú panel content (idx 10): 4 KPI tiles, Factory workflow, Gartner source
  D. Panel 7 capacity formula (idx 8): 400 / 30% / 120
  E. Panel 4 discovery (idx 5): 3 Strategic Q + 2 Detail question + new headline
  F. Panel 5 merged workflow (idx 6): transition + workflow nodes +
     business impact + dev-equivalent footnote
  G. Panel 12 + 13 (idx 12, 13): jointly governed + Enterprise deployment path
  H. Sales-methodology sweep (full HTML): 0 occurrences
  I. Appendix toggle moves to idx 14, Esc returns to idx 13
  J. Wheel handler regression: deltaY=200 from idx 0 -> active becomes 1
  L. Standalone counter climax page removed; popover-driven minimalism
     replaces the dedicated explanation panel.
  M. Enterprise alignment refinement statements (P2/Why-Now / P3 / P5
     merged / P11)
  N. Counter pacing reaches 8–18 envelope at idx 13 (Next-step alignment)
  O. Minimal executive agenda (idx 2): 5 focus blocks Context /
     Validation / Workflow / Impact / Rollout
  P. Hero anchors + merged P5 workflow nodes + scale anchors + dev-eq
  Q. Visual rhythm & section contrast pass (tonal panel-bg variants per idx)
  R. Executive opening screen (idx 0): wordmarks + title + footer + CTA
  S. Why now · 2029 (idx 3) + savings-language reframe sweep across HTML
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

# (panel_idx, slug). Standalone counter-climax page is removed; pilot
# now sits at idx 11 and op-readiness at idx 12.
PANELS_TO_FIT = [
    (2, "panel1b-agenda"),
    (3, "panel2-why-now-2029"),
    (4, "panel3-current-state"),
    (5, "panel4-discovery"),
    (6, "panel5-modernization-workflow"),
    (7, "panel6-trust"),
    (8, "panel7-capacity"),
    (9, "panel8-roi"),
    (10, "panel9-itau"),
    (11, "panel10-pilot"),
    (12, "panel11-op-readiness"),
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

    # === Test B: counter widget always revealed + popover content ===
    # The standalone climax page is gone; the counter widget itself now
    # carries an "Illustrative modernization signal" popover.
    await goto_panel(page, 1)
    header_early = await get_header_text(page)
    revealed_label_early = (
        "modeled capacity redeployed" in header_early.lower()
        or "capacity redeployed" in header_early.lower()
    )
    print(f"[{label}] B1: counter visible from idx 1 -> {'PASS' if revealed_label_early else 'FAIL'} | header={header_early!r}", flush=True)
    results.append({"viewport": label, "test": "B1-counter-visible-early", "passed": revealed_label_early, "header": header_early})

    # Popover content (open via aria-expanded toggle on the "?" button).
    await page.evaluate(
        """() => {
            const btn = document.querySelector(
                "header button[aria-label='What does this counter represent?']"
            );
            if (btn) btn.click();
        }"""
    )
    await page.wait_for_timeout(450)
    popover_text = await page.evaluate(
        """() => {
            const dialog = document.querySelector(
                "header [role='dialog']"
            );
            return dialog ? dialog.innerText : '';
        }"""
    )
    popover_ok = bool(popover_text) and (
        "illustrative modernization signal" in popover_text.lower()
        and "migration pressure" in popover_text.lower()
        and "execution complexity" in popover_text.lower()
        and "governance constraints" in popover_text.lower()
    )
    print(f"[{label}] B2: counter '?' popover content -> {'PASS' if popover_ok else 'FAIL'} | popover={popover_text!r}", flush=True)
    results.append({"viewport": label, "test": "B2-counter-popover", "passed": popover_ok, "popover_excerpt": (popover_text or "")[:300]})
    # Close the popover so subsequent tests are not affected.
    await page.evaluate("() => document.body.click()")
    await page.wait_for_timeout(150)

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

    # === Test D: Panel 7 capacity redeployment big-number slide at idx 8 ===
    await goto_panel(page, 8)
    p7_text = await get_section_text(page, 8)
    p7_checks = {
        "eyebrow 'Capacity redeployment'": "capacity redeployment" in p7_text.lower(),
        "headline 'From repetitive execution'": "from repetitive execution" in p7_text.lower(),
        "Conservative scenario tile": "conservative" in p7_text.lower(),
        "Realistic scenario tile": "realistic" in p7_text.lower(),
        "~13,600 dev-days": "~13,600 dev-days" in p7_text,
        "~43,500 dev-days": "~43,500 dev-days" in p7_text,
        "≈ 62 developer-equivalents": "62 developer-equivalents" in p7_text,
        "≈ 198 developer-equivalents": "198 developer-equivalents" in p7_text,
        "redeployment line": "capacity redeployed toward strategic modernization initiatives" in p7_text.lower(),
        "calc note '1 developer-equivalent = 220'":
            "1 developer-equivalent = 220" in p7_text,
        "footnote 'illustrative model'":
            "illustrative model based on discovery assumptions" in p7_text.lower(),
        "footnote 'not a headcount target'":
            "not a headcount target" in p7_text.lower(),
        "no legacy '120 engineering-equivalent'":
            "120 engineering-equivalent" not in p7_text,
        "no legacy 'not replacing engineers' framing":
            "not replacing engineers" not in p7_text.lower(),
    }
    p7_passed = all(p7_checks.values())
    print(f"[{label}] D: Panel 7 capacity formula -> {'PASS' if p7_passed else 'FAIL'}", flush=True)
    for k, v in p7_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "D-panel7-capacity", "passed": p7_passed, "checks": p7_checks})

    # === Test E: Panel 4 EB Validation Needed (idx 5) ===
    await goto_panel(page, 5)
    p4_text = await get_section_text(page, 5)
    p4_html = await page.evaluate("""(idx) => document.querySelectorAll('section')[idx].innerHTML""", 5)
    n_strategic = len(re.findall(r'data-strategic-q="\d"', p4_html))
    p4_checks = {
        "eyebrow 'EB Validation Needed'":
            "eb validation needed" in p4_text.lower(),
        "headline 'validate the assumptions'":
            "validate the assumptions" in p4_text.lower(),
        "headline mentions 'business-case strength'":
            "business-case strength" in p4_text.lower(),
        "exactly 3 validation cards": n_strategic == 3,
        "Migration Priority category":
            "migration priority" in p4_text.lower(),
        "Capacity Baseline category":
            "capacity baseline" in p4_text.lower(),
        "Decision Criteria category":
            "decision criteria" in p4_text.lower(),
        "executive confirmation line":
            "these are the assumptions that require executive confirmation"
            in p4_text.lower(),
        "bridge line to Tab 5 (operational workflow)":
            "validated priorities translate into governed operational workflow"
            in p4_text.lower(),
        "no legacy 'Capacity Constraints' label":
            "capacity constraints" not in p4_text.lower(),
        "no legacy 'Governance Requirements' label":
            "governance requirements" not in p4_text.lower(),
        "no legacy 'Success Criteria' label":
            "success criteria" not in p4_text.lower(),
    }
    p4_passed = all(p4_checks.values())
    print(f"[{label}] E: Panel 4 EB validation -> {'PASS' if p4_passed else 'FAIL'} | validationCards={n_strategic}", flush=True)
    for k, v in p4_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "E-panel4-discovery", "passed": p4_passed, "checks": p4_checks, "strategic_count": n_strategic})

    # === Test F: Panel 5 Demo: Governed Modernization Workflow (idx 6) ===
    await goto_panel(page, 6)
    p5_text = await get_section_text(page, 6)
    p5_checks = {
        "eyebrow 'Demo: Governed Modernization Workflow'":
            "demo: governed modernization workflow" in p5_text.lower(),
        "use-case 'Legacy modernization + test acceleration'":
            "legacy modernization + test acceleration" in p5_text.lower(),
        "workflow node 'Repo scan'": "Repo scan" in p5_text,
        "workflow node 'Migration plan'": "Migration plan" in p5_text,
        "workflow node 'Code changes'": "Code changes" in p5_text,
        "workflow node 'Test generation'": "Test generation" in p5_text,
        "workflow node 'PR + evidence'": "PR + evidence" in p5_text,
        "workflow node 'Human approval'": "Human approval" in p5_text,
        "demo bullet 'Bounded task, not open-ended coding'":
            "bounded task, not open-ended coding" in p5_text.lower(),
        "demo bullet 'Existing engineering review preserved'":
            "existing engineering review preserved" in p5_text.lower(),
        "demo bullet 'Evidence generated for audit and governance'":
            "evidence generated for audit and governance" in p5_text.lower(),
        "repo link 'kushmirc/banking-modernization'":
            "kushmirc/banking-modernization" in p5_text,
        "tiny disclaimer 'Representative repo. No Intesa source code used'":
            "representative repo" in p5_text.lower()
            and "no intesa source code used" in p5_text.lower(),
        "no legacy 'Repository analysis' node":
            "repository analysis" not in p5_text.lower(),
        "no legacy 'Automated refactoring' node":
            "automated refactoring" not in p5_text.lower(),
        "no legacy 'Governed pull request review' node":
            "governed pull request review" not in p5_text.lower(),
        "no legacy '12,000 engineering hours' metric":
            "12,000 engineering hours" not in p5_text.lower(),
        "no legacy P5b 'Live workflow preview' label":
            "live workflow preview" not in p5_text.lower(),
    }
    p5_passed = all(p5_checks.values())
    print(f"[{label}] F: Panel 5 merged workflow -> {'PASS' if p5_passed else 'FAIL'}", flush=True)
    for k, v in p5_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "F-panel5-merged-workflow", "passed": p5_passed, "checks": p5_checks})

    # === Test G: Panel 12 (idx 12) Op readiness + Panel 13 (idx 13) Next-step alignment ===
    await goto_panel(page, 12)
    p12_text = await get_section_text(page, 12)
    p12_checks = {
        "jointly governed validation initiative": "jointly governed validation initiative" in p12_text,
        "Success depends not only on technical execution": "Success depends not only on technical execution" in p12_text,
        "go-live transition 'structured validation path'":
            "structured validation path toward broader enterprise deployment" in p12_text.lower(),
    }
    await goto_panel(page, 13)
    p13_text = await get_section_text(page, 13)
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

    # === Test I: appendix toggle moves to idx 14 (14 main + 1 appendix) ===
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
    appendix_idx_pass = appendix_state["idx"] == 14
    appendix_text_pass = (
        "discovery framework" in appendix_state["sectionText"].lower()
        and "bulletproof" in appendix_state["sectionText"].lower()
    )
    print(f"[{label}] I1: appendix click -> idx {appendix_state['idx']} (expect 14) -> {'PASS' if appendix_idx_pass else 'FAIL'}", flush=True)
    print(f"[{label}] I2: appendix section text contains discovery framework + bulletproof -> {'PASS' if appendix_text_pass else 'FAIL'}", flush=True)
    results.append({"viewport": label, "test": "I1-appendix-idx", "passed": appendix_idx_pass, "actual_idx": appendix_state["idx"]})
    results.append({"viewport": label, "test": "I2-appendix-text", "passed": appendix_text_pass, "section_text_excerpt": appendix_state["sectionText"][:200]})

    # Esc -> back to last main panel (idx 13)
    await page.keyboard.press("Escape")
    await page.wait_for_timeout(800)
    after_esc = await page.evaluate(
        """() => {
            const scroller = document.querySelector('.no-scrollbar');
            return Math.round(scroller.scrollLeft / scroller.clientWidth);
        }"""
    )
    esc_pass = after_esc == 13
    print(f"[{label}] I3: Esc from appendix -> idx {after_esc} (expect 13) -> {'PASS' if esc_pass else 'FAIL'}", flush=True)
    results.append({"viewport": label, "test": "I3-esc-from-appendix", "passed": esc_pass, "actual_idx": after_esc})

    # === Test L: standalone counter climax page is removed ===
    # The minimalism pass deleted the dedicated climax explanation
    # panel; its narrative now lives in the counter widget popover.
    # We verify by counting <section> elements: 14 main + 1 appendix.
    section_count = await page.evaluate(
        """() => document.querySelectorAll('section').length"""
    )
    full_html_lower = (await page.content()).lower()
    l_checks = {
        "exactly 15 sections (14 main + 1 appendix)": section_count == 15,
        "no legacy climax 'large-scale modernization programs often consume' prose":
            "large-scale modernization programs often consume" not in full_html_lower,
        "no legacy climax 'transformation throughput' interpretation prose":
            "strategic value is not reducing engineering teams" not in full_html_lower,
        "no legacy climax 'engineering hours per year' rendered":
            "approximately 8 hours per developer-day" not in full_html_lower,
    }
    l_passed = all(l_checks.values())
    print(f"[{label}] L: counter climax page removed -> {'PASS' if l_passed else 'FAIL'} | sections={section_count}", flush=True)
    for k, v in l_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "L-climax-removed", "passed": l_passed, "section_count": section_count})

    # === Test M: alignment refinement (P2 idx 3 / P3 idx 4 / P5 merged idx 6 / P11 idx 11) ===
    await goto_panel(page, 4)
    p3_text = await get_section_text(page, 4)
    await goto_panel(page, 6)
    p5_text_m = await get_section_text(page, 6)
    await goto_panel(page, 11)
    p11_text = await get_section_text(page, 11)
    m_checks = {
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

    # === Test N: counter pacing — value at idx 13 must reach the headline 8–18 envelope ===
    # Visit every main panel in order so cumulative add fires for each.
    for idx in range(0, 14):
        await goto_panel(page, idx)
        await page.wait_for_timeout(120)
    header_at_final = await get_header_text(page)
    m = re.search(r"≈\s*([\d.]+)\s*[–-]\s*([\d.]+)", header_at_final)
    counter_min = float(m.group(1)) if m else 0.0
    counter_max = float(m.group(2)) if m else 0.0
    n_checks = {
        "counter min reaches >= 7.5 at idx 13": counter_min >= 7.5,
        "counter max reaches >= 17.5 at idx 13": counter_max >= 17.5,
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

    # === Test O: minimal executive agenda at idx 2 ===
    # Aggressive minimalism pass: 5 single-word focus areas with brief
    # micro-subtitles only — no explanatory paragraphs.
    await goto_panel(page, 2)
    p1b_text = await get_section_text(page, 2)
    o_checks = {
        "eyebrow 'Agenda'": "agenda" in p1b_text.lower(),
        "minimal headline 'Five focus areas.'": "Five focus areas." in p1b_text,
        "no legacy '55-minute strategic discussion' subhead":
            "55-minute strategic discussion" not in p1b_text.lower(),
        "no legacy 'next 55 minutes' headline":
            "for the next 55 minutes" not in p1b_text.lower(),
        "block 1 Context · Modernization pressure":
            "Context" in p1b_text and "Modernization pressure" in p1b_text,
        "block 2 Validation · Executive assumptions":
            "Validation" in p1b_text and "Executive assumptions" in p1b_text,
        "block 1 helper '2029 modernization pressure'":
            "2029 modernization pressure" in p1b_text.lower(),
        "block 2 helper 'EB assumptions'":
            "eb assumptions" in p1b_text.lower(),
        "block 3 Demo · Governed execution":
            "Demo" in p1b_text and "Governed execution" in p1b_text,
        "block 4 Impact · Capacity redeployment":
            "Impact" in p1b_text and "Capacity redeployment" in p1b_text,
        "block 5 Rollout · Pilot decision":
            "Rollout" in p1b_text and "Pilot decision" in p1b_text,
        "agenda no longer uses 'Workflow' label":
            not re.search(r"\bWorkflow\b", p1b_text),
        "no legacy 'Transformation Context' label":
            "transformation context" not in p1b_text.lower(),
        "no legacy 'Live Workflow Preview' label":
            "live workflow preview" not in p1b_text.lower(),
        "no legacy 'Pilot & Go-Live Path' label":
            "pilot & go-live path" not in p1b_text.lower(),
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
        "Hero — EB-pivot anchor '64%'": "64%" in p1_text
            and "cloud-based applications in 2025" in p1_text.lower(),
        "Hero — '~100%' target by 2029": "~100%" in p1_text
            and "target cloud-based applications by 2029" in p1_text.lower(),
        "Hero — '€4.6B' technology & growth investment 2026–2029":
            "€4.6B" in p1_text
            and "technology & growth investment 2026–2029" in p1_text.lower(),
        "Hero — closing narrative 'closing the final migration gap by 2029'":
            "closing the final migration gap by 2029" in p1_text.lower(),
        "Hero — no legacy '€5.6B' history KPI":
            "€5.6b" not in p1_text.lower(),
        "Hero — no legacy '2,400+ IT specialists' KPI":
            "2,400+" not in p1_text,
        "P5 demo — left-to-right flow node 'Repo scan'":
            "Repo scan" in p5_text_q,
        "P5 demo — flow node 'Human approval'":
            "Human approval" in p5_text_q,
        "P5 demo — use case 'Legacy modernization + test acceleration'":
            "legacy modernization + test acceleration" in p5_text_q.lower(),
        "P7 — conservative '~13,600 dev-days'":
            "~13,600 dev-days" in p7_text_q,
        "P7 — realistic '~43,500 dev-days'":
            "~43,500 dev-days" in p7_text_q,
        "P7 — '≈ 62 developer-equivalents'": "62 developer-equivalents" in p7_text_q,
        "P7 — '≈ 198 developer-equivalents'": "198 developer-equivalents" in p7_text_q,
        "P7 — footnote 'Illustrative model based on discovery assumptions'":
            "illustrative model based on discovery assumptions" in p7_text_q.lower(),
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
    # Expected variant per panel idx (0..14) after climax-page removal:
    # 0 welcome → deep, 1 hero → deep, 2 agenda → deep, 3 why-now → deep,
    # 4 current → default, 5 discovery → default, 6 workflow → cinematic,
    # 7 trust → default, 8 capacity → bright, 9 roi → bright,
    # 10 itau → bright, 11 pilot → clean, 12 op-readiness → clean,
    # 13 final-ask → deep, 14 appendix → default
    await goto_panel(page, 6)
    p5_text_r = await get_section_text(page, 6)
    await goto_panel(page, 13)
    p13_text_r = await get_section_text(page, 13)
    p13_html = await page.evaluate(
        """(idx) => {
            const sections = document.querySelectorAll('section');
            const h2 = sections[idx]?.querySelector('h2');
            return h2 ? h2.className : '';
        }""",
        13,
    )
    q_checks = {
        "Welcome panel (idx 0) uses deep bg": bg_classes[0] == "panel-bg-deep",
        "Hero (idx 1) uses deep bg": bg_classes[1] == "panel-bg-deep",
        "Why now · 2029 (idx 3) uses deep bg": bg_classes[3] == "panel-bg-deep",
        "Workflow panel (idx 6) uses cinematic bg": bg_classes[6] == "panel-bg-cinematic",
        "Capacity panel (idx 8) uses bright bg": bg_classes[8] == "panel-bg-bright",
        "Itau benchmark panel (idx 10) uses bright bg": bg_classes[10] == "panel-bg-bright",
        "Pilot panel (idx 11) uses clean bg": bg_classes[11] == "panel-bg-clean",
        "Op-readiness (idx 12) uses clean bg": bg_classes[12] == "panel-bg-clean",
        "Final-ask (idx 13) uses deep bg": bg_classes[13] == "panel-bg-deep",
        "All 15 panels render (14 main + 1 appendix)": len(bg_classes) == 15,
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
        "Title 'Governed Modernization Execution at Enterprise Scale'":
            "Governed Modernization Execution at Enterprise Scale" in p0_text,
        "No legacy 'Executive Working Session' title in P0":
            "executive working session" not in p0_text.lower(),
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

    # === Test S: Why Now · 2029 (idx 3) + savings-language reframe sweep ===
    # Confirms the executive minimalism pass: oversized 2029 anchor, 3
    # operational statements, no legacy "Strategic ambition" prose, and
    # all "savings / cost reduction / reducing engineers" language has
    # been reframed to reinvestment / redeployment / throughput across
    # the full HTML.
    await goto_panel(page, 3)
    p2_text = await get_section_text(page, 3)
    full_html_lower = (await page.content()).lower()
    s_checks = {
        "Why Now eyebrow": "why now" in p2_text.lower(),
        "2029 oversized anchor": "2029" in p2_text,
        "Current-state anchor '64%'": "64%" in p2_text,
        "'Cloud-based applications today' caption":
            "cloud-based applications today" in p2_text.lower(),
        "Target-state anchor '100%'": "100%" in p2_text,
        "'Target by 2029' caption": "target by 2029" in p2_text.lower(),
        "Closing tension 'Final migration wave requires scalable execution capacity'":
            "final migration wave requires scalable execution capacity" in p2_text.lower(),
        "Modernization deadline caption":
            "modernization deadline" in p2_text.lower(),
        "no legacy 'Strategic ambition is clear' headline":
            "strategic ambition is clear" not in p2_text.lower(),
        "no legacy 'current execution reality' table copy":
            "current execution reality" not in p2_text.lower(),
        # Savings-language reframe sweep across the full document.
        "no 'cost reduction' framing in HTML":
            "cost reduction" not in full_html_lower,
        "no 'reducing engineers' framing in HTML":
            "reducing engineers" not in full_html_lower,
        "no 'reduce engineering costs' framing in HTML":
            "reduce engineering costs" not in full_html_lower,
        "no 'savings' framing in HTML":
            "savings" not in full_html_lower,
        "no 'eliminating work' framing in HTML":
            "eliminating work" not in full_html_lower,
        "reinvestment vocabulary present":
            "redeployed" in full_html_lower
            or "reinvest" in full_html_lower
            or "modernization throughput" in full_html_lower,
    }
    s_passed = all(s_checks.values())
    print(f"[{label}] S: Why Now · 2029 + savings reframe -> {'PASS' if s_passed else 'FAIL'}", flush=True)
    for k, v in s_checks.items():
        if not v:
            print(f"          -> miss: {k}", flush=True)
    results.append({"viewport": label, "test": "S-why-now-2029", "passed": s_passed, "checks": s_checks})

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
