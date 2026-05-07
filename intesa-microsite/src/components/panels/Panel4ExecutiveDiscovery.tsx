"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel4ExecutiveDiscovery() {
  const p = intesa.panel4;

  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex flex-col gap-5 sm:gap-7">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-10">
          <PanelHeadline text={p.headline} className="max-w-3xl" />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        {/* Two-column workshop framing: known vs needs-validation */}
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-ivory/12 bg-brand-green-mid/20 p-5 sm:p-6">
            <div className="text-[10px] uppercase tracking-[0.26em] text-brand-ivory/60">
              {p.columns.knownLabel}
            </div>
            <ul className="mt-3 space-y-2">
              {p.columns.knownItems.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-relaxed text-brand-ivory/75"
                >
                  <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-ivory/40" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-5 sm:p-6">
            <div className="text-[10px] uppercase tracking-[0.26em] text-brand-orange-soft">
              {p.columns.validateLabel}
            </div>
            <ul className="mt-3 space-y-2">
              {p.columns.validateItems.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-relaxed text-brand-ivory/85"
                >
                  <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Discovery questions list (workshop-style, no tabs) */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {p.questions.map((q, i) => (
            <motion.div
              key={q.question}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-2xl border border-brand-ivory/10 bg-brand-green-mid/25 p-5 sm:p-6"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange-soft">
                  Q{i + 1}
                </span>
              </div>
              <p className="mt-2 font-display text-[15px] font-medium leading-snug text-brand-ivory sm:text-base">
                {q.question}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-brand-ivory/65 sm:text-sm">
                {q.why}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-[10px] uppercase tracking-[0.26em] text-brand-ivory/45 sm:text-[11px]">
          {p.appendixCallout}
        </p>
      </div>
    </PanelShell>
  );
}
