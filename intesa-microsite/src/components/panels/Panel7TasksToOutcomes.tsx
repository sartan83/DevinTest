"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

export function Panel7TasksToOutcomes() {
  const p = intesa.panel7;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="grid gap-2.5 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-6">
          <PanelHeadline text={p.headline} compact />
          {p.subhead ? (
            <p className="text-[12px] leading-relaxed text-brand-ivory/70 sm:text-[13px]">{p.subhead}</p>
          ) : null}
        </div>

        {/* Capacity redeployment hypothesis — premium block. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-brand-orange/30 bg-devin-gradient-soft bg-brand-green-mid/35 p-3.5 shadow-elev sm:p-4"
        >
          <div className="text-[9px] uppercase tracking-[0.24em] text-brand-orange-soft/90 sm:text-[10px]">
            {p.modelHypothesis.label}
          </div>
          <div className="mt-2 grid gap-3 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-6">
            <div className="font-display text-brand-ivory">
              {p.modelHypothesis.formulaLines.map((line, i) => (
                <div
                  key={i}
                  className={[
                    "leading-tight",
                    i === p.modelHypothesis.formulaLines.length - 1
                      ? "text-lg font-light text-brand-orange-soft sm:text-xl"
                      : "text-sm font-light text-brand-ivory/80 sm:text-base",
                  ].join(" ")}
                >
                  {line}
                </div>
              ))}
            </div>
            <p className="text-[12px] leading-relaxed text-brand-ivory/80 sm:text-[13px]">
              {p.modelHypothesis.explanation}
            </p>
          </div>
        </motion.div>

        <div className="overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/25">
          <div className="grid grid-cols-[1fr_1fr] border-b border-brand-ivory/10 px-3.5 py-1.5 text-[9px] uppercase tracking-[0.24em] text-brand-ivory/55 sm:px-5 sm:py-2 sm:text-[10px]">
            <span>Engineering capability</span>
            <span>Business outcome</span>
          </div>
          <div>
            {p.rows.map((r, i) => (
              <motion.div
                key={r.technical}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                className={[
                  "grid grid-cols-[1fr_1fr] items-center gap-3 px-3.5 py-1.5 sm:px-5 sm:py-2",
                  i < p.rows.length - 1 ? "border-b border-brand-ivory/5" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-brand-ivory/40 sm:inline-block" />
                  <span className="text-[12px] leading-snug text-brand-ivory/85 sm:text-[13px]">
                    {r.technical}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span aria-hidden className="hidden text-brand-orange/70 sm:inline-block">→</span>
                  <span className="text-[12px] font-medium leading-snug text-brand-ivory sm:text-[13px]">
                    {r.outcome}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="max-w-4xl rounded-xl border border-brand-orange/30 bg-brand-orange/5 px-3.5 py-2.5 text-[12px] leading-relaxed text-brand-ivory/90 sm:px-4 sm:py-3 sm:text-[13px]">
          {p.leverageStatement}
        </p>

        {/* Developer-equivalent translation — capacity redeployment, not headcount. */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[11px] text-brand-ivory/75 sm:text-[12px]">
          <span className="tabular-nums font-medium text-brand-ivory">{p.devEquivalent.hours}</span>
          <span aria-hidden className="text-brand-ivory/35">≈</span>
          <span>{p.devEquivalent.fte}</span>
        </div>
        <p className="text-[10px] leading-snug text-brand-ivory/40 sm:text-[11px]">
          {p.devEquivalent.footnote}
        </p>
      </div>
    </PanelShell>
  );
}
