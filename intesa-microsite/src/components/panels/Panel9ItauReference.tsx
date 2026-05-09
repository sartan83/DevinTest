"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

export function Panel9ItauReference() {
  const p = intesa.panel9;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <PanelHeadline text={p.headline} compact />
          {p.logoSrc ? (
            <div className="flex items-center gap-2 self-start sm:self-end">
              <span className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/45 sm:text-[11px]">
                Reference
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logoSrc}
                alt={p.logoAlt}
                className="h-5 w-auto opacity-70 sm:h-6"
              />
            </div>
          ) : null}
        </div>

        {/* 4 metric tiles — pure number-first proof. No description prose. */}
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
              <span className="font-display text-3xl font-light leading-tight text-brand-orange-soft sm:text-4xl lg:text-[2.5rem]">
                {k.metric}
              </span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.22em] text-brand-ivory/65 sm:text-[11px]">
                {k.title}
              </span>
              <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-brand-orange/10 blur-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Single footnote-style row: governed-AI framing + Gartner source. */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10px] leading-relaxed text-brand-ivory/45 sm:text-[11px]">
          <span className="text-brand-ivory/65">{p.footnote}</span>
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
