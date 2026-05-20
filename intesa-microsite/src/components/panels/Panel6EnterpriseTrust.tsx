"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 6 — Governed Acceleration.
 *
 * Compact governance slide: three pillars, max 3 bullets each, one
 * small proof metric, one review-reframe line. Reduced ~40% in
 * height vs. the previous layout — no large card padding, no body
 * paragraph between title and bullets, no closing footer.
 */
export function Panel6EnterpriseTrust() {
  const p = intesa.panel6;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="deep">
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Header — headline + tight subline. */}
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <PanelHeadline text={p.headline} compact />
          {p.subhead && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-[12px] leading-relaxed text-brand-ivory/90 sm:text-[13.5px] lg:text-[14.5px]"
            >
              {p.subhead}
            </motion.p>
          )}
        </div>

        {/* Three governance pillars on a single row. Compact cards
            with a thin top-rule, 3 bullets max, no body paragraph.
            Each pillar reads in under 4 seconds. */}
        <div className="grid gap-2.5 sm:gap-3 lg:grid-cols-3">
          {p.pillars.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.08 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2.5 rounded-xl border border-brand-ivory/20 bg-brand-green-mid/25 px-3.5 py-3.5 sm:px-4 sm:py-4"
            >
              <div className="flex items-baseline justify-between gap-2 border-b border-brand-ivory/20 pb-2">
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10.5px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[10.5px] uppercase tracking-[0.2em] text-brand-ivory/75 sm:text-[10.5px]">
                  Pillar
                </span>
              </div>
              <h3 className="font-display text-[14.5px] font-semibold leading-tight text-brand-ivory sm:text-[16px] lg:text-[17px]">
                {c.title}
              </h3>
              {c.bullets && c.bullets.length > 0 && (
                <ul className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.18em] text-brand-ivory/92 sm:text-[11.5px]">
                  {c.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange-soft/85"
                      />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Proof metric + review reframe — one tight row. */}
        <div className="flex flex-col gap-2 border-t border-brand-ivory/20 pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
          {p.proofMetric && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5"
            >
              <span className="text-[10.5px] uppercase tracking-[0.26em] text-brand-orange-soft sm:text-[10.5px]">
                {p.proofMetric.caption}
              </span>
              <span className="font-display text-[20px] font-light leading-none text-brand-ivory sm:text-[22px]">
                {p.proofMetric.value}
              </span>
              <span className="text-[11px] leading-snug text-brand-ivory/92 sm:text-[12px]">
                {p.proofMetric.label}
              </span>
            </motion.div>
          )}
          {p.reviewReframe && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-[11.5px] italic leading-snug text-brand-ivory/90 sm:text-[12.5px] lg:text-right"
            >
              {p.reviewReframe}
            </motion.p>
          )}
        </div>
      </div>
    </PanelShell>
  );
}
