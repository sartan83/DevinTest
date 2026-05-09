"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Enterprise-Ready Execution.
 *
 * Cognition reset: 3 reassurance signals only (Governed / Secure /
 * Observable). The slide answers a single question — "Can this
 * realistically run inside enterprise governance?" — and nothing
 * else.
 */
export function Panel11MutualCommitment() {
  const p = intesa.panel12;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-5 sm:gap-6">
        <PanelHeadline text={p.headline} compact />

        <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
          {p.signals.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-brand-ivory/12 bg-brand-green-mid/30 p-5 sm:p-6"
            >
              <span className="font-display text-3xl font-light leading-tight text-brand-orange-soft sm:text-4xl">
                {s.title}
              </span>
              <span className="mt-3 text-[12px] leading-snug text-brand-ivory/80 sm:text-[13px]">
                {s.body}
              </span>
              <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-brand-orange/10 blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
