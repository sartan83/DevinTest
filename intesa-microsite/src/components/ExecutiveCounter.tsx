"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { intesa } from "../data/intesa";

type Props = {
  min: number;
  max: number;
  /** True on the climax panel → show centered, largest form with full label. */
  expanded?: boolean;
  /**
   * True once the user has reached the reveal panel (Panel 7+) → show label and
   * unit. While false, the pill stays as a mysterious "?" teaser in the corner.
   */
  revealed?: boolean;
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

export function ExecutiveCounter({ min, max, expanded, revealed }: Props) {
  const aMin = useAnimatedNumber(min);
  const aMax = useAnimatedNumber(max);

  // Teaser mode: small pill with "?" + numeric hint, no label / unit / disclaimer.
  if (!revealed && !expanded) {
    return (
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className="pointer-events-auto relative flex items-center gap-2.5 rounded-full border border-brand-ivory/15 bg-brand-green-deep/70 px-4 py-2 shadow-elev backdrop-blur-md sm:gap-3 sm:px-5 sm:py-2.5"
        aria-label="Session counter — revealed later"
      >
        <motion.span
          aria-hidden
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-brand-orange/50 text-sm font-semibold text-brand-orange-soft sm:h-7 sm:w-7 sm:text-base"
        >
          ?
        </motion.span>
        <span className="font-display text-base font-semibold tabular-nums text-brand-ivory sm:text-lg">
          ≈ {format(aMin)}–{format(aMax)}
        </span>
      </motion.div>
    );
  }

  // Revealed (compact on most panels from 7 onward, expanded on climax itself).
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
          <AnimatePresence>
            {expanded && (
              <motion.span
                key="disclaimer"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-1 hidden text-[11px] text-brand-ivory/40 sm:inline"
              >
                {intesa.counter.disclaimer}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
