"use client";

import { motion } from "framer-motion";
import { intesa, type ObservationStatus } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead, PanelClosing } from "../PanelShell";

const statusStyles: Record<
  ObservationStatus,
  { dot: string; pill: string; pillText: string; label: string }
> = {
  validated: {
    dot: "bg-brand-orange",
    pill: "border-brand-orange/40 bg-brand-orange/10",
    pillText: "text-brand-orange-soft",
    label: "Validated",
  },
  hypothesis: {
    dot: "bg-brand-ivory/65",
    pill: "border-brand-ivory/25 bg-brand-ivory/5",
    pillText: "text-brand-ivory/80",
    label: "Hypothesis",
  },
  alignment: {
    dot: "bg-brand-ivory/35 border border-brand-ivory/40",
    pill: "border-brand-ivory/15 bg-brand-green-deep/40",
    pillText: "text-brand-ivory/60",
    label: "Needs alignment",
  },
};

export function Panel3CurrentState() {
  const p = intesa.panel3;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex flex-col gap-7 sm:gap-9">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-10">
          <PanelHeadline text={p.headline} />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {p.legend.map((item) => {
            const s = statusStyles[item.status];
            return (
              <div
                key={item.status}
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
                  s.pill,
                ].join(" ")}
                title={item.helper}
              >
                <span aria-hidden className={["inline-block h-1.5 w-1.5 rounded-full", s.dot].join(" ")} />
                <span
                  className={[
                    "text-[10px] uppercase tracking-[0.22em] sm:text-[11px]",
                    s.pillText,
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {p.observations.map((o, i) => {
            const s = statusStyles[o.status];
            return (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col rounded-2xl border border-brand-ivory/10 bg-brand-green-mid/25 p-5 sm:p-6"
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden className={["inline-block h-1.5 w-1.5 rounded-full", s.dot].join(" ")} />
                  <span
                    className={[
                      "text-[9px] uppercase tracking-[0.24em] sm:text-[10px]",
                      s.pillText,
                    ].join(" ")}
                  >
                    {s.label}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-base font-medium leading-snug text-brand-ivory sm:text-lg">
                  {o.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ivory/70">
                  {o.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <PanelClosing>{p.closing}</PanelClosing>
      </div>
    </PanelShell>
  );
}
