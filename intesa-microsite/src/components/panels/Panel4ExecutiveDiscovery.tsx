"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

export function Panel4ExecutiveDiscovery() {
  const p = intesa.panel4;

  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-8">
          <PanelHeadline text={p.headline} className="max-w-3xl" compact />
          {p.subhead ? (
            <p className="text-[12px] leading-relaxed text-brand-ivory/65 sm:text-[13px]">
              {p.subhead}
            </p>
          ) : null}
        </div>

        {/* 3 Executive Alignment Areas — primary, visually dominant. */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {p.questions.map((q, i) => (
            <motion.div
              key={q.question}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-4 sm:p-5"
              data-strategic-q={i + 1}
            >
              <span
                className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-orange-soft sm:text-[12px]"
                data-category="strategic-q"
              >
                {q.category}
              </span>
              <p className="mt-2 font-display text-[14px] font-medium leading-snug text-brand-ivory sm:text-[15px]">
                {q.question}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Secondary prompts — collapsible, lower visual priority. */}
        <details className="group rounded-xl border border-brand-ivory/10 bg-brand-green-mid/15 px-4 py-2.5 sm:px-5 sm:py-3">
          <summary className="flex cursor-pointer items-center justify-between text-[11px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[12px]">
            <span>{p.secondaryToggleLabel}</span>
            <span aria-hidden className="text-brand-ivory/40 transition-transform group-open:rotate-180">↓</span>
          </summary>
          <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2 sm:gap-2">
            {p.secondaryQuestions.map((q) => (
              <li
                key={q.question}
                className="rounded-lg border border-brand-ivory/10 bg-brand-green-deep/30 px-3 py-2 text-[12px] leading-snug text-brand-ivory/75 sm:text-[13px]"
                data-category="detail-question"
              >
                <span className="block text-[9px] uppercase tracking-[0.2em] text-brand-ivory/40">
                  Detail question
                </span>
                <span className="mt-0.5 block">{q.question}</span>
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-3 border-t border-brand-ivory/10 pt-3 sm:gap-6 sm:pt-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-brand-ivory/35">
            {p.appendixCallout}
          </p>
          <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-brand-ivory/45">
            <span>Validated priorities translate into governed operational workflow</span>
            <span aria-hidden className="text-brand-ivory/35">→</span>
          </p>
        </div>
      </div>
    </PanelShell>
  );
}
