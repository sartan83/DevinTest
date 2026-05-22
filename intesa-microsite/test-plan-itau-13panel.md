# Test plan — Itaú reference panel + executive refinement

**PR:** https://github.com/sartan83/DevinTest/pull/4 · commit `57b7dd8`
**Live:** https://intesa-devin-microsite.netlify.app/

## What changed in user-visible terms
- Restructured from 12 → **13 main panels** + 1 hidden appendix (was 12 + appendix)
- **NEW Panel 9** "Illustrative Enterprise Reference Pattern" — Itaú Bank with 4 KPI tiles (delivery throughput / lead time / testing quality / modernization speed), governance signal block, factory workflow examples, link to Gartner research source, illustrative-only disclaimer
- **Panel 7** refactored as "Engineering capacity redeployment model" — adds 3-line formula `400 engineers × 30% repetitive ≈ 120 engineering-equivalents` + leverage-not-replacement statement
- **Panel 4** simplified: 5 questions → 3 strategic primary + 2 de-emphasized detail questions; new headline "What has been identified so far — and what still requires executive alignment"
- **Panel 5** adds repo disclaimer ("No Intesa Sanpaolo source code or internal systems are used")
- **Panel 12** Mutual Commitment adds "jointly governed validation initiative" partnership banner + success-depends-on footer
- **Panel 13** Final Ask adds "Commercial alignment" block (deployment scope / approval path / governance / go-live readiness)
- **Counter climax** moves from index 8 → **index 9** (Itaú panel sits at index 8)
- **Appendix** moves from index 12 → **index 13**
- Sweep: 0 occurrences of `Champion`, `Executive Buyer`, `MEDDIC` in rendered HTML

## Primary flow

### Test A — overflow regression on dense panels (1280×800 + 1440×900)
For each of the dense panels at each viewport, navigate via the horizontal scroller, measure inner content vs viewport.

| Panel idx | Panel | Pass criteria |
|---|---|---|
| 2 | Panel 3 Current State | `overflowsInner ≤ 2px` AND `inner.bottom ≤ window.innerHeight + 2px` |
| 3 | Panel 4 Discovery | same |
| 4 | Panel 5 Demo | same |
| 6 | Panel 7 Capacity model | same |
| 8 | **Panel 9 Itaú** (new) | same |
| 10 | Panel 11 Pilot | same |
| 11 | Panel 12 Mutual Commitment | same |

**Adversarial reasoning:** if `compact` prop wasn't applied to Panel 9, or if too much content was crammed into the new structure, `overflowsViewport` would be `> 50px` at 1280×800. A broken refactor where Panel 7 still uses old layout but new data would also overflow.

### Test B — counter reveal moves to idx 9
1. Navigate to `idx 8` (Itaú panel) → header counter pill should still show **`?`** + numeric range (teaser state). Reading the header text:
   - Expect: contains `?`
   - Expect: does NOT contain `Modeled execution capacity reclaimed` (case-insensitive)
2. Navigate to `idx 9` (Counter climax) → header counter pill should now show full label.
   - Expect: header text contains `modeled execution capacity reclaimed` (case-insensitive)

**Adversarial reasoning:** if `CLIMAX_INDEX` wasn't updated from 8 → 9, the reveal would fire at idx 8 (on Itaú panel) and the test would fail at step 1 (full label visible too early).

### Test C — Itaú Panel 9 content presence (idx 8)
Navigate to idx 8 and dump section innerText. Verify all of:
- `Itaú` (case-sensitive — exact name)
- `20–30% increase` (delivery throughput KPI)
- `15% improvement` (lead time KPI)
- `25% reduction` (testing quality KPI)
- `5–6× faster` (modernization speedup KPI — note `×` not `x`)
- `Factory workflow model`
- At least 4 of: `Dependency upgrades`, `Migration preparation`, `Test generation`, `Remediation`, `Documentation`
- `Gartner Research · document 7778353` (source link)
- `https://www.gartner.com/document-reader/document/7778353` substring on a `<a href>`
- `governance` (case-insensitive, governance signal block)
- `illustrative` (case-insensitive, disclaimer footnote)

**Adversarial reasoning:** if `Panel9ItauReference` wasn't imported into `MicrositeShell`, the panel at idx 8 would be the old climax panel, and Itaú strings would all return 0 occurrences.

### Test D — Panel 7 capacity formula (idx 6)
Navigate to idx 6 and verify section text contains:
- `400 engineers`
- `30% repetitive` (substring match)
- `120 engineering-equivalent` (substring match)
- `From repetitive execution` (new headline)
- `not replacing engineers` (leverage statement)

**Adversarial reasoning:** if Panel 7 still rendered the old `From engineering tasks to business outcomes` rows-only structure with new data, the formula lines would not appear.

### Test E — Panel 4 has 3 primary + 2 secondary, new headline (idx 3)
Navigate to idx 3 and verify:
- Section text contains `What has been identified so far` (new headline)
- Section text contains `What still requires executive alignment`
- Count of `Strategic Q` substrings == **3** (cards labeled Strategic Q1/Q2/Q3)
- Count of `Detail question` substrings == **2** (secondary cards)
- Section text contains all 3 primary question stems (substring): `Where is engineering capacity currently constrained`, `Which transformation initiatives are most impacted`, `How does Intesa currently balance migration speed`

**Adversarial reasoning:** if `Panel4ExecutiveDiscovery` wasn't refactored to read `secondaryQuestions`, the count of `Detail question` would be 0.

### Test F — Panel 5 repo disclaimer (idx 4)
Navigate to idx 4 and verify section text contains:
- `Representative demonstration repository` (substring of disclaimer)
- `No Intesa Sanpaolo source code or internal systems are used`
- `kushmirc/banking-modernization` (repo link still present)

### Test G — Panel 12 mutual partnership + Panel 13 commercial alignment
Navigate to idx 11 (Mutual) and verify section text contains:
- `jointly governed validation initiative`
- `Success depends not only on technical execution`

Navigate to idx 12 (Final Ask) and verify section text contains:
- `Commercial alignment` (header label)
- `expanded deployment scope`
- `governance validation`
- `commercial go-live readiness`

### Test H — sales-methodology sweep (full HTML)
Fetch the rendered HTML and verify **0** occurrences of (case-insensitive):
- `Champion`
- `Executive Buyer` (full phrase, not just "Executive")
- `\\bEB\\b` (whole word — to avoid matching "EBA" or similar)
- `MEDDIC`
- `MEDDPICC`
- `Economic Buyer`

**Adversarial reasoning:** if the sweep was incomplete, any of these terms appearing in the static-rendered HTML would fail.

### Test I — appendix toggle moves to idx 13
1. Click `¶ Appendix` button in header
2. Inner scroller `scrollLeft` should equal `clientWidth × 13` (±2px tolerance)
3. Active section innerText should contain `Executive discovery framework`
4. Press `Escape` → scroller returns to `clientWidth × 12` (Final Ask, last main panel)

**Adversarial reasoning:** if `APPENDIX_INDEX` wasn't updated from 12 → 13, the click would land on Final Ask (idx 12) instead, and the discovery framework text would not appear.

### Test J — wheel handler regression
On idx 0 (Opening), dispatch `wheel` event with `deltaY = 200`. After ~700ms, active idx should be `1`. Confirms that the renumbering didn't break the existing wheel-accumulator handler.

## Evidence collected per test
- Per-viewport screenshot for Tests A, C, D, E, F, G, I
- HTML innerText dumps logged to test results JSON
- Final results.json with per-test `passed: true/false`

## Out of scope (regression only — labelled clearly in report)
- Mobile vertical layout (≤767px) — not changed in this PR
- Counter teaser values (already verified pre-PR)
- Panel 1 Opening + Panel 2 Execution Gap + Panel 6 Trust + Panel 8 ROI — only minor copy edits
