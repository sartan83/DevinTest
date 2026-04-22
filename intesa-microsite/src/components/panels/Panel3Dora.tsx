"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import {
  PanelShell,
  PanelHeadline,
  PanelSubhead,
  PanelClosing,
} from "../PanelShell";

export function Panel3Dora() {
  const p = intesa.panel3;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <PanelHeadline text={p.headline} />
          <PanelSubhead>{p.body}</PanelSubhead>
          <PanelClosing>{p.closing}</PanelClosing>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {p.cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-2xl border border-brand-ivory/10 bg-gradient-to-br from-brand-green-mid/70 to-brand-green-deep/60 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-medium text-brand-ivory">
                  {c.title}
                </h3>
                {c.tag && (
                  <span className="rounded-full border border-brand-orange/30 bg-brand-orange/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-brand-orange-soft">
                    {c.tag}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-brand-ivory/75">
                {c.body}
              </p>
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-brand-orange/5 blur-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
