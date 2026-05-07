"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead, PanelClosing } from "../PanelShell";

export function Panel2ExecutionGap() {
  const p = intesa.panel2;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="grid gap-2.5 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-8">
          <PanelHeadline text={p.headline} compact />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        <div className="overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/25">
          <div className="grid grid-cols-[1fr_1fr] border-b border-brand-ivory/10 px-3.5 py-1.5 text-[9px] uppercase tracking-[0.24em] text-brand-ivory/55 sm:px-5 sm:py-2 sm:text-[10px]">
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
                  "grid grid-cols-[1fr_1fr] items-center gap-3 px-3.5 py-2 sm:px-5 sm:py-2.5",
                  i < p.rows.length - 1 ? "border-b border-brand-ivory/5" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange/70 sm:inline-block" />
                  <span className="text-[12px] font-medium leading-snug text-brand-ivory sm:text-[13px]">
                    {r.ambition}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span aria-hidden className="hidden text-brand-orange/70 sm:inline-block">→</span>
                  <span className="text-[12px] leading-snug text-brand-ivory/75 sm:text-[13px]">
                    {r.reality}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <PanelClosing>{p.closing}</PanelClosing>
      </div>
    </PanelShell>
  );
}
