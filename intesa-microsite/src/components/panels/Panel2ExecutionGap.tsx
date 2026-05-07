"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead, PanelClosing } from "../PanelShell";

export function Panel2ExecutionGap() {
  const p = intesa.panel2;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex flex-col gap-8 sm:gap-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-10">
          <PanelHeadline text={p.headline} />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        <div className="overflow-hidden rounded-2xl border border-brand-ivory/10 bg-brand-green-mid/25">
          <div className="grid grid-cols-[1fr_1fr] border-b border-brand-ivory/10 px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-brand-ivory/55 sm:px-6 sm:py-4 sm:text-[11px]">
            <span>Strategic ambition</span>
            <span>Current execution reality</span>
          </div>
          <div>
            {p.rows.map((r, i) => (
              <motion.div
                key={r.ambition}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                className={[
                  "grid grid-cols-[1fr_1fr] items-center gap-4 px-4 py-4 sm:px-6 sm:py-5",
                  i < p.rows.length - 1 ? "border-b border-brand-ivory/5" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <span aria-hidden className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange/70 sm:inline-block" />
                  <span className="text-sm font-medium leading-snug text-brand-ivory sm:text-base">
                    {r.ambition}
                  </span>
                </div>
                <div className="text-sm leading-snug text-brand-ivory/70 sm:text-base">
                  {r.reality}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="max-w-3xl text-sm leading-relaxed text-brand-ivory/75 sm:text-base">
          {p.closing}
        </p>
        <PanelClosing>The execution gap, made visible.</PanelClosing>
      </div>
    </PanelShell>
  );
}
