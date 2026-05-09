"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

type Props = {
  /** target is 1-indexed (matches Panel1Opening's target convention). */
  onCta?: (target: number) => void;
};

/**
 * Proposed Next Step.
 *
 * Cognition reset: 3 fields only (Pilot scope / Pilot duration /
 * Success outcome) plus a single closing line. No sponsor models,
 * no commercial alignment paragraph, no roadmap visuals.
 */
export function Panel12FinalAsk({ onCta }: Props) {
  const p = intesa.panel13;
  return (
    <PanelShell eyebrow={p.eyebrow} className="items-center text-center" bg="deep">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <PanelHeadline text={p.headline} className="sm:text-5xl lg:text-6xl" />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-8 grid w-full max-w-3xl gap-3 text-left sm:gap-4"
        >
          {p.fields.map((f) => (
            <div
              key={f.label}
              className="flex flex-col gap-0.5 rounded-xl border border-brand-ivory/12 bg-brand-green-deep/40 px-5 py-3 sm:flex-row sm:items-baseline sm:gap-6 sm:py-4"
            >
              <div className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/55 sm:w-44 sm:shrink-0 sm:text-[11px]">
                {f.label}
              </div>
              <div className="text-[14px] leading-snug text-brand-ivory/90 sm:text-[15px]">
                {f.value}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-6 max-w-2xl text-[12px] leading-relaxed text-brand-ivory/55 sm:mt-8 sm:text-[13px]"
        >
          {p.closingLine}
        </motion.p>

        {onCta && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onCta(1)}
              className="group inline-flex items-center gap-2 rounded-full border border-brand-ivory/20 px-5 py-3 text-sm font-medium text-brand-ivory/90 transition-all hover:border-brand-ivory/40 hover:bg-brand-ivory/5"
            >
              <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">←</span>
              <span>Back to opening</span>
            </button>
            <button
              onClick={() => onCta(11)}
              className="group inline-flex items-center gap-2 rounded-full bg-devin-gradient px-5 py-3 text-sm font-medium text-brand-ivory shadow-glow transition-all hover:brightness-110"
            >
              <span>Re-open the 4-week pilot</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        )}
      </div>
    </PanelShell>
  );
}
