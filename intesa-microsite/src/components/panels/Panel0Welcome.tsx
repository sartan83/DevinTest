"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell } from "../PanelShell";

type Props = {
  /** Navigate to a target panel by 0-based idx. */
  onBegin?: (idx: number) => void;
};

/**
 * Panel 0 — Executive Working Session opening screen.
 *
 * Restrained pre-session "stage presence" panel. Sits before the hero so
 * the screen can stay up while the presenter greets the panel and begins
 * the conversation. Designed to feel like a premium banking workshop
 * opener — not a startup intro, not a product launch, not a sci-fi AI
 * demo.
 *
 * Layout:
 *   - Center: two typographic wordmarks ("Intesa Sanpaolo" left,
 *     "Cognition" right) with a thin connector line between them.
 *   - Below center: "Executive Working Session" title + subtitle.
 *   - Footer: "Intesa Sanpaolo × Cognition".
 *   - Begin-session link (subtle, not a dominant CTA).
 *
 * Animation budget: 3–5 seconds total. Logos fade in, connector line
 * draws left-to-right via SVG pathLength, then a very subtle pulse loop
 * remains. After the entry sequence, the screen is intentionally calm.
 */
export function Panel0Welcome({ onBegin }: Props) {
  const p = intesa.panel0;
  return (
    <PanelShell bg="deep" className="items-center justify-center text-center">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-12 sm:gap-16">
        {/* Logos + connector — center stage. */}
        <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-10">
          <Wordmark text={p.leftWordmark} delay={0.15} align="left" />
          <Connector />
          <Wordmark text={p.rightWordmark} delay={0.4} align="right" />
        </div>

        {/* Title + subtitle. */}
        <div className="flex flex-col items-center gap-2.5 text-center sm:gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-3xl font-light leading-[1.05] tracking-displaytight text-brand-ivory sm:text-4xl lg:text-5xl"
          >
            {p.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] uppercase tracking-[0.36em] text-brand-ivory/55 sm:text-[11px]"
          >
            {p.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Footer: partner caption + begin-session affordance. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-brand-ivory/40 sm:bottom-14 sm:text-[11px]"
      >
        <span>{p.footer}</span>
        {onBegin && (
          <button
            type="button"
            onClick={() => onBegin(1)}
            className="group inline-flex items-center gap-2 text-brand-ivory/55 transition-colors hover:text-brand-ivory/85"
          >
            <span>{p.cta}</span>
            <span aria-hidden className="text-brand-ivory/40 transition-transform group-hover:translate-x-0.5">
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
      transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "flex flex-col gap-1.5",
        align === "left" ? "items-center sm:items-start" : "items-center sm:items-end",
      ].join(" ")}
    >
      <span className="text-[9px] uppercase tracking-[0.36em] text-brand-ivory/45 sm:text-[10px]">
        {align === "left" ? "Client" : "Partner"}
      </span>
      <span className="font-display text-2xl font-light leading-tight tracking-displaytight text-brand-ivory sm:text-3xl lg:text-[2.25rem]">
        {text}
      </span>
    </motion.div>
  );
}

/**
 * Thin connector line between the two wordmarks. Draws left-to-right
 * (~3.5s total entry). After the entry, a very subtle opacity pulse
 * remains — calm, not distracting. Hidden on small screens (logos stack
 * vertically there).
 */
function Connector() {
  return (
    <div className="hidden flex-1 items-center px-6 sm:flex">
      <svg
        aria-hidden
        viewBox="0 0 200 2"
        preserveAspectRatio="none"
        className="h-[2px] w-full text-brand-ivory/35"
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
          transition={{ duration: 2.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <motion.span
        aria-hidden
        animate={{ opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="pointer-events-none absolute h-[2px] w-1 rounded-full bg-brand-orange/40"
        style={{ marginLeft: "calc(50% - 2px)" }}
      />
    </div>
  );
}
