"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 11 — 4-Week Pilot · controlled validation sprint.
 *
 * Cognition-style operational pilot. Reads as a small, controlled
 * validation sprint with explicit measurement and an executive gate
 * — not as a transformation programme or consulting roadmap.
 *
 * Layout (top → bottom):
 *   1. Hero + supporting subline
 *   2. "Measured KPIs" rail (uppercase chip row, sits above the
 *      timeline so each week below maps onto an explicit KPI set)
 *   3. Four weekly execution blocks (W1 → W4), each with 4 bounded
 *      activities and a visual progression connector
 *   4. "Decision criteria" module — what the executive review at
 *      the end of Week 4 validates before scale-out
 */
export function Panel10Pilot() {
  const p = intesa.panel11;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="clean">
      <div className="flex flex-col gap-5 sm:gap-6 lg:gap-7">
        {/* Hero + supporting subline. */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          <PanelHeadline text={p.headline} compact />
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-[12.5px] leading-relaxed text-brand-ivory/70 sm:text-[14px] lg:text-[15px]"
          >
            {p.subhead}
          </motion.p>
        </div>

        {/* Measured KPIs rail.
            ─────────────────────────────────────────────────────────
            Uppercase chip row sitting above the weekly timeline.
            Each chip is a single measurable KPI; the pilot baselines
            this set in Week 1 and reports against it in Week 4. The
            label on the left and the chips on the right read as a
            single measurement frame, not as 7 separate KPI tiles. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2.5 rounded-2xl border border-brand-ivory/10 bg-brand-ivory/[0.025] px-4 py-3.5 sm:px-5 sm:py-4 lg:flex-row lg:items-center lg:gap-5"
        >
          <span className="shrink-0 text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[11px]">
            {p.measuredKpis.label}
          </span>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {p.measuredKpis.items.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.45,
                  delay: 0.22 + i * 0.035,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-ivory/15 bg-brand-ivory/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-brand-ivory/75 sm:text-[11px]"
              >
                <span
                  aria-hidden
                  className="inline-block h-1 w-1 rounded-full bg-brand-orange/70"
                />
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* 4 weekly execution blocks. On desktop they line up as a
            horizontal timeline with arrow connectors between weeks;
            on mobile they stack vertically. */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {p.blocks.map((b, i) => (
            <motion.div
              key={b.week}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/25 p-4 sm:p-5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[11px]">
                  {b.week}
                </span>
                <span className="font-display text-[11px] font-light leading-none text-brand-ivory/35 sm:text-[12px]">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-2 text-[14px] font-medium leading-snug text-brand-ivory sm:text-[15px]">
                {b.title}
              </div>
              <ul className="mt-3 space-y-2">
                {b.items.map((it) => (
                  <li
                    key={it}
                    className="flex gap-2 text-[12px] leading-snug text-brand-ivory/85 sm:text-[13px]"
                  >
                    <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange/70" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              {i < p.blocks.length - 1 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-base text-brand-ivory/25 lg:block"
                >
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Decision criteria module.
            ─────────────────────────────────────────────────────────
            Premium executive gate. Sits below the weekly timeline
            as the explicit list of conditions that determine
            scale-out at the Week 4 review. Renders as a thin
            top-rule with a small caption row and an inline chip
            list — not a card, not a checklist, not an additional
            pilot week. */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3 border-t border-brand-ivory/10 pt-4 sm:gap-3.5 sm:pt-5"
        >
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-[11px] uppercase tracking-[0.32em] text-brand-orange sm:text-[12px]">
              {p.decisionCriteria.label}
            </span>
            <span className="text-[10px] italic leading-snug text-brand-ivory/55 sm:text-[11px]">
              {p.decisionCriteria.caption}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {p.decisionCriteria.items.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.45,
                  delay: 0.5 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/[0.06] px-2.5 py-1 text-[11px] leading-tight text-brand-ivory sm:text-[12px]"
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-[1px] bg-brand-orange/80"
                />
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </PanelShell>
  );
}
