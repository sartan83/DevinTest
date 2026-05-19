"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 2 — Why Now · Three value clocks.
 *
 * Brutal-executive consolidation. The page used to carry a standalone
 * 64% → 36% → 2029 visual AND a three-card cluster repeating the same
 * cloud / SDLC / value-pool metrics. Both have been merged into a
 * single three-hero-card row that IS the visual center of the page:
 *
 *   [ 64% → 36% → 2029 ] [ ~€70M ] [ ~€350M ]
 *      Cloud deadline      SDLC      Infra legacy
 *
 * No duplicate ~€70M, no duplicate cloud-migration row, no repeated
 * ~100% milestone anywhere. The three cards land the message in 5s:
 * three value clocks, one shared constraint — SDLC execution capacity.
 */
export function Panel2ExecutionGap() {
  const p = intesa.panel2;
  return (
    <PanelShell
      eyebrow={p.eyebrow}
      bg="deep"
      headerRight={
        <motion.img
          src="logos/intesa-sanpaolo.svg"
          alt="Intesa Sanpaolo"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-6 w-auto sm:h-7 lg:h-8"
        />
      }
    >
      <div className="flex h-full flex-col justify-center gap-8 sm:gap-10 lg:gap-12">
        {/* Corporate objective — business-level frame added near
            the top of the section per user direction. Sits above
            the headline and the three strategic priority cards.
            Compact card with small uppercase eyebrow + a single
            executive sentence (no bullets, no paragraphs). The
            three value clocks below read as execution priorities
            connected to this objective. */}
        {p.corporateObjective && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-w-3xl flex-col gap-1.5 rounded-xl border border-brand-orange/25 bg-brand-orange/[0.05] px-4 py-3 sm:gap-2 sm:px-5 sm:py-3.5"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-2 left-0 w-px bg-brand-orange/60"
            />
            <span className="text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10.5px]">
              {p.corporateObjective.label}
            </span>
            <p className="text-[13px] leading-snug text-brand-ivory sm:text-[14.5px] lg:text-[15.5px]">
              {p.corporateObjective.text}
            </p>
          </motion.div>
        )}

        {/* Header — hero + single subline. No standalone metric
            anywhere above the three hero cards. */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <PanelHeadline text={p.headline} />
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-[13px] leading-relaxed text-brand-ivory/75 sm:text-[15px] lg:text-[16px]"
          >
            {p.support}
          </motion.p>
        </div>

        {/* Three hero cards — the visual center of the page.
            ─────────────────────────────────────────────────
            Card 1 carries a longer progression string
            (64% → 36% → 2029) so its hero value uses a smaller
            display size to land cleanly on one line at lg.
            Cards 2 and 3 carry compact currency values and use the
            full hero display size. All three share the same card
            chrome so they read as a single row of equal-weight clocks. */}
        {p.clocks && p.clocks.length > 0 && (
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {p.clocks.map((c, i) => {
              const isProgression = c.tone === "deadline";
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.25 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex min-w-0 flex-col gap-4 overflow-hidden rounded-2xl border border-brand-ivory/12 bg-brand-ivory/[0.03] px-5 py-6 sm:gap-5 sm:px-6 sm:py-7 lg:px-7 lg:py-8"
                >
                  {/* Quiet orange top accent line — anchors the card
                      to the section's accent without overwhelming. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent"
                  />
                  <span className="text-[10.5px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[11px]">
                    {c.title}
                  </span>
                  <div className="flex flex-col gap-2">
                    <span
                      className={[
                        "font-display font-light leading-[1] tracking-tight text-brand-ivory",
                        isProgression
                          ? "text-[28px] sm:text-[36px] lg:text-[40px] xl:text-[44px]"
                          : "text-[44px] sm:text-[60px] lg:text-[68px] xl:text-[76px]",
                      ].join(" ")}
                    >
                      {c.value}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-brand-ivory/65 sm:text-[12px]">
                      {c.label}
                    </span>
                  </div>
                  {c.note && (
                    <p
                      className={[
                        "leading-snug",
                        // The SDLC efficiency clock carries the
                        // "15% SDLC efficiency ambition." anchor in
                        // its note. Per user direction this reads
                        // more prominently than the other two
                        // clock notes — display-weight, brand-orange
                        // accent on the 15%, slightly larger.
                        c.tone === "efficiency"
                          ? "font-display text-[14px] font-medium text-brand-ivory/95 sm:text-[16px] lg:text-[18px]"
                          : "text-[11.5px] text-brand-ivory/60 sm:text-[12.5px]",
                      ].join(" ")}
                    >
                      {c.tone === "efficiency"
                        ? (() => {
                            // Render the note with the leading
                            // "15%" highlighted in brand orange,
                            // and the rest in ivory. Falls back to
                            // raw note if the expected prefix is
                            // missing.
                            const match = c.note.match(/^(\d+%)\s*(.*)$/);
                            if (match) {
                              return (
                                <>
                                  <span
                                    className="font-display font-semibold tracking-tight text-brand-orange"
                                    style={{
                                      textShadow:
                                        "0 0 18px rgba(243,111,33,0.45)",
                                    }}
                                  >
                                    {match[1]}
                                  </span>{" "}
                                  <span className="text-brand-ivory/85">
                                    {match[2]}
                                  </span>
                                </>
                              );
                            }
                            return c.note;
                          })()
                        : c.note}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Closing lines — primary reframe + optional secondary. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2 border-l-2 border-brand-orange/60 pl-4 sm:pl-5"
        >
          <p className="max-w-3xl font-display text-lg font-light leading-snug text-brand-ivory sm:text-xl lg:text-[26px]">
            {p.closing}
          </p>
          {p.closingSecondary && (
            <p className="max-w-3xl text-[12px] leading-snug text-brand-ivory/65 sm:text-[13px]">
              {p.closingSecondary}
            </p>
          )}
        </motion.div>
      </div>
    </PanelShell>
  );
}
