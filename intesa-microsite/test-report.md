# Intesa × Devin microsite — test report

**PR:** https://github.com/sartan83/DevinTest/pull/4
**Session:** https://app.devin.ai/sessions/6cabc16aa4df4ea8ac9dae4f7dc39586
**Environment:** local `next dev` (Next.js 14) on http://localhost:3000
**Recording:** https://app.devin.ai/attachments/49fea192-c00d-4a6c-8176-1cd9c15d33c8/rec-80fea0af-8bbf-4d83-bc60-5d9ddaf82609-edited.mp4

## Headline

- All 5 primary tests **passed**.
- The off-by-one bug caught by Devin Review (fixed in 557d385) is verified end-to-end: the persistent counter stays **compact on Panel 6 Executive Value** and only **expands centrally on Panel 7 CounterClimax**.

## Escalations

- **Minor UX inconsistency (not a regression, does not affect the fix):** digit-key shortcuts map linearly to panel index (`"6"` → 6th panel in render order = Panel 5 Use Case), while the sticky progress bar displays labels `1 / 2 / 3 / 3.5 / 4 / 5 / 6 / 7 / 8`. So pressing `"6"` does NOT land on the panel labeled "6" (Executive Value). Arrow keys and clicking the progress bar dots are unaffected. Happy to change the digit mapping to respect labels in a follow-up if you want — the spec only requires "keyboard navigation".

## Test results

| # | Test | Result |
|---|---|---|
| 1 | Panel 1 renders with correct headline, 6 KPIs, and initial counter `≈ 0.4–0.9` (compact) | **passed** |
| 2 | Number keys snap-navigate Panels 2 → 3 → 3.5; counter accumulates monotonically | **passed** |
| 3 | Panel 3.5 `COO` pill swaps Q1 from CIO text to `"How much visibility do you have into engineering delivery?"` | **passed** |
| 4 | **[The fix]** Counter stays compact on Panel 6 Executive Value; expands centrally on Panel 7 CounterClimax | **passed** |
| 5 | Panel 1 `Open lighthouse` CTA deep-links to Panel 8 (4 week cards, 5 KPI chips, 2 CTAs) | **passed** |

## Evidence

### Test 1 — Panel 1 opening state

| Panel 1 full view | Counter top-right (zoomed) |
|---|---|
| ![Panel 1 Opening](https://app.devin.ai/attachments/fc9eb795-4d60-4c37-8c57-c914dd39e287/screenshot_a9fd025e05db41e98518f3133bc81aa7.png) | ![Counter at 0.4–0.9 developer days](https://app.devin.ai/attachments/ea442c3e-e316-4366-ab13-0c50f092b9b3/screenshot_zoom_b692d924719a41be92b057b6ae45765c.png) |
| Headline, 6 KPIs, two CTAs, progress dot on "1 · Opening" | `≈ 0.4–0.9 developer days` with label + illustrative disclaimer |

### Test 3 — Panel 3.5 persona toggle

| CIO default (Q1 = modernization slowdown) | After clicking `COO` (Q1 = visibility) |
|---|---|
| ![Panel 3.5 CIO](https://app.devin.ai/attachments/8c55d21b-5819-476e-9b4a-22657737fa28/screenshot_e4c50b5cc5e24406b8f5d70e640bea7b.png) | ![Panel 3.5 COO](https://app.devin.ai/attachments/d04d32d5-93ef-4629-bbd7-dc20a988250c/screenshot_4c9687c1c05d4d0d9bc18dc9c7be84f2.png) |
| `"Where is your modernization effort slowing down the most?"` | `"How much visibility do you have into engineering delivery?"` |

### Test 4 — The fix: climax only fires on Panel 7

| Panel 6 Executive Value (counter COMPACT) | Panel 7 CounterClimax (counter EXPANDED) |
|---|---|
| ![Panel 6 full](https://app.devin.ai/attachments/dbf908a0-3ee6-4233-b4a5-9cae03d833ba/screenshot_077eeba20a0443fb9d6d5d602825bf0f.png) | ![Panel 7 full](https://app.devin.ai/attachments/b5bd9c6e-5224-4b75-8777-ff7f9858bc65/screenshot_024c99524e004434ac04fb6b2a06f3a8.png) |
| Counter top-right: `≈ 7.4–15.5` in small form factor (`text-lg`, no pulse) | Counter top-right: `≈ 8–18` in larger form factor + central hero card |

| Counter on Panel 6 (zoomed) | Counter on Panel 7 (zoomed) |
|---|---|
| ![Counter compact on Panel 6](https://app.devin.ai/attachments/83c63166-5366-47a4-9dae-a0eac075afa7/screenshot_zoom_9bc5e03a42f140c2873128ccbf4e9a8f.png) | ![Counter expanded on Panel 7](https://app.devin.ai/attachments/c893ce6e-7ec6-4be9-a735-5d8e40b0da5d/screenshot_zoom_ad7f2c8678224b26b9b5bfa589848445.png) |
| Small padding, `text-lg` value, static orange dot | Larger padding, `text-3xl` value, pulsing orange dot |

This is the exact behavior Devin Review flagged. Pre-fix, the expansion would have occurred on Panel 6 (one panel early). Post-fix, it correctly fires on Panel 7.

### Test 5 — Panel 1 `Open lighthouse` CTA → Panel 8

![Panel 8 Lighthouse after CTA click](https://app.devin.ai/attachments/d7a37635-a6e1-4bee-a61a-e9c82ba603b5/screenshot_874c431ee20f4d5abc3ae874bf93bf31.png)

Weeks 1–4, 5 readout KPI chips, `Simulate lighthouse` + `Download summary` CTAs, and the compliance-safe footer (`customer-dedicated isolated environment · single-tenant · human-in-the-loop`).

## Not tested (intentional)

- `Simulate lighthouse` and `Download summary` click handlers — intentionally placeholders in this PR (no backend wired).
- Mobile/narrow viewport — brief explicitly targets executive landscape displays.
- Compliance copy scan — verified inline above (no banned phrases observed: no `on-prem`, no `DORA compliant`, no `fully autonomous`, no `replaces developers`).
