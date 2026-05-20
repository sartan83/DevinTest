"use client";

import { motion } from "framer-motion";
import { intesa } from "../data/intesa";

type Props = {
  active: number;
  onSelect: (idx: number) => void;
  isMobile?: boolean;
};

export function ProgressBar({ active, onSelect, isMobile = false }: Props) {
  return (
    <div className="pointer-events-auto flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
      <span className="hidden min-w-0 truncate text-[10.5px] uppercase tracking-[0.28em] text-brand-ivory/65 sm:inline sm:text-[11px] md:inline">
        {intesa.nav[active]?.label ?? "—"} · {intesa.nav[active]?.full ?? ""}
      </span>
      <span className="inline text-[10.5px] uppercase tracking-[0.22em] text-brand-ivory/75 sm:hidden">
        {intesa.nav[active]?.label ?? "—"}
      </span>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {intesa.nav.filter((step) => !step.appendix).map((step) => {
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
                      : "w-8 bg-brand-orange sm:w-10"
                    : isPassed
                      ? isHalf
                        ? "w-1 bg-brand-ivory/60"
                        : "w-5 bg-brand-ivory/60 sm:w-6"
                      : isHalf
                        ? "w-1 bg-brand-ivory/25"
                        : "w-5 bg-brand-ivory/20 sm:w-6",
                ].join(" ")}
              />
              {!isMobile && (
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-brand-green-deep/90 px-2 py-1 text-[10.5px] uppercase tracking-[0.2em] text-brand-ivory/92 opacity-0 shadow-elev hairline transition-opacity group-hover:opacity-100">
                  {step.label} · {step.full}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
