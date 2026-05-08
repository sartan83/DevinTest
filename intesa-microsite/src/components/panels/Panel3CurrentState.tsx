"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 3 — Current State · Discovery Signals.
 *
 * EB-pivot rebuild: replaces the previous validated/hypothesis/alignment
 * observation grid with a bullet-point numeric list anchored on what
 * pre-meeting discovery surfaced. Assumption-flagged items carry an
 * inline "working assumption to validate" tag.
 */
export function Panel3CurrentState() {
  const p = intesa.panel3;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-5 sm:gap-7">
        <PanelHeadline text={p.headline} compact />

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
