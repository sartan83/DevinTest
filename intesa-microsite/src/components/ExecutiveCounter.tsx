"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { intesa } from "../data/intesa";

type Props = {
  min: number;
  max: number;
};

function format(n: number) {
  // Single-value display per user direction. Render as an integer
  // when very close to a whole number, otherwise show one decimal.
  const rounded = Math.round(n * 10) / 10;
  const isIntegerish = Math.abs(rounded - Math.round(rounded)) < 0.05;
  return rounded.toLocaleString("en-GB", {
    minimumFractionDigits: isIntegerish ? 0 : 1,
    maximumFractionDigits: 1,
  });
}

// formatEquivalent + minEq/maxEq retired alongside the
// secondary developer-equivalents line in the collapsed counter
// pill. The translation is still surfaced inside the expanded
// popover (popover.bullets) rather than the pill itself.

/**
 * Eases `value` toward `target` with a cubic-ease-out (~700ms) on every change
 * and then holds steady at the resting target. We do NOT continuously drift —
 * a wobbling number in the header is distracting during a live presentation.
 */
function useEasedNumber(target: number) {
  const [value, setValue] = useState(target);
  const targetRef = useRef(target);
  const transitionStartRef = useRef<number | null>(null);
  const transitionFromRef = useRef(target);

  useEffect(() => {
    transitionFromRef.current = value;
    targetRef.current = target;
    transitionStartRef.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  useEffect(() => {
    let raf = 0;
    const TRANSITION_MS = 700;

    const tick = (t: number) => {
      if (transitionStartRef.current === null) transitionStartRef.current = t;
      const elapsed = t - transitionStartRef.current;
      const progress = Math.min(1, elapsed / TRANSITION_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next =
        transitionFromRef.current +
        (targetRef.current - transitionFromRef.current) * eased;
      setValue(next);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return value;
}

/**
 * Counter pill — collapsed-by-default after the EB-pivot pass. The default
 * state shows numbers only (dev-days + dev-equivalents). Clicking the pill or
 * the "?" trigger expands into an explanation panel: counts capacity
 * redeployed during the session, 1 dev-equivalent = 220 dev-days/year,
 * illustrative model, based on representative modernization assumptions.
 */
export function ExecutiveCounter({ min, max }: Props) {
  // Single-value display per user direction. The accumulation
  // mechanic per visited panel is preserved, but the pill now
  // renders the midpoint of the min/max envelope as a single
  // dev-days number rather than a range. Reads cleaner for an
  // Economic Buyer audience that can otherwise read the wide
  // range as "imprecise modelling".
  const mid = (min + max) / 2;
  const aValue = useEasedNumber(mid);
  const [open, setOpen] = useState(false);
  const c = intesa.counter;
  const popover = c.popover;

  // Close the expansion when the user clicks outside of it.
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <motion.div
      ref={wrapperRef}
      layout
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className="pointer-events-auto relative rounded-xl border border-brand-ivory/10 bg-brand-green-deep/70 px-3 py-2 shadow-elev backdrop-blur-md sm:px-4 sm:py-3"
      aria-live="polite"
    >
      {/* Collapsed-by-default body. Clicking the body (not just the "?")
         toggles the expanded explanation panel below. */}
      <button
        type="button"
        aria-label="Toggle capacity redeployment details"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 text-left focus:outline-none sm:gap-3"
      >
        <motion.span
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
        />
        <div className="flex min-w-0 flex-col">
          <span className="text-[9px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[10px] sm:tracking-[0.28em]">
            {c.label}
          </span>
          <div className="mt-1 flex items-baseline gap-1.5 sm:gap-2">
            <motion.span
              layout
              className="font-display text-sm font-semibold tabular-nums text-brand-ivory sm:text-lg"
            >
              ≈ {format(aValue)}
            </motion.span>
            <span className="text-[10px] text-brand-ivory/65 sm:text-[11px]">
              {c.unit}
            </span>
          </div>
          {/* Developer-equivalents secondary line retired per user
              direction. The counter pill now reads as a pure
              dev-days number; the dev-equivalents translation is
              still available in the expanded popover below. */}
        </div>

        {/* Subtle "?" trigger — low contrast, retained for affordance. */}
        <span
          aria-hidden
          className="ml-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-ivory/15 text-[10px] font-medium text-brand-ivory/40 transition-colors hover:border-brand-ivory/35 hover:text-brand-ivory/75 sm:h-6 sm:w-6 sm:text-[11px]"
        >
          ?
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="counter-expanded"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label={popover.title}
            className="absolute right-0 top-full z-40 mt-2 w-[16rem] overflow-hidden rounded-xl border border-brand-ivory/12 bg-brand-green-deep/95 p-4 shadow-elev backdrop-blur-md sm:w-[18rem]"
          >
            <div className="text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft">
              {popover.title}
            </div>
            <ul className="mt-2.5 space-y-1.5">
              {popover.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-[12px] leading-snug text-brand-ivory/85 sm:text-[13px]"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange/70"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 border-t border-brand-ivory/10 pt-2.5">
              <ul className="space-y-1.5">
                {c.expandedBullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-[11px] leading-snug text-brand-ivory/75 sm:text-[12px]"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-ivory/45"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-3 text-[10px] leading-snug text-brand-ivory/45">
              {c.disclaimer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
