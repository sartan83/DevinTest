"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import {
  PanelShell,
  PanelHeadline,
  PanelClosing,
} from "../PanelShell";

export function Panel5UseCase() {
  const p = intesa.panel5;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex flex-col gap-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <PanelHeadline text={p.headline} />
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-brand-orange-soft">
              Scenario
            </div>
            <div className="mt-2 font-display text-2xl font-light text-brand-ivory">
              {p.scenarioTitle}
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-ivory/65">
              {p.scenarioBody}
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-brand-ivory/10 bg-brand-green-deep/60 p-6"
          >
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-brand-ivory/50">
              {p.before.title}
            </div>
            <ul className="space-y-3">
              {p.before.points.map((pt) => (
                <li
                  key={pt}
                  className="flex items-start gap-3 text-sm text-brand-ivory/70"
                >
                  <span className="mt-2 inline-block h-1 w-4 rounded-full bg-brand-ivory/25" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-brand-orange/25 bg-gradient-to-br from-brand-green-mid/60 to-brand-green-deep/60 p-6"
          >
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-brand-orange-soft">
              {p.after.title}
            </div>
            <ul className="space-y-3">
              {p.after.points.map((pt) => (
                <li
                  key={pt}
                  className="flex items-start gap-3 text-sm text-brand-ivory/85"
                >
                  <span className="mt-2 inline-block h-1 w-4 rounded-full bg-brand-orange/80" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-brand-orange/10 blur-3xl" />
          </motion.div>
        </div>

        <div className="mt-2">
          <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-brand-ivory/50">
            Workflow
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {p.workflow.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                  className={[
                    "rounded-full border px-4 py-1.5 text-xs",
                    i === p.workflow.length - 1
                      ? "border-brand-orange/50 bg-brand-orange/10 text-brand-orange-soft"
                      : "border-brand-ivory/15 text-brand-ivory/80",
                  ].join(" ")}
                >
                  {step}
                </motion.div>
                {i < p.workflow.length - 1 && (
                  <span className="text-brand-ivory/30">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <PanelClosing>{p.closing}</PanelClosing>
      </div>
    </PanelShell>
  );
}
