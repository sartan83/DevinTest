"use client";

import { useEffect, useState } from "react";
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
 * Devin-native product moment + executive framing. The screen is built
 * around a single command-style line — as if the presenter is typing
 * a message to Devin in Slack / Teams / an engineering workflow —
 * rendered inside a subtle command bar with an @Devin mention chip,
 * a typed-reveal animation, and a blinking caret. Beneath the command
 * bar, a quiet positioning line and the Intesa quantified-clocks
 * framing anchor the Devin moment to the business context.
 *
 * Layout (top → bottom):
 *   1. Partner pair wordmarks (Intesa Sanpaolo · Cognition) +
 *      connector line. Identical entry animation to the prior screen.
 *   2. Command bar — @Devin mention chip + typed prompt + blinking
 *      caret. Subtle terminal/chat-input chrome; monospace prompt
 *      glyph on the far left.
 *   3. Supporting positioning line.
 *   4. Intesa quantified-clocks hero — business framing, kept verbatim.
 *   5. Footer — partner caption + Begin-session link.
 */
export function Panel0Welcome({ onBegin }: Props) {
  const p = intesa.panel0;
  return (
    <PanelShell bg="deep" className="items-center justify-center text-center">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-8 sm:gap-10 lg:gap-12">
        {/* Logos + connector — center stage. */}
        <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-10">
          <Wordmark text={p.leftWordmark} delay={0.12} align="left" />
          <Connector />
          <Wordmark text={p.rightWordmark} delay={0.32} align="right" />
        </div>

        {/* Command bar + supporting line + Intesa hero. */}
        <div className="flex w-full flex-col items-center gap-5 sm:gap-6 lg:gap-7">
          <DevinCommand mention={p.command.mention} body={p.command.body} hint={p.command.placeholderHint} />

          {p.supportingLine ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 4.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-center text-[12.5px] uppercase tracking-[0.24em] text-brand-ivory/70 sm:text-[13.5px]"
            >
              {p.supportingLine}
            </motion.p>
          ) : null}

          {/* Presenter signature — replaces the previous strapline
              per user direction. Reads as a quiet executive
              signature (name + role), not a slide headline. The
              short orange hairline above the name anchors it as
              a deliberate signature mark, not a caption. */}
          {p.presenter ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 4.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <span
                aria-hidden
                className="block h-px w-10 bg-brand-orange/60"
              />
              <span className="font-display text-[15px] font-medium tracking-tight text-brand-ivory sm:text-[16.5px] lg:text-[18px]">
                {p.presenter.name}
              </span>
              <span className="text-[11.5px] uppercase tracking-[0.28em] text-brand-ivory/70 sm:text-[12px]">
                {p.presenter.title}
              </span>
            </motion.div>
          ) : null}
        </div>
      </div>

      {/* Footer: begin-session affordance only. The partner caption
          ('Intesa Sanpaolo × Cognition') has been removed from this
          row to avoid overlap with the shell-level scroll/swipe hint
          and because the two wordmarks at the top of the screen
          already establish the partner pair. */}
      {onBegin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85, delay: 4.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-brand-ivory/50 sm:bottom-14 sm:text-[12px]"
        >
          <button
            type="button"
            onClick={() => onBegin(1)}
            className="group inline-flex items-center gap-2 text-brand-ivory/65 transition-colors hover:text-brand-ivory/90"
          >
            <span>{p.cta}</span>
            <span aria-hidden className="text-brand-ivory/50 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </button>
        </motion.div>
      )}
    </PanelShell>
  );
}

/**
 * Devin command bar.
 *
 * Subtle terminal / chat-input chrome wrapping a mention chip + a
 * typed-reveal prompt + a blinking caret. The reveal types one
 * character at a time so the screen feels like an active command
 * being composed — but the typing stops after the body string is
 * fully revealed (no looping, no gimmick).
 */
function DevinCommand({
  mention,
  body,
  hint,
}: {
  mention: string;
  body: string;
  hint: string;
}) {
  const [typed, setTyped] = useState(0);
  const [revealed, setRevealed] = useState(false);

  // Start typing slightly after the mention chip lands. ~22ms per
  // character lands a ~70-character body in ~1.5s — fast enough to
  // feel like active typing, slow enough to read.
  useEffect(() => {
    const start = window.setTimeout(() => setRevealed(true), 1500);
    return () => window.clearTimeout(start);
  }, []);

  useEffect(() => {
    if (!revealed) return;
    if (typed >= body.length) return;
    const id = window.setTimeout(() => setTyped((n) => n + 1), 22);
    return () => window.clearTimeout(id);
  }, [revealed, typed, body.length]);

  const isComposing = revealed && typed < body.length;
  const shown = body.slice(0, typed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-brand-ivory/18 bg-brand-ivory/[0.035] px-4 py-4 text-left shadow-[0_18px_60px_-30px_rgba(0,0,0,0.7)] sm:px-5 sm:py-5 lg:px-6 lg:py-6"
      aria-label={hint}
    >
      {/* Quiet top accent line — anchors the command bar to the
          section's accent without overwhelming the chrome. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/55 to-transparent"
      />

      <div className="flex items-start gap-3 sm:gap-4">
        {/* Prompt glyph — monospace caret on the far left, reads as
            a chat-input affordance, not a shell prompt. */}
        <span
          aria-hidden
          className="mt-1 select-none font-mono text-[13px] leading-none text-brand-ivory/50 sm:text-[14px]"
        >
          ›
        </span>

        <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-1 gap-y-1">
          {/* @Devin mention chip. Inline mention-link style: subtle
              orange-tinted background, rounded chip, slightly heavier
              weight than the body text. */}
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1 rounded-md border border-brand-orange/35 bg-brand-orange/15 px-2 py-[2px] font-mono text-[13.5px] font-medium leading-none text-brand-orange-soft sm:text-[15px] lg:text-[16px]"
          >
            {mention}
          </motion.span>

          {/* Typed body. Monospace so the command reads as keyboard
              input. Blinking caret rendered as a thin ivory bar that
              sits at the end of the typed string while composing,
              and at the end of the full string once revealed. */}
          <span className="break-words font-mono text-[13.5px] leading-relaxed text-brand-ivory/90 sm:text-[15px] lg:text-[16px]">
            {shown}
            <span
              aria-hidden
              className={[
                "ml-[1px] inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-brand-ivory/85 align-middle",
                isComposing ? "opacity-90" : "animate-caret-blink",
              ].join(" ")}
            />
          </span>
        </div>
      </div>

      {/* Bottom-right hint row — small caption clarifying that this is
          a mention-style assignment, not a generic chat. Quiet enough
          to disappear after a glance. */}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-brand-ivory/14 pt-2 text-[11px] uppercase tracking-[0.24em] text-brand-ivory/50 sm:mt-3.5 sm:pt-2.5 sm:text-[11.5px]">
        <span>{hint}</span>
        <span aria-hidden className="font-mono normal-case tracking-normal text-brand-ivory/45">
          ⏎
        </span>
      </div>
    </motion.div>
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
      <span className="text-[11px] uppercase tracking-[0.28em] text-brand-ivory/55 sm:text-[11.5px]">
        {align === "left" ? "Client" : "Partner"}
      </span>
      <span className="font-display text-xl font-light leading-tight tracking-displaytight text-brand-ivory/95 sm:text-2xl lg:text-[1.85rem]">
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
