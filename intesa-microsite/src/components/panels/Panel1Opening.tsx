"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel1Opening() {
  const p = intesa.panel1;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="grid items-center gap-6 sm:gap-9 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <PanelHeadline text={p.headline} />
          <PanelSubhead>{p.subhead}</PanelSubhead>

          <div className="mt-5 inline-flex max-w-2xl items-start gap-3 rounded-2xl border border-brand-orange/30 bg-brand-orange/5 px-4 py-2.5 sm:mt-6 sm:px-5 sm:py-3.5">
            <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
            <p className="text-[13px] font-medium leading-relaxed text-brand-ivory/90 sm:text-base">
              {p.framingLine}
            </p>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {p.kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/40 p-4 backdrop-blur-sm sm:p-5"
            >
              <div className="flex items-baseline gap-2">
                <div className="font-display text-2xl font-light leading-none text-brand-ivory sm:text-3xl">
                  {k.value}
                </div>
                {k.estimated && (
                  <span className="rounded-full border border-brand-ivory/20 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.18em] text-brand-ivory/55">
                    est.
                  </span>
                )}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-brand-ivory/60 sm:text-xs">
                {k.label}
              </div>
              {k.caption && (
                <div className="mt-1 text-[10px] text-brand-ivory/40">{k.caption}</div>
              )}
              <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-brand-orange/10 blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Intesa matters — strategic anchors (scale / regulation / complexity).
         Compact horizontal strip; distinct from the investor-KPI grid above. */}
      <div className="mt-5 sm:mt-7">
        <div className="mb-2 flex items-baseline gap-3">
          <span className="text-[9px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10px]">
            {p.whyMatters.title}
          </span>
          <span aria-hidden className="h-px flex-1 bg-brand-ivory/10" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {p.whyMatters.anchors.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg border border-brand-ivory/10 bg-brand-green-mid/20 px-3 py-2 sm:px-3.5 sm:py-2.5"
            >
              <div className="font-display text-[15px] font-light leading-tight text-brand-ivory sm:text-base">
                {a.value}
              </div>
              <div className="mt-1 text-[10px] leading-snug text-brand-ivory/65 sm:text-[11px]">
                {a.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="mt-5 max-w-3xl text-[10px] leading-relaxed text-brand-ivory/40 sm:mt-6 sm:text-[11px]">
        {p.sourcesLine}
      </p>
    </PanelShell>
  );
}
