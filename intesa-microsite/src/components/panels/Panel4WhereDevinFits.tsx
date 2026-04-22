"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import {
  PanelShell,
  PanelHeadline,
  PanelSubhead,
  PanelClosing,
} from "../PanelShell";

export function Panel4WhereDevinFits() {
  const p = intesa.panel4;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <PanelHeadline text={p.headline} />
          <PanelSubhead>{p.subhead}</PanelSubhead>
          <PanelClosing>{p.closing}</PanelClosing>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {p.modules.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-2xl border border-brand-ivory/10 bg-brand-green-mid/30 p-6 transition-colors hover:border-brand-orange/30"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-devin-gradient-soft text-xs font-semibold text-brand-orange-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-medium text-brand-ivory">{m.title}</h3>
                {m.tag && (
                  <span className="ml-auto rounded-full border border-brand-ivory/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-brand-ivory/60">
                    {m.tag}
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-brand-ivory/70">
                {m.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
