# Test plan — 12-panel EB restructure (PR #4)

**Target**: https://intesa-devin-microsite.netlify.app/ (commit `d30b871`)
**Method**: Playwright Chromium against the deployed static export (the VM in this session has no live Chrome; Playwright DOM assertions are stronger than visual recording for word-for-word copy verification).

## What changed (user-visible)
The microsite was rewritten from a 10-panel "AI transformation" page into a 12-panel **executive business case** for the Intesa Sanpaolo Executive Buyer. New thesis: *"Intesa is not facing a technology problem. It is facing an execution scalability problem."* New Panel 4 (Executive Discovery — 4 tabbed blocks of 4 EB-level questions each), new Panel 11 (Mutual Commitment 2-column), new Panel 12 (Final Ask + closing question), counter renamed to "Modeled execution capacity reclaimed".

## Why this plan is adversarial
For each panel, I assert **specific copy strings** that only exist in the new 12-panel data file. If the build had regressed to the old 10-panel structure (or to placeholder text), `page.locator(...).first().textContent()` would not equal the expected string, and the test would fail loudly. Counts and tab-state changes catch silent UI bugs.

## Primary flow

Single Playwright run that walks all 12 panels via `?panel=N` query (or arrow-key nav from index 0) and asserts on each.

### T1 — Panel 1 Opening
- **Action**: load `/`, wait for `[data-panel-index="0"]` to be active.
- **Assertions**:
  - Headline contains `Scaling engineering execution` AND `for Intesa Sanpaolo` (case-insensitive).
  - Framing callout contains `Intesa is not facing a technology problem. It is facing an execution scalability problem.` *(would fail if framing line was dropped or reverted to old hero copy)*
  - KPI grid contains `~3,300` followed by `Developers & IT engineers` AND a pill with `est.`.
  - Counter teaser pill in top-right shows `?` and **does not** contain the word `capacity` or `Modeled` (label hidden until reveal).
- **Pass criteria**: all 4 assertions true.

### T2 — Panel 2 Execution Gap
- **Action**: ArrowRight × 1, wait for `[data-panel-index="1"]`.
- **Assertions**:
  - Eyebrow text equals `THE EXECUTION GAP` (uppercase via Tailwind `uppercase tracking`) — locate via `.uppercase` parent of eyebrow.
  - Renders **5 ambition→reality rows**. Verify presence of all 5 LEFT-column strings: `Cloud and core modernization`, `Faster digital delivery`, `AI-enabled transformation`, `Resilient banking platforms`, `Regulatory readiness`.
  - Verify presence of all 5 RIGHT-column strings: `Limited senior engineering bandwidth`, `Governance and release bottlenecks`, `Fragmented engineering workflows`, `Legacy dependency burden`, `Manual validation and documentation effort`.
  - Closing line contains `delayed execution of board-visible transformation priorities`.
- **Pass criteria**: all 11 substrings found.

### T3 — Panel 3 Current State
- **Action**: ArrowRight, panel-index 2.
- **Assertion**: 6 cards rendered, each containing one of: `Modernization backlog`, `Senior engineers trapped`, `Operational backlog`, `Legacy dependency`, `Delivery delays`, `cost of change`.
- **Pass criteria**: 6/6 strings present in same panel.

### T4 — Panel 4 Executive Discovery (interactive — most critical new component)
- **Action**: ArrowRight, panel-index 3.
- **Initial state assertions**:
  - 4 tabs render with labels: `Engineering economics`, `Governance & security`, `Strategic priorities`, `Success criteria`.
  - First tab has `aria-selected="true"`; others `false`.
  - 4 ordered list items with text starting with `Q1.`, `Q2.`, `Q3.`, `Q4.`.
  - Default block (Engineering economics) Q1 reads exactly: `What is the current cost and effort of modernization streams?`
  - Sidebar contains heading `LISTENING FOR`.
- **Tab switch test (this is the adversarial bit — would fail if useState or tab handler was broken)**:
  - Click `Governance & security` tab. Wait 500ms for AnimatePresence transition.
  - `aria-selected` attribute on Engineering tab → `false`; on Governance tab → `true`.
  - Q1 text now reads exactly: `What are the AI policy requirements for software delivery?` *(This text only exists in the governance block; if state didn't change, Q1 would still read about modernization streams.)*
  - Click `Success criteria` tab. Q1 now reads exactly: `What KPIs would justify broader deployment?`
- **Transition note assertion**: panel contains `should not be positioned as a sandbox experiment`.
- **Pass criteria**: all 4 initial + 5 tab-switch + 1 transition = 10/10.

### T5 — Panel 5 Business Impact Walkthrough
- **Action**: ArrowRight, panel-index 4.
- **Assertions**:
  - Headline contains `Business impact walkthrough` (case-insensitive).
  - 4 numbered steps render with strings: `Understand the modernization scope`, `Plan the work autonomously`, `Execute with governance`, `Document for auditability`.
  - Value statement contains `not about replacing engineers`.
  - Second value statement contains `safer, more auditable modernization at enterprise scale`.

### T6 — Panel 6 Enterprise Trust
- **Action**: ArrowRight, panel-index 5.
- **Assertion**: 7 pillars render, each containing one of: `Isolated VM`, `Reproducible execution`, `Human approval`, `PR review`, `Audit-friendly documentation`, `enterprise security review`, `private deployment`.
- **Pass criteria**: 7/7 substrings present.

### T7 — Panel 7 Tasks→Outcomes mapping
- **Action**: ArrowRight, panel-index 6.
- **Assertion**: contains all 5 left-column rows (`Automated dependency analysis`, `Test generation`, `Refactoring support`, `PR documentation`, `Autonomous task execution`) AND right-column outcomes (`Faster modernization assessment`, `Lower delivery risk`, `Reduced manual engineering effort`, `governance and auditability`, `delivery capacity without proportional headcount`).
- Closing sentence contains `redeploying scarce senior engineering capacity`.

### T8 — Panel 8 ROI Signal
- **Action**: ArrowRight, panel-index 7.
- **Assertions**:
  - Headline contains `Even with a safety margin`.
  - 2 scenario cards render (Conservative + Realistic) with Realistic card showing badge `FOCUS`.
  - Conservative card mentions `~€5.9M`, Realistic `~€18.8M`.
  - Counter teaser pill **still hidden** (`?` only — has not yet revealed since `active=7 < CLIMAX_INDEX=8`).

### T9 — Panel 9 Reclaimed Capacity (counter climax — the big reveal)
- **Action**: ArrowRight, panel-index 8.
- **Critical assertion**: counter top-right pill text now contains `Modeled execution capacity reclaimed` (full label) AND a numeric range like `≈` or `~`. *This is the reveal moment — would fail if `CLIMAX_INDEX` was wrong or counter logic broke.*
- Headline assertions: contains `During this discussion` AND `could already be reclaimed`.
- Verify large counter value displays a developer-day range (matches `\d+\s*[–-]\s*\d+` followed by `developer-days` or `developer days`).

### T10 — Panel 10 4-Week Pilot
- **Action**: ArrowRight, panel-index 9.
- **Assertions**:
  - 4 week cards labeled `Week 1` through `Week 4`.
  - Each week shows specific items: Week 1 contains `Select one scoped modernization use case`, Week 4 contains `Compare pilot KPIs against baseline`.
  - KPI section contains `Pilot success metrics`.
  - 8 KPI bullets include `Reduction in modernization cycle time` and `Engineering hours saved`.

### T11 — Panel 11 Mutual Commitment
- **Action**: ArrowRight, panel-index 10.
- **Assertions**:
  - 2 columns visible: one labeled `Intesa Sanpaolo commitment`, other `Cognition commitment`.
  - Intesa column contains `Provide scoped repository access` AND `Nominate executive sponsor`.
  - Cognition column contains `Support secure pilot setup` AND `Deliver executive pilot readout`.
  - Closing sentence contains `should not end with another evaluation`.

### T12 — Panel 12 Final Ask
- **Action**: ArrowRight, panel-index 11.
- **Assertions**:
  - Headline contains `If value is proven` AND `aligned to move`.
  - Closing question contains `what would need to happen internally at Intesa Sanpaolo`.
  - 3 next-step pills: `Confirm executive sponsor`, `Agree pilot success metrics`, `Define post-pilot go-live timeline`.
- **Counter pill assertion**: still revealed (still showing `Modeled execution capacity reclaimed`).

### T13 — Mobile responsive smoke (regression)
- **Action**: set viewport to 375×812, reload.
- **Assertion**: `body` has `data-layout="vertical"` (or shell switches to vertical scroll-snap), Panel 1 still visible, no horizontal overflow scrollbar.

## Out of scope
- Wiki realignment (deferred per user's earlier instruction).
- Counter math precision (already validated in prior session).
- Wheel-scroll fix (already validated in prior session via `eb9ce47`).

## Pass/fail summary format
The test runner will print a single line per assertion: `[T#] <description>: PASS/FAIL [actual=...]`. Total expected: ~50 assertions across 13 tests. Report posts as a single PR comment with `<details>` per panel.
