"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

type Props = {
  /** target is 1-indexed (matches Panel1Opening's target convention). */
  onCta?: (target: number) => void;
};

export function Panel12FinalAsk({ onCta }: Props) {
  const p = intesa.panel13;
  return (
    <PanelShell eyebrow={p.eyebrow} className="items-center text-center">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <PanelHeadline text={p.headline} />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-3xl text-base leading-relaxed text-brand-ivory/80 sm:mt-8 sm:text-lg"
        >
          {p.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-6 max-w-3xl rounded-2xl border border-brand-ivory/15 bg-brand-green-deep/45 px-5 py-4 text-left sm:mt-8 sm:px-6 sm:py-5"
        >
          <div className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/55">
            Commercial alignment
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-brand-ivory/85 sm:text-[14px]">
            {p.commercialAlignment}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-3xl rounded-2xl border border-brand-orange/35 bg-brand-orange/8 px-5 py-4 text-left sm:mt-8 sm:px-6 sm:py-5"
        >
          <div className="text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft/90">
            Closing question
          </div>
          <p className="mt-2 font-display text-lg font-light leading-snug text-brand-ivory sm:text-xl">
            {p.question}
          </p>
        </motion.div>

        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8">
          {p.nextSteps.map((step) => (
            <span
              key={step}
              className="inline-flex items-center gap-2 rounded-full border border-brand-ivory/15 bg-brand-green-deep/50 px-4 py-2 text-[12px] uppercase tracking-[0.22em] text-brand-ivory/85"
            >
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-brand-orange" />
              {step}
            </span>
          ))}
        </div>

        {onCta && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
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
