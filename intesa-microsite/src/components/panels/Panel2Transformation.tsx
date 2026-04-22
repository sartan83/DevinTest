"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import {
  PanelShell,
  PanelHeadline,
  PanelSubhead,
  PanelClosing,
} from "../PanelShell";

export function Panel2Transformation() {
  const p = intesa.panel2;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <PanelHeadline text={p.headline} />
          <PanelSubhead>{p.body}</PanelSubhead>
          <PanelClosing>{p.closing}</PanelClosing>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {p.cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/30 p-5 transition-colors hover:border-brand-orange/40 hover:bg-brand-green-mid/50"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-orange/80" />
                <div>
                  <h3 className="text-base font-medium text-brand-ivory">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-ivory/70">
                    {c.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
