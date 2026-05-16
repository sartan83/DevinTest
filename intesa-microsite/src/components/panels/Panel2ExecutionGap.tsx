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
        {/* Header row. On lg, splits into hero+subline (left) and a
            small SDLC efficiency metric (right) so the page surfaces
            BOTH execution clocks without duplicating the ~100%
            milestone shown in the main visual below. */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-10">
          <div className="flex flex-col gap-3 sm:gap-4">
            <PanelHeadline text={p.headline} />
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-[13px] leading-relaxed text-brand-ivory/75 sm:text-[15px] lg:text-[16px]"
            >
              {p.support}
            </motion.p>
          </div>

          {p.topRightMetric && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full flex-col items-start gap-1 border-l-2 border-brand-orange/55 pl-4 sm:max-w-xs sm:pl-5 lg:items-end lg:border-l-0 lg:border-r-2 lg:pl-0 lg:pr-5 lg:text-right"
            >
              <span className="text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10.5px]">
                {p.topRightMetric.caption}
              </span>
              <span className="font-display text-[34px] font-light leading-none tracking-tight text-brand-ivory sm:text-[42px] lg:text-[48px]">
                {p.topRightMetric.value}
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-brand-ivory/70 sm:text-[11.5px]">
                {p.topRightMetric.note}
              </span>
            </motion.div>
          )}
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

        {/* Lower business-pressure card — the mainframe-to-cloud
            efficiency unlock. Replaces the prior dual-track band so
            this row owns ONE message: structural value capture
            tied to mainframe decommissioning, isytech extension
            and cloud migration. The exact official figure is left
            as a placeholder pending Intesa confirmation rather
            than invented. */}
        {p.businessPressure && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2 border-t border-brand-ivory/10 pt-4 sm:gap-2.5 sm:pt-5"
          >
            <span className="text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10.5px]">
              {p.businessPressure.caption}
            </span>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="font-display text-[16px] font-light leading-tight text-brand-ivory/85 sm:text-[20px] lg:text-[22px]">
                {p.businessPressure.value}
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-brand-ivory/60 sm:text-[11.5px]">
                {p.businessPressure.label}
              </span>
            </div>
            <p className="max-w-3xl text-[11.5px] leading-snug text-brand-ivory/65 sm:text-[12.5px]">
              {p.businessPressure.note}
            </p>
          </motion.div>
        )}

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
