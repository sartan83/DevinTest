"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel1bAgenda() {
  const p = intesa.panel1b;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="grid gap-3 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-8">
          <PanelHeadline text={p.headline} compact />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        {/* Executive timeline — 5 minimal blocks. Readable in <10s. */}
        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-5 lg:gap-3">
          {p.blocks.map((b, i) => (
            <motion.div
              key={b.index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/25 p-3.5 sm:p-4"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[9px] uppercase tracking-[0.24em] text-brand-ivory/45 sm:text-[10px]">
                  Focus
                </span>
                <span className="font-display text-2xl font-light text-brand-orange-soft sm:text-3xl">
                  {b.index}
                </span>
              </div>
              <h3 className="mt-1.5 font-display text-[13px] font-medium leading-snug text-brand-ivory sm:text-[14px]">
                {b.title}
              </h3>
              <p className="mt-1.5 text-[11px] leading-snug text-brand-ivory/70 sm:text-[12px]">
                {b.helper}
              </p>
              {i < p.blocks.length - 1 && (
                <span aria-hidden className="absolute right-2.5 top-3 hidden text-brand-ivory/25 lg:block">
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <p className="text-[12px] italic leading-relaxed text-brand-ivory/65 sm:text-[13px]">
          {p.closing}
        </p>
      </div>
    </PanelShell>
  );
}
