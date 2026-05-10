"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 3 — Discovery Signals · convergence pressure.
 *
 * The slide frames the strategic-priorities convergence: modernization,
 * scalability, AI adoption, governance, and delivery velocity all
 * landing on the same constrained execution capacity. A high-impact
 * tension signal (~36% migration gap before 2029) anchors the slide
 * before the hero statement and the four supporting bullets.
 */
export function Panel3CurrentState() {
  const p = intesa.panel3;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
          <PanelHeadline text={p.headline} compact />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-1 lg:items-end lg:text-right"
          >
            <span className="font-display text-[72px] font-semibold leading-[0.92] tracking-tight text-brand-orange-soft sm:text-[96px] lg:text-[112px]">
              {p.tensionSignal.value}
            </span>
            <span className="max-w-xs text-[11px] uppercase tracking-[0.22em] text-brand-ivory/60 sm:text-[12px]">
              {p.tensionSignal.label}
            </span>
          </motion.div>
        </div>

        <ul className="grid gap-3 sm:gap-3.5 sm:grid-cols-2">
          {p.discoverySignals.map((sig, i) => (
            <motion.li
              key={sig.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: 0.04 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex gap-4 rounded-xl border border-brand-ivory/10 bg-brand-green-mid/25 px-4 py-3 sm:px-5 sm:py-3.5"
            >
              <span
                aria-hidden
                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
              />
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-lg font-light leading-none text-brand-ivory sm:text-xl">
                    {sig.value}
                  </span>
                  <span className="text-[12px] leading-snug text-brand-ivory/80 sm:text-[13px]">
                    {sig.label}
                  </span>
                </div>
                {sig.assumption && (
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-ivory/20 bg-brand-ivory/5 px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-brand-ivory/60 sm:text-[10px]">
                    <span
                      aria-hidden
                      className="inline-block h-1 w-1 rounded-full bg-brand-ivory/55"
                    />
                    Working assumption to validate
                  </span>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </PanelShell>
  );
}
