"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

type Props = {
  /** target is 1-indexed (matches Panel1Opening's target convention). */
  onCta?: (target: number) => void;
};

/**
 * Decision Point — final commercial ask.
 *
 * The closer reframes the decision from "can AI write code?" to
 * "can governed AI execution safely accelerate the remaining
 * modernization wave?". Below the hero, two commitment blocks
 * make the next step explicit (4-week sprint + follow-up review)
 * and a short action-bullet row crystallises what advancing looks
 * like before leaving the room. The strategic objective stays as
 * the final anchor under the ask.
 */
export function Panel12FinalAsk({ onCta }: Props) {
  const p = intesa.panel12;
  return (
    <PanelShell eyebrow={p.eyebrow} className="items-center text-center" bg="deep">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <PanelHeadline text={p.headline} className="sm:text-5xl lg:text-6xl" />

        {/* Subline — anchors the actual decision being asked of the
            room, not the pilot mechanics. */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-3xl text-[14px] leading-relaxed text-brand-ivory/96 sm:mt-6 sm:text-[16px] lg:text-[17px]"
        >
          {p.subhead}
        </motion.p>

        {/* Commitment ask — two explicit blocks: recommended next
            step + follow-up decision meeting. Premium executive
            minimalism: thin top-rule, small uppercase label, single
            short sentence per block. No bullet lists, no card chrome. */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid w-full gap-5 text-left sm:mt-12 sm:gap-6 lg:grid-cols-2 lg:gap-8"
        >
          {p.commitment.map((c, i) => {
            const isPrimary = i === 0;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: 0.3 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  isPrimary
                    ? "flex flex-col border-t-[1.5px] border-brand-orange/55 pt-5 sm:pt-6"
                    : "flex flex-col border-t border-brand-ivory/25 pt-5 sm:pt-6"
                }
              >
                <span
                  className={
                    isPrimary
                      ? "text-[10.5px] uppercase tracking-[0.32em] text-brand-orange sm:text-[11px]"
                      : "text-[10.5px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[11px]"
                  }
                >
                  {c.label}
                </span>
                <p
                  className={
                    isPrimary
                      ? "mt-3 font-display text-lg font-medium leading-snug text-brand-ivory sm:text-xl lg:text-[22px]"
                      : "mt-3 text-[14px] leading-relaxed text-brand-ivory/94 sm:text-[15px] lg:text-[16px]"
                  }
                >
                  {c.value}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Action bullets — 3 concrete pre-flight items that make
            advancing tangible. Compact, executive, checkbox-style —
            NOT a project plan. Centered label on the left, chip row
            on the right; sits at the bottom of the ask. */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex w-full flex-col items-start gap-3 border-t border-brand-ivory/20 pt-5 text-left sm:mt-10 sm:flex-row sm:items-center sm:gap-5"
        >
          <span className="shrink-0 text-[10.5px] uppercase tracking-[0.32em] text-brand-orange-soft sm:text-[11px]">
            {p.actionBullets.label}
          </span>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {p.actionBullets.items.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.45,
                  delay: 0.5 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-ivory/25 bg-brand-ivory/[0.04] px-2.5 py-1 text-[11px] leading-tight text-brand-ivory/94 sm:text-[12px]"
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-[1px] bg-brand-orange/80"
                />
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Strategic objective — final anchor under the ask. */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 w-full max-w-3xl rounded-2xl border border-devin-mid/40 bg-devin-mid/8 px-6 py-5 text-left sm:mt-10 sm:px-7 sm:py-6"
        >
          <div className="text-[10.5px] uppercase tracking-[0.28em] text-devin-light sm:text-[11px]">
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
              className="group inline-flex items-center gap-2 rounded-full border border-brand-ivory/20 px-5 py-3 text-sm font-medium text-brand-ivory/96 transition-all hover:border-brand-ivory/40 hover:bg-brand-ivory/5"
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
