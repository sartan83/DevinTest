# Test plan — Density fix on Panels 3 / 4 / 5

**Target deploy:** https://intesa-devin-microsite.netlify.app/
**Commit under test:** `c4eb02b` (HEAD of `devin/1776884377-intesa-executive-microsite`)
**User complaint that motivated this fix:** _"Alcune pagine sono troppo fitte e non ci stanno.. poco leggibile"_

## What changed (user-visible)

1. Panel 3 (Current State Assessment): 9 → **6** observation cards, 3 × 2 grid.
2. Panel 4 (Discovery Gaps): known/validate columns 4 → **3** items each. Question cards 7 → **5**, now `lg:grid-cols-3`. Removed redundant transition paragraph.
3. Panel 5 (Devin Modernization Demo): 5 → **4** steps (`Identify safe slice` and `Add regression protection first` merged into a single `Scope a safe slice — protect it first`). Grid corrected `lg:grid-cols-5 → lg:grid-cols-4`. Step copy tightened.
4. PanelShell: `md:justify-center` (was unconditional `sm:justify-center`) so panels are no longer vertically centered when the viewport is too short to contain them — content sits flush from the top with the page-level scroller able to scroll if needed, instead of being silently cropped.

## Forbidden assumptions

A test that takes one screenshot of each panel and goes "looks fine" would pass even if the panel were silently clipped. We instead measure overflow numerically.

---

## Primary flow — adversarial

For viewport `1440 × 900` (typical executive laptop) and `1280 × 800` (smaller laptop):

**Setup:** Use Playwright headless Chromium with the listed viewport. Disable Framer-Motion `whileInView` reveals by setting `prefers-reduced-motion: reduce` so we measure the steady-state layout, not pre-animation height.

For each of panels 3, 4, 5:

1. Navigate to `?p=<index>` if supported, otherwise `goTo()` via `page.evaluate` to scroll to the panel via `window.scrollTo` against the inner scroller. Wait 800 ms.
2. Locate the active section element (`section.scroll-snap-start` matching the active index).
3. Inside it, locate the `motion.div` content container (selector: `section.scroll-snap-start > div`).
4. Read `scrollHeight`, `clientHeight`, `getBoundingClientRect().bottom`, `window.innerHeight`.
5. **PASS if:** `scrollHeight <= clientHeight + 2px` AND `boundingRect.bottom <= window.innerHeight + 2px`. (i.e. content does not overflow the panel and does not extend past the visible viewport.)
6. **FAIL if:** Either inequality is violated.
7. Capture a screenshot of the full viewport for the panel and attach to the report.

A broken implementation (e.g. if I had not reduced the count, or if `md:justify-center` had been left as `sm:justify-center` and content exceeded 100svh) would produce `boundingRect.bottom > window.innerHeight` for at least one panel, failing the assertion.

## Secondary flow — content correctness

Spot-check the live HTML (already done at plan time):

- `Where modernization compounds first` — 1 occurrence (kept).
- `Modernization safety vs. velocity tension` — 0 occurrences (dropped, expected).
- `Release governance bottlenecks` — 0 occurrences (dropped, expected).
- `How are release risks currently mitigated` — 0 occurrences (dropped, expected).
- `How is operational resilience measured` — 0 occurrences (dropped, expected).
- `Scope a safe slice` — 1 occurrence (new merged Panel 5 step).

Rerun this string-presence sweep in the recording's automation step to make sure the deploy under test is the one with the density fix, not a stale Netlify cache.

## Regression spot-checks (must not break)

- **Panel 9 Counter Climax reveal:** With viewport at panel index 8, the top-right pill must read `Modeled execution capacity reclaimed during this session` (full label) instead of `?`.
- **Appendix toggle:** Click the `¶ Appendix` button in the header → active panel index becomes `12` AND the bottom progress bar dots count remains `12` (i.e. appendix is hidden from progress). Press `Escape` → active index returns to `11`.
- **Mouse-wheel advance:** From index 0, dispatch a real `WheelEvent({deltaY: 100})` on the scroller — active index must advance to `1` (proves the `eb9ce47` accumulator-based handler still works).

## Pass / fail criteria summary

| Test                                          | Pass condition                                                       |
| --------------------------------------------- | -------------------------------------------------------------------- |
| Panel 3 fits at 1440×900                      | `bottom <= innerHeight + 2px`                                        |
| Panel 4 fits at 1440×900                      | `bottom <= innerHeight + 2px`                                        |
| Panel 5 fits at 1440×900                      | `bottom <= innerHeight + 2px`                                        |
| Panel 3 fits at 1280×800                      | `bottom <= innerHeight + 2px`                                        |
| Panel 4 fits at 1280×800                      | `bottom <= innerHeight + 2px`                                        |
| Panel 5 fits at 1280×800                      | `bottom <= innerHeight + 2px`                                        |
| Removed strings absent                        | All 4 dropped strings have 0 occurrences in deployed HTML            |
| Counter reveal still works on Panel 9         | Pill text equals full reclaim-capacity label, not `?`                |
| Appendix toggle still works                   | Click goes to idx 12, dots remain 12, Esc returns to 11              |
| Mouse-wheel scroll still works                | One `wheel` event w/ deltaY=100 advances 0 → 1                       |

If any **fits** assertion fails, the user's complaint is not resolved and I must fix and re-test before reporting.
