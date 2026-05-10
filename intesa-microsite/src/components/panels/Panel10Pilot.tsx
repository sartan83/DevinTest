"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

export function Panel10Pilot() {
  const p = intesa.panel11;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="clean">
      <div className="flex flex-col gap-5 sm:gap-6">
        <PanelHeadline text={p.headline} compact />

        {/* 3 blocks — Scope / Validation / Enterprise safeguards. */}
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
          {p.blocks.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/25 p-4 sm:p-5"
            >
              <div className="text-[10px] uppercase tracking-[0.24em] text-brand-orange-soft sm:text-[11px]">
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
                <span aria-hidden className="absolute right-3 top-3 hidden text-brand-ivory/25 lg:block">
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
