"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell } from "../PanelShell";

type Props = {
  /** Navigate to a target panel by 0-based idx. */
  onBegin?: (idx: number) => void;
};

/**
 * Panel 0 — Executive opening / stage-presence screen.
 *
 * Restrained pre-session panel. Sits before the hero so the screen can
 * stay up while the presenter greets the panel and begins the
 * conversation. Designed to feel like a premium banking workshop opener
 * — not a startup intro, not a product launch, not a sci-fi AI demo.
 *
 * Layout:
 *   - Center: two typographic wordmarks ("Intesa Sanpaolo" left,
 *     "Cognition" right) with a thin connector line between them.
 *   - Below center: title + subtitle.
 *   - Footer: "Intesa Sanpaolo × Cognition" + subtle Begin-session link.
 *
 * Animation budget: ~2.7s total entry. Logos fade in, connector line
 * draws left-to-right via SVG pathLength, then a soft "signal flow"
 * highlight occasionally traverses the line (collaboration metaphor —
 * not a loading indicator). After the entry sequence, the screen is
 * intentionally calm.
 */
export function Panel0Welcome({ onBegin }: Props) {
  const p = intesa.panel0;
  return (
    <PanelShell bg="deep" className="items-center justify-center text-center">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-10 sm:gap-14">
        {/* Logos + connector — center stage. */}
        <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-10">
          <Wordmark text={p.leftWordmark} delay={0.12} align="left" />
          <Connector />
          <Wordmark text={p.rightWordmark} delay={0.32} align="right" />
        </div>

        {/* Title + subtitle. Reduced visual weight relative to logos so
            the partner pair stays the primary visual focus. */}
        <div className="flex flex-col items-center gap-2.5 text-center sm:gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-2xl font-light leading-[1.1] tracking-displaytight text-brand-ivory/95 sm:text-3xl lg:text-[2.25rem]"
          >
            {p.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] uppercase tracking-[0.36em] text-brand-ivory/50 sm:text-[11px]"
          >
            {p.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Footer: partner caption + begin-session affordance. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-brand-ivory/35 sm:bottom-14 sm:text-[11px]"
      >
        <span>{p.footer}</span>
        {onBegin && (
          <button
            type="button"
            onClick={() => onBegin(1)}
            className="group inline-flex items-center gap-2 text-brand-ivory/50 transition-colors hover:text-brand-ivory/85"
          >
            <span>{p.cta}</span>
            <span aria-hidden className="text-brand-ivory/35 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </button>
        )}
      </motion.div>
    </PanelShell>
  );
}

/** Typographic wordmark for the partner pair. Slow fade-in, no flash. */
function Wordmark({ text, delay, align }: { text: string; delay: number; align: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "flex flex-col gap-1.5",
        align === "left" ? "items-center sm:items-start" : "items-center sm:items-end",
      ].join(" ")}
    >
      <span className="text-[9px] uppercase tracking-[0.36em] text-brand-ivory/40 sm:text-[10px]">
        {align === "left" ? "Client" : "Partner"}
      </span>
      <span className="font-display text-2xl font-light leading-tight tracking-displaytight text-brand-ivory/95 sm:text-3xl lg:text-[2.25rem]">
        {text}
      </span>
    </motion.div>
  );
}

/**
 * Thin connector line between the two wordmarks.
 *
 * Entry: line draws left-to-right via SVG pathLength (~1.8s, delay 0.45s).
 * Steady-state: a soft, blurred, low-opacity "signal flow" highlight
 * traverses the line every ~4.5s. The traversal alternates direction —
 * predominantly Intesa → Cognition with an occasional reverse pass —
 * to suggest collaboration / strategic alignment, NOT a loading bar.
 *
 * The highlight is rendered as a CSS-masked gradient strip layered above
 * the line and animated via translateX, then blurred. No visible dots,
 * particles, or beams. Hidden on small screens (logos stack vertically
 * there).
 */
function Connector() {
  return (
    <div className="relative hidden flex-1 items-center overflow-hidden px-6 sm:flex">
      <svg
        aria-hidden
        viewBox="0 0 200 2"
        preserveAspectRatio="none"
        className="h-[2px] w-full text-brand-ivory/30"
      >
        <motion.line
          x1="0"
          y1="1"
          x2="200"
          y2="1"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      {/* Signal-flow highlight — Intesa → Cognition. */}
      <motion.span
        aria-hidden
        initial={{ x: "-30%", opacity: 0 }}
        animate={{
          x: ["-30%", "130%"],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 2.6,
          delay: 3.2,
          repeat: Infinity,
          repeatDelay: 5.4,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
        className="pointer-events-none absolute left-6 right-6 top-1/2 h-[2px] -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(245,243,236,0.0) 30%, rgba(245,243,236,0.45) 50%, rgba(245,243,236,0.0) 70%, transparent 100%)",
          width: "30%",
          filter: "blur(1.5px)",
        }}
      />

      {/* Occasional reverse signal — Cognition → Intesa. Softer, slightly
          longer, offset so the two flows do not overlap. */}
      <motion.span
        aria-hidden
        initial={{ x: "130%", opacity: 0 }}
        animate={{
          x: ["130%", "-30%"],
          opacity: [0, 0.28, 0],
        }}
        transition={{
          duration: 3.2,
          delay: 8.5,
          repeat: Infinity,
          repeatDelay: 12,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
        className="pointer-events-none absolute left-6 right-6 top-1/2 h-[2px] -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(245,243,236,0.0) 30%, rgba(245,243,236,0.32) 50%, rgba(245,243,236,0.0) 70%, transparent 100%)",
          width: "30%",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}
