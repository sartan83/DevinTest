"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 2 — Why Now · Remaining 36%.
 *
 * Strategic execution-tension panel. Hero anchored on the operational
 * hardness of the remaining gap, not on a calendar milestone. The
 * 64% today → 36% remaining → 2029 deadline progression frames the
 * gap visually, with 36% rendered as the tension zone between the
 * two states. Below the visual, three value-clock cards surface the
 * three pressures that all converge on the same constraint: SDLC
 * execution capacity. Closing lines reframe the discussion from
 * "should we modernize?" to "can execution capacity scale fast
 * enough?".
 */
export function Panel2ExecutionGap() {
  const p = intesa.panel2;
  const [today, target] = p.states;
  return (
    <PanelShell eyebrow={p.eyebrow} bg="deep">
      <div className="flex h-full flex-col justify-center gap-8 sm:gap-10 lg:gap-12">
        {/* Header — hero + single subline. No right-side metric;
            all clocks live in the card cluster below the visual. */}
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

        {/* Current-state → tension zone → deadline progression.
            ─────────────────────────────────────────────────────
            Three columns on desktop:
              [ 64% today ] [ 36% remaining ] [ 2029 deadline ]
            The middle slot is the operational tension being closed.
            ~100% is intentionally NOT rendered as a large number —
            if 64% is today and 36% remains, ~100% is implied. The
            third slot communicates the real tension: the deadline. */}
        <div className="grid items-end gap-6 sm:gap-8 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2 border-l border-brand-ivory/15 pl-5 sm:pl-7"
          >
            <div className="font-display text-[3rem] font-light leading-none text-brand-ivory sm:text-[4.25rem] lg:text-[5rem]">
              {today.value}
            </div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[12px]">
              {today.label}
            </div>
          </motion.div>

          {/* Tension zone — 36% rendered as the gap. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-2 self-stretch px-4 py-4 sm:px-6 sm:py-5"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/55 to-transparent sm:inset-x-4"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-2 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/55 to-transparent sm:inset-x-4"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -left-1 top-2 bottom-2 w-px bg-brand-orange/35 sm:left-0"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-1 top-2 bottom-2 w-px bg-brand-orange/35 sm:right-0"
            />
            <div className="text-[9px] uppercase tracking-[0.32em] text-brand-orange-soft sm:text-[10px]">
              Tension zone
            </div>
            <div className="font-display text-[3.25rem] font-light leading-none text-brand-orange sm:text-[4.5rem] lg:text-[5.5rem]">
              {p.gap.value}
            </div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-brand-ivory/65 sm:text-[12px]">
              {p.gap.label}
            </div>
          </motion.div>

          {/* Deadline — 2029. Slightly tighter type so the year
              reads as a date marker, not a percentage. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2 border-l border-brand-orange/40 pl-5 sm:pl-7"
          >
            <div className="font-display text-[2.75rem] font-light leading-none text-brand-ivory sm:text-[3.75rem] lg:text-[4.5rem]">
              {target.value}
            </div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[12px]">
              {target.label}
            </div>
          </motion.div>
        </div>

        {/* Three value-clock cards. Replaces the previous top-right
            SDLC metric + single business-pressure card with one
            clean three-card row that surfaces the three pressures
            converging on SDLC execution capacity. */}
        {p.clocks && p.clocks.length > 0 && (
          <div className="grid gap-3 sm:gap-3.5 lg:grid-cols-3 lg:gap-4">
            {p.clocks.map((c, i) => {
              const isDeadline = c.tone === "deadline";
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.55 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex min-w-0 flex-col gap-1.5 rounded-xl border border-brand-ivory/10 bg-brand-ivory/[0.025] px-4 py-3.5 sm:px-5 sm:py-4"
                >
                  <span className="text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10.5px]">
                    {c.title}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={[
                        "font-display font-light leading-none tracking-tight",
                        isDeadline
                          ? "text-[30px] sm:text-[36px] lg:text-[40px]"
                          : "text-[30px] sm:text-[36px] lg:text-[40px]",
                        "text-brand-ivory",
                      ].join(" ")}
                    >
                      {c.value}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-brand-ivory/60 sm:text-[11.5px]">
                      {c.label}
                    </span>
                  </div>
                  {c.note && (
                    <p className="text-[11px] leading-snug text-brand-ivory/55 sm:text-[12px]">
                      {c.note}
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
