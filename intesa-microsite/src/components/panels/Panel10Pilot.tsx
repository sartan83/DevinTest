"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel10Pilot() {
  const p = intesa.panel11;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-8">
          <PanelHeadline text={p.headline} compact />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        <p className="rounded-xl border border-brand-orange/25 bg-brand-orange/5 px-3 py-2 text-[12px] leading-relaxed text-brand-ivory/85 sm:text-[13px]">
          {p.executiveFraming}
        </p>

        {/* Executive timeline — week + title only, items in <details>. */}
        <div className="grid gap-2.5 sm:gap-3 lg:grid-cols-4">
          {p.weeks.map((w, i) => (
            <motion.div
              key={w.week}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/25 p-3.5 sm:p-4"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[9px] uppercase tracking-[0.24em] text-brand-ivory/50 sm:text-[10px]">
                  Week
                </span>
                <span className="font-display text-3xl font-light text-brand-orange-soft sm:text-4xl">
                  {w.week}
                </span>
              </div>
              <h3 className="mt-2 font-display text-[14px] font-medium leading-snug text-brand-ivory sm:text-[15px]">
                {w.title}
              </h3>
              <details className="group mt-2.5">
                <summary className="cursor-pointer text-[10px] uppercase tracking-[0.22em] text-brand-ivory/45 hover:text-brand-ivory/70 sm:text-[11px]">
                  Operational detail
                  <span aria-hidden className="ml-1 inline-block transition-transform group-open:rotate-180">↓</span>
                </summary>
                <ul className="mt-2 space-y-1.5">
                  {w.items.map((it) => (
                    <li
                      key={it}
                      className="flex gap-2 text-[11px] leading-snug text-brand-ivory/75 sm:text-[12px]"
                    >
                      <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange/70" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </details>
              {i < p.weeks.length - 1 && (
                <span aria-hidden className="absolute right-3 top-3 hidden text-brand-ivory/25 lg:block">
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* 3 primary KPIs visible + accordion for the rest. */}
        <div className="rounded-xl border border-brand-ivory/10 bg-brand-green-deep/40 p-3.5 sm:p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-[13px] font-medium text-brand-ivory sm:text-[15px]">
              {p.kpisTitle}
            </h3>
            <span className="text-[9px] uppercase tracking-[0.24em] text-brand-ivory/45 sm:text-[10px]">
              Decision-grade evidence
            </span>
          </div>
          <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-3">
            {p.kpis.map((kpi) => (
              <li
                key={kpi}
                className="flex items-start gap-2 rounded-lg border border-brand-ivory/8 bg-brand-green-mid/30 px-2.5 py-2"
              >
                <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange/70" />
                <span className="text-[12px] leading-snug text-brand-ivory/85 sm:text-[13px]">
                  {kpi}
                </span>
              </li>
            ))}
          </ul>
          <details className="group mt-2.5">
            <summary className="cursor-pointer text-[10px] uppercase tracking-[0.22em] text-brand-ivory/45 hover:text-brand-ivory/70 sm:text-[11px]">
              {p.kpisDetailToggleLabel}
              <span aria-hidden className="ml-1 inline-block transition-transform group-open:rotate-180">↓</span>
            </summary>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-3">
              {p.kpisDetail.map((kpi) => (
                <li
                  key={kpi}
                  className="rounded-lg border border-brand-ivory/8 bg-brand-green-mid/20 px-2.5 py-1.5 text-[11px] leading-snug text-brand-ivory/70 sm:text-[12px]"
                >
                  {kpi}
                </li>
              ))}
            </ul>
          </details>
          <p className="mt-2.5 text-[10px] leading-relaxed text-brand-ivory/55 sm:text-[11px]">
            {p.kpiNote}
          </p>
        </div>

        <p className="text-[11px] leading-relaxed text-brand-ivory/65 sm:text-[12px]">
          {p.validationMaturity}
        </p>
      </div>
    </PanelShell>
  );
}
