"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

type Props = {
  /** target is 1-indexed (matches Panel1Opening's target convention). */
  onCta?: (target: number) => void;
};

/**
 * Decision Point — final scale-out logic.
 *
 * Replaces the earlier "Proposed Next Step" recap. The closer no
 * longer repeats pilot logistics; it defines the scale-out
 * decision logic: what the pilot validates, what scale-out
 * requires, and the strategic objective.
 */
export function Panel12FinalAsk({ onCta }: Props) {
  const p = intesa.panel12;
  return (
    <PanelShell eyebrow={p.eyebrow} className="items-center text-center" bg="deep">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <PanelHeadline text={p.headline} className="sm:text-5xl lg:text-6xl" />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-10 grid w-full gap-4 text-left sm:mt-12 sm:gap-5 lg:grid-cols-2"
        >
          {p.blocks.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-brand-ivory/12 bg-brand-green-deep/40 px-6 py-5 sm:px-7 sm:py-6"
            >
              <div className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/55 sm:text-[11px]">
                {b.title}
              </div>
              <ul className="mt-3 space-y-1.5 text-[14px] leading-snug text-brand-ivory/90 sm:mt-4 sm:space-y-2 sm:text-[15px]">
                {b.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-ivory/40" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-8 w-full max-w-3xl rounded-2xl border border-devin-mid/40 bg-devin-mid/8 px-6 py-5 text-left sm:mt-10 sm:px-7 sm:py-6"
        >
          <div className="text-[10px] uppercase tracking-[0.28em] text-devin-light sm:text-[11px]">
            {p.strategicObjective.label}
          </div>
          <p className="mt-2 text-[15px] leading-snug text-brand-ivory sm:text-[17px] lg:text-[18px]">
            {p.strategicObjective.value}
          </p>
        </motion.div>

        {onCta && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
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
