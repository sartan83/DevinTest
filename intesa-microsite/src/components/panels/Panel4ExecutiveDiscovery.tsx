"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel4ExecutiveDiscovery() {
  const p = intesa.panel4;

  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="grid gap-3 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-8">
          <PanelHeadline text={p.headline} className="max-w-3xl" compact />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        {/* Two-column workshop framing: identified vs. needs-alignment —
         * collapsed into compact horizontal banner. */}
        <div className="grid gap-2.5 sm:gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-brand-ivory/12 bg-brand-green-mid/20 p-3.5 sm:p-4">
            <div className="text-[9px] uppercase tracking-[0.24em] text-brand-ivory/60 sm:text-[10px]">
              {p.columns.knownLabel}
            </div>
            <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
              {p.columns.knownItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-1.5 text-[12px] leading-snug text-brand-ivory/75"
                >
                  <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-ivory/40" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-brand-orange/30 bg-brand-orange/5 p-3.5 sm:p-4">
            <div className="text-[9px] uppercase tracking-[0.24em] text-brand-orange-soft sm:text-[10px]">
              {p.columns.validateLabel}
            </div>
            <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
              {p.columns.validateItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-1.5 text-[12px] leading-snug text-brand-ivory/85"
                >
                  <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Primary discovery questions (3) — strategic, executive-level. */}
        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {p.questions.map((q, i) => (
            <motion.div
              key={q.question}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-xl border border-brand-orange/30 bg-brand-orange/5 p-3.5 sm:p-4"
            >
              <span className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-orange-soft">
                Strategic Q{i + 1}
              </span>
              <p className="mt-1.5 font-display text-[13px] font-medium leading-snug text-brand-ivory sm:text-[14px]">
                {q.question}
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-brand-ivory/65 sm:text-[12px]">
                {q.why}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Secondary questions — visible but de-emphasized. */}
        <div className="grid gap-2 sm:grid-cols-2 sm:gap-2.5">
          {p.secondaryQuestions.map((q) => (
            <div
              key={q.question}
              className="flex flex-col rounded-lg border border-brand-ivory/10 bg-brand-green-mid/15 px-3 py-2.5 sm:px-3.5 sm:py-3"
            >
              <span className="text-[9px] uppercase tracking-[0.24em] text-brand-ivory/45">
                Detail question
              </span>
              <p className="mt-1 text-[12px] leading-snug text-brand-ivory/80 sm:text-[13px]">
                {q.question}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[10px] uppercase tracking-[0.24em] text-brand-ivory/40">
          {p.appendixCallout}
        </p>
      </div>
    </PanelShell>
  );
}
