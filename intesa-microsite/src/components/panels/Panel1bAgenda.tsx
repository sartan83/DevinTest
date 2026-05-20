"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel1bAgenda() {
  const p = intesa.panel1b;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="deep">
      <div className="flex flex-col gap-5 sm:gap-7 lg:gap-8">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-10">
          <PanelHeadline text={p.headline} />
          {p.subhead ? (
            <PanelSubhead className="mt-0 text-[14px] sm:text-[15px] lg:text-[17px]">
              {p.subhead}
            </PanelSubhead>
          ) : null}
        </div>

        {/* Executive timeline — 5 enlarged blocks. */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5 lg:gap-4">
          {p.blocks.map((b, i) => (
            <motion.div
              key={b.index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-brand-ivory/15 bg-brand-green-mid/25 p-4 sm:p-5 lg:p-6"
            >
              <div className="flex items-baseline gap-2.5">
                <span className="text-[11px] uppercase tracking-[0.24em] text-brand-ivory/65 sm:text-[12px]">
                  Focus
                </span>
                <span className="font-display text-3xl font-light text-brand-orange-soft sm:text-4xl lg:text-[2.75rem]">
                  {b.index}
                </span>
              </div>
              <h3 className="mt-2.5 font-display text-[15px] font-medium leading-snug text-brand-ivory sm:text-[17px] lg:text-[19px]">
                {b.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-brand-ivory/80 sm:text-[14px] lg:text-[15px]">
                {b.helper}
              </p>
              {i < p.blocks.length - 1 && (
                <span aria-hidden className="absolute right-3 top-4 hidden text-brand-ivory/40 lg:block">
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {p.todayGoal ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-brand-ivory/20 bg-brand-ivory/[0.05] px-5 py-4 sm:gap-2.5 sm:px-6 sm:py-5 lg:px-7 lg:py-6"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-3 left-0 w-[2px] rounded-full bg-brand-ivory/55"
            />
            <span className="text-[11.5px] uppercase tracking-[0.26em] text-brand-ivory/75 sm:text-[12px]">
              {p.todayGoal.label}
            </span>
            <p className="font-display text-[16px] font-medium leading-snug text-brand-ivory sm:text-[18px] lg:text-[20px]">
              {p.todayGoal.text}
            </p>
          </motion.div>
        ) : null}

        {p.discoveryQuestion ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-brand-orange/35 bg-brand-orange/[0.05] px-5 py-4 shadow-[0_12px_36px_-22px_rgba(243,111,33,0.5)] sm:gap-2.5 sm:px-6 sm:py-5 lg:px-7 lg:py-6"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-3 left-0 w-[2px] rounded-full bg-brand-orange/70"
            />
            <span className="text-[11.5px] uppercase tracking-[0.26em] text-brand-orange sm:text-[12px]">
              Opening question
            </span>
            <p className="font-display text-[17px] font-medium italic leading-snug text-brand-ivory sm:text-[19px] lg:text-[22px]">
              {p.discoveryQuestion}
            </p>
          </motion.div>
        ) : null}

        {p.closing ? (
          <p className="text-[13.5px] italic leading-relaxed text-brand-ivory/80 sm:text-[15px] lg:text-[16.5px]">
            {p.closing}
          </p>
        ) : null}
      </div>
    </PanelShell>
  );
}
