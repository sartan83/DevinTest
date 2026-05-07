# Test report — ROI slide + scroll regression + Panel 3.5 rewrite + 10-panel flow

**Result**: 23 / 23 assertions passed. No regressions detected.

**Environment**:
- Demo: https://out-olywabav.devinapps.com (static export of commit `ffab59e`)
- Method: Playwright headless Chromium, viewport `1280 × 800`
- Session: https://app.devin.ai/sessions/6cabc16aa4df4ea8ac9dae4f7dc39586

**Escalation** (lead with this): unable to produce a live-desktop **video recording** on this VM — Chrome/window-manager not running. Pivoted to Playwright with word-for-word DOM assertions + per-panel screenshots, which is stronger than a visual recording for the copy assertions (string mismatches would fail automatically).

---

## Summary per test

| # | Test | Result |
|---|---|---|
| T1.A.1 | Panel 1 `~3,300` developers KPI present | PASS |
| T1.A.2 | `est.` pill present on estimated KPI | PASS |
| T1.A.3 | Old KPI `€10B+ Tech investment 2022–2029` removed | PASS |
| T1.B.1 | Counter teaser `?` visible on Panel 1 | PASS |
| T1.B.2 | Counter label hidden in teaser mode | PASS |
| T2.CIO | Panel 3.5 CIO Q1 text matches | PASS |
| T2.CTO | Panel 3.5 CTO Q1 text matches | PASS |
| T2.COO | Panel 3.5 COO Q1 text matches | PASS |
| T2.Risk | Panel 3.5 Risk Q1 text matches | PASS |
| T8.A | Panel 3.5 eyebrow rewritten to `WHERE REALITY BENDS` | PASS |
| T8.B | Panel 3.5 headline rewritten to `The same constraint looks different from every seat.` | PASS |
| T8.C | Panel 3.5 meta-narration (subhead + framing note) removed | PASS |
| T3.A | Panel 6.5 eyebrow + headline | PASS |
| T3.B | Panel 6.5 headline range (`~€6–19M / year`, `~14k–44k developer-days / year`) | PASS |
| T3.C.conservative | Conservative card complete (parameters + `~€5.9M` + `~13,600`) | PASS |
| T3.C.realistic | Realistic card complete (parameters + `~€18.8M` + `~43,500` + `FOCUS`) | PASS |
| T3.D | Panel 6.5 sources cited (Gartner, McKinsey, Il Sole 24 Ore) | PASS |
| T3.E | Counter still in teaser on Panel 6.5 | PASS |
| T4.A | Panel 7 climax content (`Reclaimed capacity`, `≈ 8–18`, unit, disclaimer) | PASS |
| T4.B | Counter revealed on Panel 7 with full label + range | PASS |
| T5 | CTA `Open lighthouse` lands on Panel 8 (regression fix `a333df7`) | PASS |
| T6 | Space on focused `Open lighthouse` activates the CTA (a11y fix `3f058a1`) | PASS |
| T7 | Mouse-wheel advances panels (scroll regression fix `ffab59e`) | PASS |

## T7 detail (adversarial)
Scroll-snap-x mandatory means a rotella under ~half-viewport is snapped back to the starting panel. A real CDP `page.mouse.wheel(0, 1500)` from panel 1 produced: before `scrollLeft=0`, after `scrollLeft=1280`, active label moved `1 → 2`. Pre-`ffab59e`, the wheel handler was suppressed by `data-allow-native-scroll="true"` on the panel content wrapper and `scrollLeft` would have stayed at `0` — verified indirectly by the code path (`MicrositeShell.tsx` `onWheel` composedPath check) and by the behaviour changing between builds.

## Screenshots

| Panel 1 (KPI + teaser counter) | Panel 3.5 (new eyebrow/headline) |
|---|---|
| ![T1 Panel 1](https://app.devin.ai/attachments/80e0d9a1-6ce0-4b39-b435-579c1b71acea/T1-panel1.png) | ![T2 Panel 3.5 CIO](https://app.devin.ai/attachments/3ae204f1-7023-4662-bfb4-b35da47c9150/T2-panel35-CIO.png) |

| Panel 3.5 CTO persona | Panel 3.5 COO persona |
|---|---|
| ![CTO](https://app.devin.ai/attachments/c1b144af-5b17-4f56-9d18-a05b11fe7707/T2-panel35-CTO.png) | ![COO](https://app.devin.ai/attachments/14e1ddf4-db4a-4107-8e18-bcb57eba6dcd/T2-panel35-COO.png) |

| Panel 3.5 Risk persona | Panel 6.5 ROI signal (FOCUS) |
|---|---|
| ![Risk](https://app.devin.ai/attachments/faab797e-96f4-47a0-8f10-a07d3c66b0bd/T2-panel35-Risk.png) | ![ROI](https://app.devin.ai/attachments/9fbdb358-88a9-47ab-a174-820be38add64/T3-panel65-ROI.png) |

| Panel 7 climax (counter revealed) | Panel 8 Lighthouse (after `Open lighthouse`) |
|---|---|
| ![Climax](https://app.devin.ai/attachments/71b86d4a-3243-4c20-a7c6-78413890403b/T4-panel7-climax.png) | ![Lighthouse](https://app.devin.ai/attachments/aba9d0f0-85f4-4595-a323-24be5f1e7567/T5-after-open-lighthouse.png) |

| After Space on focused CTA (T6) | After mouse wheel on Panel 1 (T7) |
|---|---|
| ![Space](https://app.devin.ai/attachments/4608c34e-abb9-4344-9d6b-825ea4c1b24c/T6-after-space-on-cta.png) | ![Wheel](https://app.devin.ai/attachments/f85e1391-df96-4d07-9e55-d3b63d533494/T7-after-wheel.png) |
