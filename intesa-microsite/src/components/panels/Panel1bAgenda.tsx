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
              className="relative flex flex-col overflow-hidden rounded-2xl border border-brand-ivory/10 bg-brand-green-mid/25 p-4 sm:p-5 lg:p-6"
            >
              <div className="flex items-baseline gap-2.5">
                <span className="text-[10px] uppercase tracking-[0.26em] text-brand-ivory/50 sm:text-[11px]">
                  Focus
                </span>
                <span className="font-display text-3xl font-light text-brand-orange-soft sm:text-4xl lg:text-[2.75rem]">
                  {b.index}
                </span>
              </div>
              <h3 className="mt-2.5 font-display text-[15px] font-medium leading-snug text-brand-ivory sm:text-[17px] lg:text-[19px]">
                {b.title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-brand-ivory/72 sm:text-[13.5px] lg:text-[14.5px]">
                {b.helper}
              </p>
              {i < p.blocks.length - 1 && (
                <span aria-hidden className="absolute right-3 top-4 hidden text-brand-ivory/25 lg:block">
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {p.closing ? (
          <p className="text-[13px] italic leading-relaxed text-brand-ivory/68 sm:text-[14.5px] lg:text-[16px]">
            {p.closing}
          </p>
        ) : null}
      </div>
    </PanelShell>
  );
}
