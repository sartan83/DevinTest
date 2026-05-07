"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel5bWorkflowPreview() {
  const p = intesa.panel5b;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="grid gap-2.5 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-8">
          <PanelHeadline text={p.headline} compact />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        {/* 4-step pipeline + governed PR review card on the right. */}
        <div className="grid gap-2.5 lg:grid-cols-[1.6fr_1fr] lg:gap-3">
          {/* Pipeline */}
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-2.5 lg:grid-cols-2 xl:grid-cols-4">
            {p.steps.map((s, i) => (
              <motion.div
                key={s.index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex h-full flex-col overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/25 p-2.5 sm:p-3"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-[9px] uppercase tracking-[0.24em] text-brand-ivory/45 sm:text-[10px]">
                    Step
                  </span>
                  <span className="font-display text-xl font-light text-brand-orange-soft sm:text-2xl">
                    {s.index}
                  </span>
                </div>
                <h3 className="mt-1.5 font-display text-[12px] font-medium leading-snug text-brand-ivory sm:text-[13px]">
                  {s.title}
                </h3>
                <ul className="mt-1.5 space-y-1">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="flex gap-1.5 text-[10px] leading-snug text-brand-ivory/70 sm:text-[11px]"
                    >
                      <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange/65" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                {i < p.steps.length - 1 && (
                  <span aria-hidden className="absolute right-2 top-2 hidden text-brand-ivory/25 xl:block">
                    →
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Governed PR review card — enterprise-grade, no terminal aesthetics. */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-xl border border-brand-orange/30 bg-devin-gradient-soft bg-brand-green-mid/35 p-2.5 shadow-elev sm:p-3"
            data-testid="workflow-review-card"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] uppercase tracking-[0.22em] text-brand-orange-soft/90 sm:text-[10px]">
                {p.review.label}
              </span>
              <span className="rounded-full border border-brand-orange/45 bg-brand-orange/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-brand-orange-soft">
                Awaiting approval
              </span>
            </div>
            <h3 className="mt-2 font-display text-[12px] font-medium leading-snug text-brand-ivory sm:text-[13px]">
              {p.review.title}
            </h3>
            <p className="mt-1 text-[10px] leading-snug text-brand-ivory/65 sm:text-[11px]">
              {p.review.meta}
            </p>
            <ul className="mt-2 space-y-1">
              {p.review.ticks.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.15 + 0.08 * i }}
                  className="flex items-center gap-2 rounded-lg border border-brand-ivory/8 bg-brand-green-deep/40 px-2 py-1.5"
                >
                  <span
                    aria-hidden
                    className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-brand-orange/55 text-[9px] text-brand-orange-soft"
                  >
                    ✓
                  </span>
                  <span className="text-[10px] leading-snug text-brand-ivory/80 sm:text-[11px]">
                    {t}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Single executive insight + small disclaimer. */}
        <p className="rounded-xl border border-brand-orange/25 bg-brand-orange/5 px-3 py-2 text-[12px] leading-relaxed text-brand-ivory/85 sm:text-[13px]">
          {p.insight}
        </p>
        <p className="text-[10px] leading-snug text-brand-ivory/45 sm:text-[11px]">
          {p.disclaimer}
        </p>
      </div>
    </PanelShell>
  );
}
