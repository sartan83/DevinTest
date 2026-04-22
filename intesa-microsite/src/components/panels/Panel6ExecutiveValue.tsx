"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel6ExecutiveValue() {
  const p = intesa.panel6;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex flex-col gap-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <PanelHeadline text={p.headline} />
          <PanelSubhead>{p.subhead}</PanelSubhead>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.cards.map((c, i) => (
            <motion.div
              key={c.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-ivory/10 bg-brand-green-mid/30 p-6 transition-all hover:-translate-y-1 hover:border-brand-orange/40"
            >
              <div className="text-[11px] uppercase tracking-[0.28em] text-brand-ivory/50">
                {c.role}
              </div>
              <div className="mt-4 font-display text-3xl font-light text-brand-ivory">
                {c.metric}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-brand-ivory/70">
                {c.body}
              </p>
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-brand-orange/5 blur-3xl transition-all group-hover:bg-brand-orange/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
