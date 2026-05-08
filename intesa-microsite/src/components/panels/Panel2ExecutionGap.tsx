"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell } from "../PanelShell";

/**
 * Panel 2 — Why Now · 2029.
 *
 * Replaces the former "Strategic Ambition / Execution Gap" panel.
 * Brutal executive minimalism: current-state → target-state anchors,
 * a single closing tension line, no explanatory paragraphs. The
 * presenter narrates the urgency live.
 */
export function Panel2ExecutionGap() {
  const p = intesa.panel2;
  const [today, target] = p.states;
  return (
    <PanelShell eyebrow={p.eyebrow} bg="deep">
      <div className="flex h-full flex-col justify-center gap-12 sm:gap-16">
        {/* 2029 oversized anchor */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3"
        >
          <div className="font-display text-[6rem] font-light leading-[0.9] tracking-displaytight text-brand-ivory sm:text-[8.5rem] lg:text-[11rem]">
            {p.bigYear}
          </div>
          <div className="text-[12px] uppercase tracking-[0.32em] text-brand-orange-soft sm:text-[13px]">
            {p.yearCaption}
          </div>
        </motion.div>

        {/* Current → target progression */}
        <div className="grid items-end gap-8 sm:gap-12 lg:grid-cols-[1fr_auto_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2 border-l border-brand-ivory/15 pl-5 sm:pl-7"
          >
            <div className="font-display text-[3.25rem] font-light leading-none text-brand-ivory sm:text-[4.5rem] lg:text-[5.5rem]">
              {today.value}
            </div>
            <div className="text-[12px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[13px]">
              {today.label}
            </div>
          </motion.div>

          {/* Subtle directional arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
            className="hidden self-center text-3xl font-light text-brand-orange-soft/70 lg:block"
          >
            →
          </motion.div>
          <div aria-hidden className="block text-2xl text-brand-orange-soft/60 lg:hidden">
            ↓
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2 border-l border-brand-orange/40 pl-5 sm:pl-7"
          >
            <div className="font-display text-[3.25rem] font-light leading-none text-brand-ivory sm:text-[4.5rem] lg:text-[5.5rem]">
              {target.value}
            </div>
            <div className="text-[12px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[13px]">
              {target.label}
            </div>
          </motion.div>
        </div>

        {/* Closing tension line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="border-l-2 border-brand-orange/60 pl-4 sm:pl-5"
        >
          <p className="font-display text-xl font-light leading-snug text-brand-ivory sm:text-2xl lg:text-[1.75rem]">
            {p.closing}
          </p>
        </motion.div>
      </div>
    </PanelShell>
  );
}
