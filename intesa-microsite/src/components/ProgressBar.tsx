"use client";

import { motion } from "framer-motion";
import { intesa } from "../data/intesa";

type Props = {
  active: number;
  onSelect: (idx: number) => void;
};

export function ProgressBar({ active, onSelect }: Props) {
  return (
    <div className="pointer-events-auto flex items-center gap-4">
      <span className="text-[11px] uppercase tracking-[0.28em] text-brand-ivory/50">
        {intesa.nav[active]?.label ?? "—"} · {intesa.nav[active]?.full ?? ""}
      </span>
      <div className="flex items-center gap-2">
        {intesa.nav.map((step) => {
          const isActive = step.index === active;
          const isPassed = step.index < active;
          const isHalf = step.label.includes(".");
          return (
            <button
              key={step.index}
              onClick={() => onSelect(step.index)}
              className="group relative flex h-6 items-center"
              aria-label={`Go to panel ${step.label} — ${step.full}`}
            >
              <motion.span
                layout
                className={[
                  "block rounded-full transition-all",
                  isHalf ? "h-1 w-1" : "h-1",
                  isActive
                    ? isHalf
                      ? "w-2 bg-brand-orange"
                      : "w-10 bg-brand-orange"
                    : isPassed
                      ? isHalf
                        ? "w-1 bg-brand-ivory/60"
                        : "w-6 bg-brand-ivory/60"
                      : isHalf
                        ? "w-1 bg-brand-ivory/25"
                        : "w-6 bg-brand-ivory/20",
                ].join(" ")}
              />
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-brand-green-deep/90 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-brand-ivory/80 opacity-0 shadow-elev hairline transition-opacity group-hover:opacity-100">
                {step.label} · {step.full}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
