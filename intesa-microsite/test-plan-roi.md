# Test plan — ROI slide (Panel 6.5) + scroll regression + Panel 3.5 rewrite + 10-panel flow

## Method change vs. previous plan
- **Cannot produce a live desktop recording**: this VM has no running Chrome / window manager. The `google-chrome` binary on PATH is a shell wrapper that POSTs to a dead CDP socket (`localhost:29229`). Launching Chrome directly returns non-zero.
- **Adjusted approach**: run **Playwright headless Chromium** against the deployed demo, with DOM text assertions + per-panel screenshots. Every T1–T8 assertion below is verified by reading the live DOM (not inferring from visuals), which is actually *stronger* than a recording for the word-for-word text checks — broken copy would fail the string comparison automatically.
- **Escalation**: the user will see screenshots instead of a recording.

## What changed vs. previously tested state
- **New Panel 6.5 "ROI signal"** inserted at render index 7 between Panel 6 (Executive value) and Panel 7 (Counter climax). Progress-bar label: `6.5`.
- **Panel 1 KPI swap**: removed `€10B+ Tech investment 2022–2029`; added `~3,300 Developers & IT engineers` with `est.` pill.
- **TOTAL_PANELS: 9 → 10.** Counter climax index: 7 → 8. Counter teaser reveal rebased on `CLIMAX_INDEX = 8`.
- **Regression fix** (`a333df7`): Panel 1 `Open lighthouse` CTA now targets Panel 8 Lighthouse (target 9 → 10) instead of the climax.
- **Keyboard a11y fix** (`3f058a1`): Space no longer swallowed when `BUTTON` / `A` has focus.
- **Scroll regression fix** (`ffab59e`): removed `data-allow-native-scroll="true"` from `PanelShell` content wrapper. The desktop wheel handler (`MicrositeShell.tsx`, the `onWheel` useEffect) translates vertical wheel into horizontal scrollLeft and was being suppressed over the whole panel surface before this fix.
- **Panel 3.5 rewrite** (`ffab59e`): eyebrow `Executive discovery · first 20 minutes` → `Where reality bends`. Headline `Before acceleration, clarity.` → `The same constraint looks different from every seat.` Subhead + framing-note box removed.

## Environment under test
- Demo: https://out-olywabav.devinapps.com (static export of commit `ffab59e`, redeployed 2026-04-23).
- Playwright headless Chromium, viewport 1280×800 (above `MOBILE_MAX_WIDTH = 767`).

## Primary flow (scripted via Playwright, evidence = screenshots + assertion log)

### T1 — Panel 1: new dev-count KPI + teaser counter
**Steps**: Load demo. Wait for `[data-testid="panel-1"]` equivalent (first `<section>` with eyebrow `OPENING`).
**Assertion A (new KPI)**: DOM contains a card whose text includes both `~3,300` and `Developers & IT engineers` and an `EST.` pill. PASS if both substrings present within one card element; FAIL if `€10B+` / `Tech investment 2022–2029` present instead.
**Assertion B (teaser counter)**: Top-right counter element contains the character `?`. The label string `Modeled engineering capacity during this session` is NOT visible (either absent from the rendered DOM or has `opacity:0` / `hidden`). PASS if `?` present AND label not visible; FAIL if label visible (teaser regressed).

### T2 — Panel 3.5 Discovery: persona toggle
**Steps**: Click the progress-bar dot for panel `3.5` to navigate. Read Q1 text. Click `CTO`, read Q1. Click `COO`, read Q1. Click `Risk`, read Q1.
**Assertion** (word-for-word from `intesa.ts`):
- CIO Q1 contains `Where is the gap widest between your announced cloud/AI direction`.
- CTO Q1 contains `If we sampled 100 open engineering tickets`.
- COO Q1 contains `What share of quarterly engineering commitments`.
- Risk Q1 contains `Which evidence do auditors ask for most often`.
Any failing substring → toggle regressed.

### T3 — Panel 6.5 ROI signal (FOCUS)
**Steps**: Click the progress-bar dot for panel `6.5`.
**Assertion A (panel exists)**: The rendered panel's eyebrow text equals `ROI SIGNAL — ANNUALIZED, AT INTESA SCALE` (case-insensitive). Headline contains both `Even with a safety margin,` and `the math is disruptive.`.
**Assertion B (headline range, exact)**: Page text on this panel contains exact string `~€6–19M / year` AND exact string `~14k–44k developer-days / year`.
**Assertion C (scenarios, exact)**:
- Conservative card contains all of: `Conservative`, `Year-1 ramp, heavy safety margin`, `~€5.9M`, `~13,600`, `25%`, `15%`, `50%`.
- Realistic card contains all of: `Realistic`, `Steady-state, mature adoption`, `~€18.8M`, `~43,500`, `30%`, `25%`, `80%`, `FOCUS`.
**Assertion D (sources)**: Panel contains `Gartner, Apr 2024`, `McKinsey, Jun 2023`, `Il Sole 24 Ore`.
**Assertion E (teaser still active)**: Top-right counter still contains `?`.

### T4 — Panel 7 climax: counter reveal
**Steps**: Click progress-bar dot for panel `7`.
**Assertion A (climax content)**: Panel eyebrow equals `RECLAIMED CAPACITY`. Panel body contains `≈ 8–18` AND `developer days` AND `Illustrative scenario based on modeled assumptions`.
**Assertion B (counter revealed)**: Top-right counter contains `MODELED ENGINEERING CAPACITY DURING THIS SESSION` AND `≈ 8–18 developer days`. Does NOT contain the teaser `?` glyph (or the `?` element no longer has visible opacity).

### T5 — "Open lighthouse" CTA regression fix (`a333df7`)
**Steps**: Click progress-bar dot for panel `1` to return to Panel 1. Click the button with accessible name `Open lighthouse`.
**Assertion**: After the click, progress-bar active label reads `8 · LIGHTHOUSE` AND panel eyebrow reads `LIGHTHOUSE` AND headline contains `Start with a 30-day lighthouse`. A regression would land on `7 · RECLAIMED CAPACITY`.

### T6 — Space-on-button a11y regression fix (`3f058a1`)
**Steps**: Click progress-bar dot for panel `1`. Focus the `Open lighthouse` button via `button.focus()`. Dispatch a `keydown` with `key=" "`.
**Assertion**: After the Space press, active panel label reads `8 · LIGHTHOUSE` (button activated natively), NOT `2 · CONTEXT` (which would mean Space advanced the panel instead).

### T7 — Desktop mouse-wheel scroll (regression fix `ffab59e`) ⭐
**Steps**: Reload the demo to reset to Panel 1 (`active=0`, `scrollLeft=0`). Record `scrollerEl.scrollLeft` before. Dispatch a `WheelEvent` on the **KPI card element inside Panel 1's content region** with `deltaY=600`, `bubbles=true`, `composed=true` (mirrors a real mouse wheel from inside the panel content). Wait 400 ms for smooth-scroll. Read `scrollLeft` after.
**Assertion (would a broken build look identical? NO)**:
- **Pass**: `scrollLeft_after > scrollLeft_before` by roughly one viewport width (≈1280 px, or at least > 600). Active panel index becomes ≥ 1.
- **Fail (pre-`ffab59e`)**: `scrollLeft_after === scrollLeft_before` (0) because the wheel handler returned early due to `data-allow-native-scroll="true"` on the content wrapper. Active panel index stays 0.

### T8 — Panel 3.5 copy rewrite (`ffab59e`)
**Steps**: Click progress-bar dot for panel `3.5`.
**Assertion A (eyebrow word-for-word)**: Panel's eyebrow text exactly equals `WHERE REALITY BENDS` (case-insensitive). NOT `EXECUTIVE DISCOVERY · FIRST 20 MINUTES`.
**Assertion B (headline word-for-word)**: Panel's headline text exactly equals `The same constraint looks different from every seat.` NOT `Before acceleration, clarity.`
**Assertion C (meta-narration removed)**: Panel body does NOT contain any of: `Four angles, two questions each`, `pressure-test alignment`, `How I would open a Tier-1 engagement`.

## Evidence collected
- Full-page screenshot at each stop (Panels 1, 3.5 × 4 personas, 6.5, 7, 8).
- A JSON assertion log with `{ id, expected, actual, result }` for every T1–T8 assertion.
- Both attached to the PR via a single comment.

## Not in scope
- Mobile vertical layout (covered in a previous test pass; no changes here).
- Recording (environment cannot produce one — see "Method change" above).
- Wiki pages in `docs/wiki/` (separate, not runtime).
