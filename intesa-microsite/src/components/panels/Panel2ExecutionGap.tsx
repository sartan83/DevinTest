"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 2 — Why Now · Remaining 36%.
 *
 * Strategic execution-tension panel. Hero anchored on the operational
 * hardness of the remaining gap, not on a calendar milestone. The
 * 64% today → ~100% by 2029 progression frames the gap visually, with
 * the remaining 36% rendered as the tension zone between the two
 * states. A subtle €380M run-rate marker below ties the urgency to
 * structural efficiency value capture (Intesa-side, not Devin-side).
 * Closing line reframes the discussion from "should we modernize?"
 * to "can execution capacity scale fast enough?".
 */
export function Panel2ExecutionGap() {
  const p = intesa.panel2;
  const [today, target] = p.states;
  return (
    <PanelShell eyebrow={p.eyebrow} bg="deep">
      <div className="flex h-full flex-col justify-center gap-9 sm:gap-12 lg:gap-14">
        {/* Strategic hero + supporting line.
            ─────────────────────────────────────────────────────────
            The headline is the operational tension; the supporting
            line ties cloud migration to structural value capture
            without naming Devin. */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <PanelHeadline text={p.headline} />
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-[13px] leading-relaxed text-brand-ivory/70 sm:text-[15px] lg:text-[16px]"
          >
            {p.support}
          </motion.p>
        </div>

        {/* Current-state → tension zone → target-state progression.
            ─────────────────────────────────────────────────────────
            Three columns on desktop:
              [ 64% today ] [ 36% remaining ] [ ~100% by 2029 ]
            The middle slot is the operational tension being closed.
            Visually framed by a thin orange-edged bracket so it
            reads as the gap, not as a third KPI tile. */}
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

          {/* Tension zone — the remaining migration gap rendered as
              the operational hard part being closed. Sublte
              orange-tinted bracket frames the zone without making
              it a card. The label below names the gap explicitly. */}
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2 border-l border-brand-orange/40 pl-5 sm:pl-7"
          >
            <div className="font-display text-[3rem] font-light leading-none text-brand-ivory sm:text-[4.25rem] lg:text-[5rem]">
              {target.value}
            </div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[12px]">
              {target.label}
            </div>
          </motion.div>
        </div>

        {/* Dual-track pressure band.
            ─────────────────────────────────────────────────────────
            Two simultaneous value-capture vectors converging on the
            same execution capacity: cloud migration (~100% by 2029)
            and SDLC efficiency (15% / ~€70M by 2028). Rendered as
            two horizontal rails — minimal, premium, NOT a KPI tile
            block. Reads as the operational pressure landscape, not
            as a dashboard. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3 border-t border-brand-ivory/10 pt-4 sm:gap-4 sm:pt-5"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-brand-orange-soft sm:text-[10px]">
            {p.dualTrack.label}
          </span>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">
            {p.dualTrack.tracks.map((t, i) => (
              <motion.div
                key={t.key}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: 0.65 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3"
              >
                <span
                  aria-hidden
                  className={[
                    "mt-1.5 inline-block h-3 w-3 shrink-0 rounded-full",
                    t.key === "sdlc"
                      ? "bg-brand-orange/85 ring-2 ring-brand-orange/30"
                      : "border border-brand-ivory/40 bg-transparent",
                  ].join(" ")}
                />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/60 sm:text-[11px]">
                    {t.title}
                  </span>
                  <span className="font-display text-xl font-light leading-tight text-brand-ivory sm:text-[26px] lg:text-[30px]">
                    {t.target}
                  </span>
                  <span className="text-[11px] leading-snug text-brand-ivory/55 sm:text-[12px]">
                    {t.gap}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span aria-hidden className="h-px w-6 bg-brand-orange/55 sm:w-8" />
            <span className="text-[10px] uppercase tracking-[0.26em] text-brand-ivory/70 sm:text-[11px]">
              {p.dualTrack.callout}
            </span>
          </motion.div>
        </motion.div>

        {/* Closing line — reframes the executive discussion from
            "should we modernize?" to "can execution capacity scale
            fast enough?". */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="border-l-2 border-brand-orange/60 pl-4 sm:pl-5"
        >
          <p className="max-w-3xl font-display text-lg font-light leading-snug text-brand-ivory sm:text-xl lg:text-[26px]">
            {p.closing}
          </p>
        </motion.div>
      </div>
    </PanelShell>
  );
}
