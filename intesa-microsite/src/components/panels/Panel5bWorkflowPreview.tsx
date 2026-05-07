"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel5bWorkflowPreview() {
  const p = intesa.panel5b;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="grid gap-2.5 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-8">
          <PanelHeadline text={p.headline} compact />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        {/* 4-step pipeline — full width, no mock review card. */}
        <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-3">
          {p.steps.map((s, i) => (
            <motion.div
              key={s.index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full flex-col overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/25 p-3 sm:p-3.5"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[9px] uppercase tracking-[0.24em] text-brand-ivory/45 sm:text-[10px]">
                  Step
                </span>
                <span className="font-display text-xl font-light text-brand-orange-soft sm:text-2xl">
                  {s.index}
                </span>
              </div>
              <h3 className="mt-1.5 font-display text-[13px] font-medium leading-snug text-brand-ivory sm:text-[14px]">
                {s.title}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="flex gap-1.5 text-[11px] leading-snug text-brand-ivory/75 sm:text-[12px]"
                  >
                    <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange/65" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              {i < p.steps.length - 1 && (
                <span aria-hidden className="absolute right-2 top-2 hidden text-brand-ivory/25 lg:block">
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Single executive insight + small disclaimer. */}
        <p className="rounded-xl border border-brand-orange/25 bg-brand-orange/5 px-3 py-2 text-[12px] leading-relaxed text-brand-ivory/85 sm:text-[13px]">
          {p.insight}
        </p>
        <p className="text-[10px] leading-snug text-brand-ivory/45 sm:text-[11px]">
          {p.disclaimer}
        </p>
      </div>
    </PanelShell>
  );
}
