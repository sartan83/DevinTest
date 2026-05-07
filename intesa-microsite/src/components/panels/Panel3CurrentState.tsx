"use client";

import { motion } from "framer-motion";
import { intesa, type ObservationStatus } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

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
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="grid gap-3 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-8">
          <PanelHeadline text={p.headline} compact />
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2">
          {p.legend.map((item) => {
            const s = statusStyles[item.status];
            return (
              <div
                key={item.status}
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-2.5 py-1",
                  s.pill,
                ].join(" ")}
                title={item.helper}
              >
                <span aria-hidden className={["inline-block h-1.5 w-1.5 rounded-full", s.dot].join(" ")} />
                <span
                  className={[
                    "text-[9px] uppercase tracking-[0.22em] sm:text-[10px]",
                    s.pillText,
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {p.observations.map((o, i) => {
            const s = statusStyles[o.status];
            return (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col rounded-xl border border-brand-ivory/10 bg-brand-green-mid/25 p-3.5 sm:p-4"
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden className={["inline-block h-1.5 w-1.5 rounded-full", s.dot].join(" ")} />
                  <span
                    className={[
                      "text-[9px] uppercase tracking-[0.24em]",
                      s.pillText,
                    ].join(" ")}
                  >
                    {s.label}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-[14px] font-medium leading-snug text-brand-ivory sm:text-[15px]">
                  {o.title}
                </h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-brand-ivory/65 sm:text-[13px]">
                  {o.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <p className="text-[12px] italic leading-relaxed text-brand-ivory/65 sm:text-[13px]">
          {p.closing}
        </p>
      </div>
    </PanelShell>
  );
}
