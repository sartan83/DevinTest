"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 11 — 4-Week Pilot · week-by-week operational validation.
 *
 * Four equally weighted blocks (W1 → W4) with a clean timeline
 * progression. The pilot reads as a small, controlled operational
 * sprint with explicit weekly checkpoints — not a transformation
 * programme or consulting roadmap.
 */
export function Panel10Pilot() {
  const p = intesa.panel11;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="clean">
      <div className="flex flex-col gap-5 sm:gap-6">
        <PanelHeadline text={p.headline} compact />

        {/* 4 weekly execution blocks. On desktop they line up as a
            horizontal timeline with arrow connectors between weeks;
            on mobile they stack vertically. */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {p.blocks.map((b, i) => (
            <motion.div
              key={b.week}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/25 p-4 sm:p-5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[11px]">
                  {b.week}
                </span>
                <span className="font-display text-[11px] font-light leading-none text-brand-ivory/35 sm:text-[12px]">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-2 text-[14px] font-medium leading-snug text-brand-ivory sm:text-[15px]">
                {b.title}
              </div>
              <ul className="mt-3 space-y-2">
                {b.items.map((it) => (
                  <li
                    key={it}
                    className="flex gap-2 text-[12px] leading-snug text-brand-ivory/85 sm:text-[13px]"
                  >
                    <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange/70" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              {i < p.blocks.length - 1 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-base text-brand-ivory/25 lg:block"
                >
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
