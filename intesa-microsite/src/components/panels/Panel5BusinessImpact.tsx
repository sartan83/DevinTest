"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel5BusinessImpact() {
  const p = intesa.panel5;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex flex-col gap-7 sm:gap-9">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-10">
          <div>
            <PanelHeadline text={p.headline} />
            <p className="mt-4 text-[12px] uppercase tracking-[0.22em] text-brand-orange-soft/90 sm:text-[13px]">
              {p.useCase}
            </p>
            <a
              href={p.repoLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-brand-ivory/70 underline decoration-brand-ivory/25 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60 sm:text-[13px]"
            >
              <span aria-hidden>↗</span>
              <span className="font-mono">{p.repoLink.label}</span>
            </a>
          </div>
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {p.steps.map((s, i) => (
            <motion.div
              key={s.index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-brand-ivory/10 bg-brand-green-mid/25 p-5 sm:p-6"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/50">
                  Step
                </span>
                <span className="font-display text-3xl font-light text-brand-orange-soft">
                  {s.index}
                </span>
              </div>
              <h3 className="mt-3 font-display text-[15px] font-medium leading-snug text-brand-ivory sm:text-base">
                {s.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-brand-ivory/70 sm:text-sm">
                {s.body}
              </p>
              {i < p.steps.length - 1 && (
                <span aria-hidden className="absolute right-4 top-5 hidden text-brand-ivory/25 lg:block">
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
          {p.valueStatements.map((v, i) => (
            <div
              key={i}
              className="rounded-2xl border border-brand-orange/25 bg-brand-orange/5 px-5 py-4 text-sm leading-relaxed text-brand-ivory/85 sm:text-base"
            >
              {v}
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
