"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 1 — Hero / Why Intesa.
 *
 * Cognition-style reset: operational pressure first, no transformation
 * storytelling. Current-state vs target-state KPIs (64% / ~100% / €4.6B
 * / ~3,300) lead. A short tension block (legacy dependencies / remediation
 * / testing / repetitive migration work) anchors the execution bottleneck.
 * No paragraphs, no scale narrative, no investor recap.
 */
export function Panel1Opening() {
  const p = intesa.panel1;
  return (
    <PanelShell eyebrow={p.eyebrow} bg="deep">
      <div className="grid items-center gap-6 sm:gap-9 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <PanelHeadline text={p.headline} />

          <p className="mt-5 max-w-xl text-[13px] font-medium leading-relaxed text-brand-ivory/85 sm:text-[15px]">
            {p.closingNarrative}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {p.kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/40 p-4 backdrop-blur-sm sm:p-5"
            >
              <div className="flex items-baseline gap-2">
                <div className="font-display text-2xl font-light leading-none text-brand-ivory sm:text-3xl">
                  {k.value}
                </div>
                {k.estimated && (
                  <span className="rounded-full border border-brand-ivory/20 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.18em] text-brand-ivory/55">
                    est.
                  </span>
                )}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-brand-ivory/60 sm:text-xs">
                {k.label}
              </div>
              <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-brand-orange/10 blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Operational tension block — Cognition-style. Replaces the
         "Why Intesa matters" scale-anchor strip with execution-first
         pressure framing. */}
      <div className="mt-5 sm:mt-7">
        <div className="mb-2 flex items-baseline gap-3">
          <span className="text-[9px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10px]">
            {p.pressure.title}
          </span>
          <span aria-hidden className="h-px flex-1 bg-brand-ivory/10" />
        </div>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 sm:gap-x-5">
          {p.pressure.bullets.map((b, i) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline gap-2 text-[12px] leading-snug text-brand-ivory/80 sm:text-[13px]"
            >
              <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-brand-orange/70" />
              <span>{b}</span>
            </motion.li>
          ))}
        </ul>
        <p className="mt-2.5 text-[12px] italic leading-snug text-brand-ivory/70 sm:text-[13px]">
          {p.pressure.bottleneck}
        </p>
      </div>

      <p className="mt-5 text-[10px] leading-snug text-brand-ivory/35 sm:mt-6 sm:text-[11px]">
        {p.sourcesLine}
      </p>
    </PanelShell>
  );
}
