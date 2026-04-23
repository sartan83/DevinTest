# Intesa × Devin microsite — adversarial test plan

PR: https://github.com/sartan83/DevinTest/pull/4
Dev server: `http://localhost:3000` (served by `next dev` from `intesa-microsite/`).

## What changed (user-visible)
A premium, horizontally-navigated 9-panel executive microsite. Key behaviors under test:
1. Horizontal snap navigation (arrow keys, number keys, snap scroll).
2. Persistent "Modeled engineering capacity during this session" counter (top-right) that accumulates as panels are visited and **expands centrally on Panel 7 (CounterClimax)** — this is the exact behavior that was off-by-one and was fixed in `557d385`.
3. Panel 3.5 Executive Discovery persona toggle (CIO / CTO / COO / Risk) with expandable follow-up questions.
4. Panel 1 CTA deep-link ("Open lighthouse" → Panel 8).

## Code evidence grounding the plan
- Render order (indices 0–8): `intesa-microsite/src/components/MicrositeShell.tsx:174-184` — Panel1 is index 0, `Panel7CounterClimax` is index 7, `Panel8Lighthouse` is index 8.
- Counter climax logic (post-fix):
  - `MicrositeShell.tsx:134` — `if (visited.has(7) /* Panel7CounterClimax */)` clamps to final range.
  - `MicrositeShell.tsx:144` — `const counterExpanded = active === 7;` drives the top-right counter's visual expansion.
  - `ExecutiveCounter.tsx:50-57` — when `expanded=true`: padding `px-6 py-5`, font `text-3xl`, orange dot pulses (`animate-pulse`).
- Keyboard nav: `MicrositeShell.tsx:76-101` — arrow keys / PageUp / PageDown / Space / Home / End / digit `1`–`9` map to panel index (digit N → index N-1).
- CTAs: `Panel1Opening.tsx:20-38` calls `onCta(cta.target)` → `goTo(target - 1)`. Data in `src/data/intesa.ts:98-101`: primary CTA targets panel 2 (index 1), secondary targets panel 9 (index 8).
- Persona toggle: `Panel35Discovery.tsx:13-26,32-58` — local `persona` state, 4 pills, question list re-renders via `AnimatePresence` on change.

## Primary flow — one recording, in order

**Test 1 — Panel 1 renders with correct headline, KPIs, and initial counter state**
- Action: Open `http://localhost:3000`.
- Assertions:
  - Headline contains both lines: `"Intesa has already chosen the direction."` and `"The opportunity now is execution."`
  - Six KPI cards visible with values: `€9.3B`, `64%`, `€5.1B`, `€4.6B`, `153`, `90k+`.
  - Top-right counter displays label `"Modeled engineering capacity during this session"`, value `"≈ 0.4–0.9 developer days"`, and disclaimer `"Illustrative scenario based on modeled assumptions"`.
  - Counter is in COMPACT form (small padding, `text-lg` value, no center-screen card).
- Fail criterion (disambiguates from broken): a different headline, missing KPI, or counter starting at `0` would indicate data wiring is broken.

**Test 2 — Horizontal snap navigation via number keys**
- Action: With focus on the page, press `2`, then `3`, then `4` (waiting for each snap).
- Assertions:
  - Panel 2 headline visible: `"The strategy exists."` + `"Execution is the constraint."`
  - Panel 3 headline visible: `"Speed must increase."` + `"Control cannot decrease."`
  - On Panel 3.5 (index 3), eyebrow reads `"Executive discovery"` and headline reads `"Before acceleration, clarity."`
  - Top-right counter value has increased monotonically (e.g., >`0.9` min / >`0.9` max, never decreasing).
  - Counter is still in COMPACT form (not expanded).
- Fail criterion: visiting Panel 3 while the counter visually expands would indicate the climax gate is still keyed off the wrong index.

**Test 3 — Panel 3.5 discovery persona toggle**
- Action: On Panel 3.5, click the `COO` pill in the persona toggle. Then click the first question to expand follow-ups.
- Assertions:
  - Active pill visually shifts to `COO` (orange gradient pill moves via layoutId).
  - The first question text changes to `"How much visibility do you have into engineering delivery?"` (COO-specific — different from the CIO default `"Where is your modernization effort slowing down the most?"`).
  - Expanding the COO Q1 reveals the follow-up bullet `"Is it real-time, weekly, quarterly?"`
- Fail criterion: if the question list does NOT change when switching persona, the toggle is broken.

**Test 4 — Counter climax is on Panel 7, not Panel 6 (the specific fix)**
- Action: Press `6` — navigates to Panel 6 Executive Value. Observe counter. Then press `7` — navigates to Panel 7 CounterClimax. Observe counter.
- Assertions:
  - On Panel 6: Panel 6 eyebrow `"Executive value"` visible, headline `"Unlocking trapped capacity"` visible. Counter in top-right is **COMPACT** (small form factor, ≈`0.4`-height card) — **NOT** expanded.
  - On Panel 7: Panel 7 eyebrow `"Reclaimed capacity"` visible. A large central hero card shows `"≈ 8–18 developer days"`. Counter in top-right is now **EXPANDED** (larger padding, bigger value text, pulsing orange dot).
- Fail criterion: If the top-right counter expanded while on Panel 6 (Executive Value) instead of Panel 7, the off-by-one would have regressed. This assertion is the primary verification of the `557d385` fix.

**Test 5 — Panel 1 "Open lighthouse" CTA deep-links to Panel 8**
- Action: Press `1` to return to Panel 1. Click the `Open lighthouse` button.
- Assertions:
  - After click, the snap scroller lands on Panel 8: eyebrow `"Lighthouse"`, headline `"Start with a 30-day lighthouse"`, four week cards (`Week 1 Scope`, `Week 2 First tasks`, `Week 3 Scale`, `Week 4 Readout`), and two CTAs (`Simulate lighthouse`, `Download summary`).
  - Counter top-right is compact again (we're no longer on Panel 7).
- Fail criterion: if the CTA lands on a different panel (e.g., Panel 7) or does nothing, the `onCta` wiring is broken.

## Out of scope (intentionally not tested)
- Responsive / mobile behavior (the brief explicitly targets executive landscape screens).
- "Simulate lighthouse" / "Download summary" button handlers — those are intentionally placeholders in this PR; there is no backend.
- Wheel-to-horizontal scroll translation — covered indirectly by snap behavior; not a focus of the review finding.
