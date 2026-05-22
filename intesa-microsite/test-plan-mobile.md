# Test Plan — Mobile (smartphone-proof) responsive layout

**PR:** https://github.com/sartan83/DevinTest/pull/4
**Change under test:** On viewports ≤ 767px, the microsite must switch from a
horizontal 9-panel snap scroller to a **vertical** 9-panel snap scroller. The
persistent executive counter must remain visible and compact, the progress bar
must stay usable, and the Panel 7 climax expansion must still fire on the right
panel.

## Environment
- Local dev server: `cd intesa-microsite && npm run dev` → `http://localhost:3000`
- Chrome DevTools device mode emulation: iPhone SE (375 × 667) — smaller than our
  767 px breakpoint, so `isMobile` in
  `src/components/MicrositeShell.tsx:25` resolves to `true`.

## Primary flow (adversarial — would look broken if reverted)

1. **Mobile layout switch**
   - Load the site in the iPhone SE emulator.
   - **Pass if:** page shows Panel 1 full-height, nothing extends beyond the right
     edge (no horizontal scrollbar), the bottom progress bar fits on one line,
     and the top-right counter pill is visible without overlapping the
     Devin · Intesa brand block. DOM check on scroller
     (`div` under `MicrositeShell` that wraps panels) should contain classes
     `scroll-snap-y overflow-y-auto overflow-x-hidden`.
   - **Fail if:** panels are laid out in a row (horizontal overflow), the
     counter overflows the viewport edge, or the scroller has
     `scroll-snap-x overflow-x-auto`.

2. **Vertical snap scroll Panel 1 → Panel 2 → Panel 3**
   - Swipe up (or press ArrowDown with emulator focused).
   - **Pass if:** page snaps to Panel 2 (`Context` — "The strategy exists.
     Execution is the constraint."), bottom progress bar active pill advances
     from `1` to `2`, counter number increases from the Panel 1 baseline.
     Repeat once more and land on Panel 3 (`Governance` — "Speed must increase.
     Control cannot decrease.").
   - **Fail if:** swipe-up just scrolls freely without snapping, or lands
     between two panels, or the progress pill does not track the active panel.

3. **Counter stays compact on Panel 6, expands on Panel 7 (climax fix)**
   - From Panel 3, tap the 6th non-half dot in the progress bar to jump to
     Panel 6 (`Executive value`).
   - **Pass if:** top-right counter card is still in compact form (small
     number, no `animate-pulse` dot, height roughly equal to the brand block).
   - Swipe up once.
   - **Pass if:** page lands on Panel 7 (`Reclaimed capacity`), the hero card
     reads `≈ 8–18` with label `developer days`, AND the top-right counter
     visibly grows (larger number — `text-2xl sm:text-3xl` — and the orange dot
     starts pulsing).
   - **Fail if:** counter expands on Panel 6, stays compact on Panel 7, or the
     Panel 7 hero card is missing / truncated.

4. **Panel 1 CTA deep-link on mobile**
   - Reload the site (state resets to Panel 1).
   - Tap the `Open lighthouse` button.
   - **Pass if:** page scrolls vertically (not horizontally) and lands on
     Panel 8 (`Start with a 30-day lighthouse`), with the 4 week cards and the
     "Readout KPIs" row visible after scrolling down within the panel.
   - **Fail if:** tap does nothing, scrolls the wrong direction, or lands on
     the wrong panel.

## Not in scope / explicitly not tested
- Desktop horizontal flow (already verified in the previous run at commit
  `557d385`).
- Actual iOS / Android hardware — using DevTools mobile emulation is the
  approved approximation for this PR.
- Button handlers on Panel 8 (`Simulate lighthouse`, `Download summary`) —
  same scope note as before, these are conversation hooks and have no
  client-side behavior.

## Evidence to collect
- Short recording annotated with the 4 test_start / assertion pairs above.
- Two zoomed screenshots: the counter on Panel 6 (compact) and on Panel 7
  (expanded) at mobile width, so the reviewer can eyeball the fix at phone
  size the same way they did at desktop size in the previous test round.
