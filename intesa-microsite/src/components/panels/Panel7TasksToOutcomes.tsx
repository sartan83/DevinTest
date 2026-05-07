"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel7TasksToOutcomes() {
  const p = intesa.panel7;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-10">
          <PanelHeadline text={p.headline} />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        {/* Capacity redeployment hypothesis — premium block. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-brand-orange/30 bg-devin-gradient-soft bg-brand-green-mid/35 p-5 shadow-elev sm:p-6"
        >
          <div className="text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft/90">
            {p.modelHypothesis.label}
          </div>
          <div className="mt-3 grid gap-4 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-8">
            <div className="font-display text-brand-ivory">
              {p.modelHypothesis.formulaLines.map((line, i) => (
                <div
                  key={i}
                  className={[
                    "leading-tight",
                    i === p.modelHypothesis.formulaLines.length - 1
                      ? "text-2xl font-light text-brand-orange-soft sm:text-3xl"
                      : "text-base font-light text-brand-ivory/80 sm:text-lg",
                  ].join(" ")}
                >
                  {line}
                </div>
              ))}
            </div>
            <p className="text-[13px] leading-relaxed text-brand-ivory/80 sm:text-[14px]">
              {p.modelHypothesis.explanation}
            </p>
          </div>
        </motion.div>

        <div className="overflow-hidden rounded-2xl border border-brand-ivory/10 bg-brand-green-mid/25">
          <div className="grid grid-cols-[1fr_1fr] border-b border-brand-ivory/10 px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-brand-ivory/55 sm:px-6 sm:py-4 sm:text-[11px]">
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
                  "grid grid-cols-[1fr_1fr] items-center gap-4 px-4 py-3 sm:px-6 sm:py-4",
                  i < p.rows.length - 1 ? "border-b border-brand-ivory/5" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <span aria-hidden className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-brand-ivory/40 sm:inline-block" />
                  <span className="text-[13px] leading-snug text-brand-ivory/85 sm:text-[14px]">
                    {r.technical}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span aria-hidden className="hidden text-brand-orange/70 sm:inline-block">→</span>
                  <span className="text-[13px] font-medium leading-snug text-brand-ivory sm:text-[14px]">
                    {r.outcome}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="max-w-4xl rounded-2xl border border-brand-orange/30 bg-brand-orange/5 px-5 py-4 text-sm leading-relaxed text-brand-ivory/90 sm:text-base">
          {p.leverageStatement}
        </p>
      </div>
    </PanelShell>
  );
}
