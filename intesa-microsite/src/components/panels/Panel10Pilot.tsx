"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel10Pilot() {
  const p = intesa.panel11;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex flex-col gap-8 sm:gap-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-10">
          <PanelHeadline text={p.headline} />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        <div className="grid gap-3 sm:gap-4 lg:grid-cols-4">
          {p.weeks.map((w, i) => (
            <motion.div
              key={w.week}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-brand-ivory/10 bg-brand-green-mid/25 p-5 sm:p-6"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/50">
                  Week
                </span>
                <span className="font-display text-3xl font-light text-brand-orange-soft">
                  {w.week}
                </span>
              </div>
              <h3 className="mt-3 font-display text-base font-medium leading-snug text-brand-ivory sm:text-lg">
                {w.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {w.items.map((it) => (
                  <li
                    key={it}
                    className="flex gap-2 text-[13px] leading-relaxed text-brand-ivory/75 sm:text-sm"
                  >
                    <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange/70" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              {i < p.weeks.length - 1 && (
                <span aria-hidden className="absolute right-4 top-5 hidden text-brand-ivory/25 lg:block">
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="rounded-2xl border border-brand-ivory/10 bg-brand-green-deep/40 p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-base font-medium text-brand-ivory sm:text-lg">
              {p.kpisTitle}
            </h3>
            <span className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/45">
              Decision-grade evidence
            </span>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {p.kpis.map((kpi) => (
              <li
                key={kpi}
                className="flex items-start gap-2 rounded-xl border border-brand-ivory/8 bg-brand-green-mid/30 px-3 py-2.5"
              >
                <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange/70" />
                <span className="text-[13px] leading-snug text-brand-ivory/85 sm:text-sm">
                  {kpi}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] leading-relaxed text-brand-ivory/55 sm:text-xs">
            {p.kpiNote}
          </p>
        </div>
      </div>
    </PanelShell>
  );
}
