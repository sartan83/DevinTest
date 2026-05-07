"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead, PanelClosing } from "../PanelShell";

export function Panel6EnterpriseTrust() {
  const p = intesa.panel6;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex flex-col gap-8 sm:gap-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-10">
          <PanelHeadline text={p.headline} />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {p.pillars.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col rounded-2xl border border-brand-ivory/10 bg-brand-green-mid/25 p-5"
            >
              {c.tag && (
                <span className="self-start rounded-full border border-brand-ivory/15 bg-brand-green-deep/50 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.22em] text-brand-ivory/60">
                  {c.tag}
                </span>
              )}
              <h3 className="mt-3 font-display text-[15px] font-medium leading-snug text-brand-ivory sm:text-base">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-ivory/70">
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
