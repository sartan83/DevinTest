"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel5BusinessImpact() {
  const p = intesa.panel5;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="grid gap-3 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-8">
          <div>
            <PanelHeadline text={p.headline} compact />
            <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-brand-orange-soft/90 sm:text-[12px]">
              {p.useCase}
            </p>
            <a
              href={p.repoLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-brand-ivory/70 underline decoration-brand-ivory/25 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60 sm:text-[12px]"
            >
              <span aria-hidden>↗</span>
              <span className="font-mono">{p.repoLink.label}</span>
            </a>
            <p className="mt-2 text-[10px] leading-relaxed text-brand-ivory/45 sm:text-[11px]">
              {p.repoDisclaimer}
            </p>
          </div>
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {p.steps.map((s, i) => (
            <motion.div
              key={s.index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/25 p-3.5 sm:p-4"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[9px] uppercase tracking-[0.28em] text-brand-ivory/50 sm:text-[10px]">
                  Step
                </span>
                <span className="font-display text-2xl font-light text-brand-orange-soft sm:text-3xl">
                  {s.index}
                </span>
              </div>
              <h3 className="mt-2 font-display text-[14px] font-medium leading-snug text-brand-ivory sm:text-[15px]">
                {s.title}
              </h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-brand-ivory/65 sm:text-[13px]">
                {s.body}
              </p>
              {i < p.steps.length - 1 && (
                <span aria-hidden className="absolute right-3 top-3.5 hidden text-brand-ivory/25 lg:block">
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid gap-2.5 sm:gap-3 lg:grid-cols-2">
          {p.valueStatements.map((v, i) => (
            <div
              key={i}
              className="rounded-xl border border-brand-orange/25 bg-brand-orange/5 px-4 py-3 text-[13px] leading-relaxed text-brand-ivory/85 sm:text-[14px]"
            >
              {v}
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
