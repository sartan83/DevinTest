"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

export function Panel9ItauReference() {
  const p = intesa.panel9;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="grid gap-2.5 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-6">
          <PanelHeadline text={p.headline} compact />
          <div className="flex flex-col gap-1.5">
            <p className="text-[12px] leading-relaxed text-brand-ivory/75 sm:text-[13px]">{p.subtitle}</p>
            <p className="text-[11px] leading-relaxed text-brand-ivory/60 sm:text-[12px]">
              {p.intro}
            </p>
          </div>
        </div>

        {/* 4 KPI tiles — premium, restrained, enterprise-grade. */}
        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {p.kpis.map((k, i) => (
            <motion.div
              key={k.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-xl border border-brand-ivory/12 bg-brand-green-mid/30 p-3 sm:p-3.5"
            >
              <span className="text-[9px] uppercase tracking-[0.24em] text-brand-ivory/55 sm:text-[10px]">
                {k.title}
              </span>
              <span className="mt-1 font-display text-lg font-light leading-tight text-brand-orange-soft sm:text-xl">
                {k.metric}
              </span>
              <p className="mt-1.5 text-[11px] leading-snug text-brand-ivory/65 sm:text-[12px]">
                {k.description}
              </p>
              <div className="pointer-events-none absolute -right-6 -top-6 h-14 w-14 rounded-full bg-brand-orange/10 blur-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Governance signal + factory workflow — two-column row. */}
        <div className="grid gap-2 sm:gap-2.5 lg:grid-cols-2">
          <div className="rounded-xl border border-brand-orange/30 bg-brand-orange/5 p-3 sm:p-3.5">
            <div className="text-[9px] uppercase tracking-[0.24em] text-brand-orange-soft sm:text-[10px]">
              {p.governanceSignal.title}
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-brand-ivory/85 sm:text-[12px]">
              {p.governanceSignal.body}
            </p>
          </div>
          <div className="rounded-xl border border-brand-ivory/12 bg-brand-green-mid/20 p-3 sm:p-3.5">
            <div className="text-[9px] uppercase tracking-[0.24em] text-brand-ivory/60 sm:text-[10px]">
              {p.factoryWorkflow.title}
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-brand-ivory/75 sm:text-[12px]">
              {p.factoryWorkflow.body}
            </p>
            <ul className="mt-1.5 flex flex-wrap gap-x-1.5 gap-y-1">
              {p.factoryWorkflow.examples.map((ex) => (
                <li
                  key={ex}
                  className="rounded-full border border-brand-ivory/15 bg-brand-green-deep/40 px-2 py-0.5 text-[10px] text-brand-ivory/75 sm:text-[11px]"
                >
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="rounded-xl border border-brand-ivory/12 bg-brand-green-deep/40 px-3 py-2 text-[11px] leading-snug text-brand-ivory/80 sm:px-3.5 sm:py-2.5 sm:text-[12px]">
          {p.governanceConstraint}
        </p>

        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10px] leading-relaxed text-brand-ivory/45 sm:text-[11px]">
          <a
            href={p.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline decoration-brand-ivory/25 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60"
          >
            <span aria-hidden>↗</span>
            <span>{p.sourceLabel}</span>
          </a>
          <span className="text-brand-ivory/35">·</span>
          <span>{p.disclaimer}</span>
        </div>
      </div>
    </PanelShell>
  );
}
