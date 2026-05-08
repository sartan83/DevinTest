"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { intesa } from "../data/intesa";

type Props = {
  min: number;
  max: number;
};

function format(n: number) {
  return (Math.round(n * 10) / 10).toLocaleString("en-GB", {
    minimumFractionDigits: n % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  });
}

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
 * Counter pill — always revealed since the minimalism pass removed the
 * standalone climax page. A subtle "?" trigger surfaces a contextual
 * popover (Illustrative modernization signal · Migration pressure ·
 * Execution complexity · Governance constraints) on hover/click.
 */
export function ExecutiveCounter({ min, max }: Props) {
  const aMin = useEasedNumber(min);
  const aMax = useEasedNumber(max);
  const [open, setOpen] = useState(false);
  const popover = intesa.counter.popover;

  // Close the popover when the user clicks outside of it.
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
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <motion.span
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
        />
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[10px] sm:tracking-[0.28em]">
            <span className="hidden sm:inline">{intesa.counter.label}</span>
            <span className="sm:hidden">{intesa.counter.shortLabel}</span>
          </span>
          <div className="mt-1 flex items-baseline gap-1.5 sm:gap-2">
            <motion.span
              layout
              className="font-display text-sm font-semibold tabular-nums text-brand-ivory sm:text-lg"
            >
              ≈ {format(aMin)}–{format(aMax)}
            </motion.span>
            <span className="text-[10px] text-brand-ivory/65 sm:text-[11px]">
              {intesa.counter.unit}
            </span>
          </div>
        </div>

        {/* Subtle "?" trigger — low contrast, opens contextual popover. */}
        <button
          type="button"
          aria-label="What does this counter represent?"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-ivory/15 text-[10px] font-medium text-brand-ivory/40 transition-colors hover:border-brand-ivory/35 hover:text-brand-ivory/75 focus:outline-none focus-visible:border-brand-ivory/45 focus-visible:text-brand-ivory/85 sm:h-6 sm:w-6 sm:text-[11px]"
        >
          ?
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="counter-popover"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label={popover.title}
            className="absolute right-0 top-full z-40 mt-2 w-[15rem] overflow-hidden rounded-xl border border-brand-ivory/12 bg-brand-green-deep/95 p-4 shadow-elev backdrop-blur-md sm:w-[17rem]"
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
            <p className="mt-3 text-[10px] leading-snug text-brand-ivory/45">
              {intesa.counter.disclaimer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
