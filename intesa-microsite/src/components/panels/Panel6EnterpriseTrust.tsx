"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead, PanelClosing } from "../PanelShell";

export function Panel6EnterpriseTrust() {
  const p = intesa.panel6;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="grid gap-2.5 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-8">
          <PanelHeadline text={p.headline} compact />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-5">
          {p.pillars.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col rounded-xl border border-brand-ivory/10 bg-brand-green-mid/25 p-3 sm:p-3.5"
            >
              {c.tag && (
                <span className="self-start rounded-full border border-brand-ivory/15 bg-brand-green-deep/50 px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-brand-ivory/60">
                  {c.tag}
                </span>
              )}
              <h3 className="mt-2 font-display text-[13px] font-medium leading-snug text-brand-ivory sm:text-[14px]">
                {c.title}
              </h3>
              <p className="mt-1.5 text-[11px] leading-snug text-brand-ivory/70 sm:text-[12px]">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>

        <PanelClosing>{p.closing}</PanelClosing>
      </div>
    </PanelShell>
  );
}
