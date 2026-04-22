"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel8Lighthouse() {
  const p = intesa.panel8;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex flex-col gap-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <PanelHeadline text={p.headline} />
          <PanelSubhead>{p.subhead}</PanelSubhead>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {p.weeks.map((w, i) => (
            <motion.div
              key={w.week}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-brand-ivory/10 bg-brand-green-mid/30 p-6"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] uppercase tracking-[0.28em] text-brand-ivory/55">
                  Week
                </span>
                <span className="font-display text-3xl font-light text-brand-orange-soft">
                  {w.week}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-medium text-brand-ivory">
                {w.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-ivory/70">
                {w.body}
              </p>
              {i < p.weeks.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-3 top-4 hidden text-brand-ivory/25 lg:block"
                >
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div>
          <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-brand-ivory/50">
            Readout KPIs
          </div>
          <div className="flex flex-wrap gap-2">
            {p.kpis.map((k) => (
              <div
                key={k.value}
                className="flex items-baseline gap-2 rounded-full border border-brand-ivory/15 bg-brand-green-deep/50 px-4 py-2"
              >
                <span className="text-sm font-medium text-brand-ivory">{k.value}</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/55">
                  {k.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {p.ctas.map((c) => (
            <button
              key={c.label}
              className={[
                "group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all",
                c.kind === "primary"
                  ? "bg-devin-gradient text-brand-ivory shadow-glow hover:brightness-110"
                  : "border border-brand-ivory/20 text-brand-ivory/90 hover:border-brand-ivory/40 hover:bg-brand-ivory/5",
              ].join(" ")}
            >
              <span>{c.label}</span>
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </button>
          ))}
        </div>

        <p className="text-[11px] uppercase tracking-[0.28em] text-brand-ivory/40">
          Illustrative scenario · customer-dedicated isolated environment · single-tenant · human-in-the-loop
        </p>
      </div>
    </PanelShell>
  );
}
