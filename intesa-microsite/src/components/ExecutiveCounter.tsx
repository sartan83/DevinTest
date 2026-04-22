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
        expanded ? "px-6 py-5" : "px-4 py-3",
      ].join(" ")}
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span
          className={[
            "inline-block h-1.5 w-1.5 rounded-full bg-brand-orange",
            expanded ? "animate-pulse" : "",
          ].join(" ")}
        />
        <div className="flex flex-col">
          <span
            className={[
              "uppercase tracking-[0.28em] text-brand-ivory/55",
              expanded ? "text-[11px]" : "text-[10px]",
            ].join(" ")}
          >
            {intesa.counter.label}
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <motion.span
              layout
              className={[
                "font-display font-semibold text-brand-ivory",
                expanded ? "text-3xl" : "text-lg",
              ].join(" ")}
            >
              ≈ {format(aMin)}–{format(aMax)}
            </motion.span>
            <span
              className={[
                "text-brand-ivory/65",
                expanded ? "text-sm" : "text-[11px]",
              ].join(" ")}
            >
              {intesa.counter.unit}
            </span>
          </div>
          <span
            className={[
              "mt-1 text-brand-ivory/40",
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
