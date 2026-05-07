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

/**
 * Animates `value` toward `target` with a cubic-ease-out, then maintains a
 * subtle continuous drift so the counter never appears frozen during the
 * presentation. The drift is a low-amplitude sine around the resting target
 * (~±1.2% of target, ~6.5s period) — premium, breathing, not flashy.
 */
function useLiveCounter(target: number, opts?: { driftAmplitude?: number; driftPeriodMs?: number }) {
  const driftAmp = opts?.driftAmplitude ?? 0.012;
  const driftPeriod = opts?.driftPeriodMs ?? 6500;

  const [value, setValue] = useState(target);
  const targetRef = useRef(target);
  const baseRef = useRef(target);
  const phaseRef = useRef(Math.random() * Math.PI * 2);
  const transitionStartRef = useRef<number | null>(null);
  const transitionFromRef = useRef(target);

  useEffect(() => {
    // When the resting target changes (e.g. user navigates to a new panel),
    // ease the displayed value from the current value to the new target,
    // then resume the drift around the new target.
    transitionFromRef.current = value;
    targetRef.current = target;
    baseRef.current = target;
    transitionStartRef.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  useEffect(() => {
    let raf = 0;
    const TRANSITION_MS = 700;

    const tick = (t: number) => {
      // Ease-out cubic transition to a new target if one is pending.
      if (transitionStartRef.current === null) transitionStartRef.current = t;
      const transitionElapsed = t - transitionStartRef.current;
      const transitionProgress = Math.min(1, transitionElapsed / TRANSITION_MS);
      const eased = 1 - Math.pow(1 - transitionProgress, 3);
      const transitioned =
        transitionFromRef.current +
        (targetRef.current - transitionFromRef.current) * eased;

      // Once transition completes, drift gently around the resting target.
      // While transitioning, drift is suppressed for cleanliness.
      const driftActive = transitionProgress >= 1 && targetRef.current > 0;
      const drift = driftActive
        ? targetRef.current *
          driftAmp *
          Math.sin((t / driftPeriod) * Math.PI * 2 + phaseRef.current)
        : 0;

      setValue(transitioned + drift);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [driftAmp, driftPeriod]);

  return value;
}

export function ExecutiveCounter({ min, max, expanded, revealed }: Props) {
  // Slightly different drift phases so the two figures don't tick in lockstep.
  const aMin = useLiveCounter(min, { driftAmplitude: 0.012, driftPeriodMs: 6500 });
  const aMax = useLiveCounter(max, { driftAmplitude: 0.012, driftPeriodMs: 7300 });

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
        <motion.span
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
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
                "font-display font-semibold tabular-nums text-brand-ivory",
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
