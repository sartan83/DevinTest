"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { intesa } from "../data/intesa";

type Props = {
  min: number;
  max: number;
  expanded?: boolean;
};

function format(n: number) {
  return (Math.round(n * 10) / 10).toLocaleString("en-GB", {
    minimumFractionDigits: n % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  });
}

function useAnimatedNumber(target: number, duration = 700) {
  const [value, setValue] = useState(target);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(target);

  useEffect(() => {
    fromRef.current = value;
    startRef.current = null;
    let raf = 0;
    const step = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const progress = Math.min(1, (t - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(fromRef.current + (target - fromRef.current) * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return value;
}

export function ExecutiveCounter({ min, max, expanded }: Props) {
  const aMin = useAnimatedNumber(min);
  const aMax = useAnimatedNumber(max);

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className={[
        "pointer-events-auto relative rounded-xl border border-brand-ivory/10 bg-brand-green-deep/70 backdrop-blur-md",
        "shadow-elev",
        expanded ? "px-4 py-3 sm:px-6 sm:py-5" : "px-3 py-2 sm:px-4 sm:py-3",
      ].join(" ")}
      aria-live="polite"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <span
          className={[
            "inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange",
            expanded ? "animate-pulse" : "",
          ].join(" ")}
        />
        <div className="flex flex-col">
          <span
            className={[
              "uppercase tracking-[0.22em] text-brand-ivory/55 sm:tracking-[0.28em]",
              expanded ? "text-[10px] sm:text-[11px]" : "text-[9px] sm:text-[10px]",
            ].join(" ")}
          >
            <span className="hidden sm:inline">{intesa.counter.label}</span>
            <span className="sm:hidden">{intesa.counter.shortLabel}</span>
          </span>
          <div className="mt-1 flex items-baseline gap-1.5 sm:gap-2">
            <motion.span
              layout
              className={[
                "font-display font-semibold text-brand-ivory",
                expanded ? "text-2xl sm:text-3xl" : "text-sm sm:text-lg",
              ].join(" ")}
            >
              ≈ {format(aMin)}–{format(aMax)}
            </motion.span>
            <span
              className={[
                "text-brand-ivory/65",
                expanded ? "text-[11px] sm:text-sm" : "text-[10px] sm:text-[11px]",
              ].join(" ")}
            >
              {intesa.counter.unit}
            </span>
          </div>
          <span
            className={[
              "mt-1 hidden text-brand-ivory/40 sm:inline",
              expanded ? "text-[11px]" : "text-[10px]",
            ].join(" ")}
          >
            {intesa.counter.disclaimer}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
