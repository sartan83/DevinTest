"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

export function Panel9ItauReference() {
  const p = intesa.panel9;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-8">
          <PanelHeadline text={p.headline} compact />
          <div className="flex flex-col gap-1.5">
            <p className="text-[13px] leading-relaxed text-brand-ivory/80 sm:text-[14px]">
              {p.subtitle}
            </p>
            <p className="text-[11px] leading-relaxed text-brand-ivory/55 sm:text-[12px]">
              {p.intro}
            </p>
          </div>
        </div>

        {/* 4 KPI tiles — KPI-first storytelling, visually dominant numbers. */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {p.kpis.map((k, i) => (
            <motion.div
              key={k.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-brand-ivory/12 bg-brand-green-mid/35 p-4 sm:p-5"
            >
              <span className="font-display text-2xl font-light leading-tight text-brand-orange-soft sm:text-3xl lg:text-[2rem]">
                {k.metric}
              </span>
              <span className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-brand-ivory/65 sm:text-[11px]">
                {k.title}
              </span>
              <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-brand-orange/10 blur-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Governance + factory — bullet-fragment chips, not paragraphs. */}
        <div className="grid gap-2.5 sm:gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-brand-orange/30 bg-brand-orange/5 p-3.5 sm:p-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-brand-orange-soft sm:text-[11px]">
              {p.governanceSignal.title}
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5">
              {p.governanceSignal.bullets.map((b) => (
                <li
                  key={b}
                  className="rounded-full border border-brand-orange/30 bg-brand-orange/10 px-2.5 py-0.5 text-[11px] text-brand-ivory/85 sm:text-[12px]"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-brand-ivory/12 bg-brand-green-mid/20 p-3.5 sm:p-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/60 sm:text-[11px]">
              {p.factoryWorkflow.title}
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-brand-ivory/70 sm:text-[12px]">
              {p.factoryWorkflow.body}
            </p>
            <ul className="mt-1.5 flex flex-wrap gap-x-1.5 gap-y-1">
              {p.factoryWorkflow.examples.map((ex) => (
                <li
                  key={ex}
                  className="rounded-full border border-brand-ivory/15 bg-brand-green-deep/40 px-2 py-0.5 text-[10px] text-brand-ivory/70 sm:text-[11px]"
                >
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Operational scale anchors — illustrative reference points,
           shown as a compact tabular strip for visual contrast vs the KPI tiles. */}
        <div className="rounded-xl border border-brand-ivory/12 bg-brand-green-mid/15 px-3.5 py-2.5 sm:px-4 sm:py-3">
          <div className="mb-1.5 text-[10px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[11px]">
            {p.operationalScaleAnchors.title}
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-4 sm:gap-x-6">
            {p.operationalScaleAnchors.anchors.map((a) => (
              <div key={a.label} className="flex items-baseline gap-1.5">
                <span className="font-display text-[15px] font-light tabular-nums text-brand-orange-soft sm:text-base">
                  {a.value}
                </span>
                <span className="text-[10px] leading-snug text-brand-ivory/65 sm:text-[11px]">
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote-style row: governance constraint + Gartner source + disclaimer. */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10px] leading-relaxed text-brand-ivory/45 sm:text-[11px]">
          <span className="text-brand-ivory/65">{p.governanceConstraint}</span>
          <span className="text-brand-ivory/30">·</span>
          <a
            href={p.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline decoration-brand-ivory/25 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60"
          >
            <span aria-hidden>↗</span>
            <span>{p.sourceLabel}</span>
          </a>
          <span className="text-brand-ivory/30">·</span>
          <span>{p.disclaimer}</span>
        </div>
      </div>
    </PanelShell>
  );
}
