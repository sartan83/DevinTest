"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 5 — Mainframe Modernization Demo.
 *
 * Strategic-narrative + execution-stream layout. Two reading regions:
 *
 *   LEFT   Strategic narrative
 *          - dominant hero: "The remaining 36% requires a different
 *            execution model."
 *          - sharp, executive supporting line
 *          - italic closing + tiny repo link
 *
 *   RIGHT  Vertical execution stream
 *          - the 6× acceleration anchor sits at the TOP of the lane
 *            so the rail visually emerges from it (the stream is
 *            framed as a manifestation of the acceleration)
 *          - six bounded steps: Repo scan → Migration plan →
 *            Code transformation → Test generation → Governed PR →
 *            Human approval
 *          - rail intensifies subtly top → bottom (momentum)
 *          - last step ("Human approval") is enforced visually as
 *            governance, with stronger framing and a lock chip
 *
 * Visual rules:
 *   - No horizontal workflow diagram. No arrows. No BPMN aesthetic.
 *   - Subtle vertical flow energy — continuous, lightweight.
 */
export function Panel5BusinessImpact() {
  const p = intesa.panel5;
  const totalSteps = p.workflow.steps.length;

  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="cinematic" eyebrowSize="lg">
      <div className="flex flex-col gap-5 sm:gap-6">
      <div className="grid gap-6 sm:gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
        {/* LEFT — Strategic narrative
            ─────────────────────────────────────────────────────────
            Strong whitespace, dominant typography, premium quietness.
            The 6× chip lives on the right column now (anchored at the
            top of the execution lane) so this side stays pure narrative. */}
        <div className="flex flex-col gap-5 sm:gap-6">
          <PanelHeadline text={p.headline} className="max-w-2xl" compact />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-[13.5px] leading-relaxed text-brand-ivory/80 sm:text-[14.5px] lg:text-[15.5px]"
          >
            {p.support}
          </motion.p>

          {/* SDLC focus chip — subtle anchor that names the specific
              SDLC execution zones this demo targets (43% coding +
              27% testing/release). Reads as a contextual tag, not
              as a competing KPI tile. */}
          {p.sdlcFocus && (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-brand-orange-soft sm:text-[11.5px]"
            >
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-brand-orange-soft" />
              {p.sdlcFocus}
            </motion.span>
          )}

          {/* Talk-track support line — frames the demo as a controlled
              SDLC compression example, not a feature tour. Italic,
              low-noise. */}
          {p.talkTrack && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl text-[12.5px] italic leading-relaxed text-brand-ivory/70 sm:text-[13.5px]"
            >
              {p.talkTrack}
            </motion.p>
          )}

          {/* Closing executive line — promoted per user
              direction to the same size as the supporting line
              above (and the repo / disclaimer row below). */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="text-[13px] italic leading-relaxed text-brand-ivory/70 sm:text-[14px] lg:text-[15px]"
          >
            {p.closingStatement}
          </motion.p>

          {/* Repo link + disclaimer row — promoted to the same
              text size as the support line above per user
              direction. The repo URL stays monospace and
              underlined; the disclaimer reads as a quiet caption
              at the same size for consistency. */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[13px] leading-snug text-brand-ivory/75 sm:text-[14px] lg:text-[15px]">
            <a
              href={p.repoLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand-ivory/70 underline decoration-brand-ivory/30 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60"
            >
              <span aria-hidden>↗</span>
              <span className="font-mono">{p.repoLink.label}</span>
            </a>
            <span className="text-brand-ivory/40">·</span>
            <span>{p.repoDisclaimer}</span>
          </div>
        </div>

        {/* RIGHT — Vertical execution stream
            ─────────────────────────────────────────────────────────
            Top: 6× acceleration anchor — the lane emerges from it.
            Body: six bounded steps with progressive top→bottom
            momentum and a continuously descending dot per row.
            Bottom: Human approval rendered as the governed gated
            close — stronger frame, lock chip, ivory label. */}
        <div className="relative flex flex-col">
          {/* 6× acceleration anchor — sits at the top of the stream.
              The radial halo extends down into the rail so the
              acceleration visually flows into the steps below. */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-baseline gap-3 pb-4 pl-10 sm:gap-4 sm:pb-5"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-2 -top-2 bottom-0 -z-0"
              style={{
                background:
                  "radial-gradient(ellipse at 28% 35%, rgba(243,111,33,0.22) 0%, transparent 65%)",
              }}
            />
            <span
              className="relative z-10 font-display font-semibold leading-[0.9] tracking-tight text-[44px] sm:text-[56px] lg:text-[64px]"
              style={{ color: "rgba(243,111,33,0.95)" }}
            >
              {p.referenceDeployment.metric}
            </span>
            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-[0.26em] text-brand-ivory/65 sm:text-[11.5px]">
                {p.referenceDeployment.caption}
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-brand-ivory/85 sm:text-[12px]">
                {p.referenceDeployment.label}
              </span>
            </div>

            {/* Vertical bridge — soft orange→ivory fade that connects
                the bottom of the 6× anchor to the top of the rail. */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-[14px] -z-0 h-4 w-px"
              style={{
                background:
                  "linear-gradient(180deg, rgba(243,111,33,0.55) 0%, rgba(247,244,239,0.2) 100%)",
              }}
            />
          </motion.div>

          {/* Execution lane */}
          <motion.ol
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col"
          >
            {/* Continuous vertical guide line behind the stream.
                Intensifies from top to bottom — adds a subtle sense
                of momentum/resolution as the eye travels down. */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-[14px] top-3 bottom-3 w-px"
              style={{
                background:
                  "linear-gradient(180deg, rgba(247,244,239,0.12) 0%, rgba(247,244,239,0.22) 40%, rgba(247,244,239,0.32) 75%, rgba(243,111,33,0.45) 100%)",
              }}
            />

            {p.workflow.steps.map((step, i) => {
              const isLast = i === totalSteps - 1;
              // Momentum ramp 0 → 1 over the steps. Used to brighten
              // dots and accelerate descender pacing in the lower
              // half of the lane.
              const momentum = i / Math.max(totalSteps - 1, 1);
              return (
                <StreamStep
                  key={step.label}
                  label={step.label}
                  tone={step.tone}
                  index={i}
                  isLast={isLast}
                  momentum={momentum}
                />
              );
            })}
          </motion.ol>
        </div>
      </div>

      {/* "What we are validating" — operational lens for the demo.
          Reads as the measurement frame for the walkthrough above
          (lead time, review effort, regression risk, repeatability),
          not as a KPI tile block. Thin uppercase label on the left,
          chip row on the right; sits at the very bottom of the
          panel and closes the demo on a measurement note. */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-2.5 border-t border-brand-ivory/16 pt-4 sm:flex-row sm:items-center sm:gap-5 sm:pt-5"
      >
        <span className="shrink-0 text-[11px] uppercase tracking-[0.24em] text-brand-orange-soft sm:text-[11.5px]">
          {p.validating.label}
        </span>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {p.validating.items.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.45,
                delay: 0.35 + i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-ivory/20 bg-brand-ivory/[0.05] px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-brand-ivory/80 sm:text-[11.5px]"
            >
              <span
                aria-hidden
                className="inline-block h-1 w-1 rounded-full bg-brand-orange/70"
              />
              {item}
            </motion.span>
          ))}
        </div>
      </motion.div>
      </div>
    </PanelShell>
  );
}

function StreamStep({
  label,
  tone,
  index,
  isLast,
  momentum,
}: {
  label: string;
  tone: "default" | "accent" | "governance";
  index: number;
  isLast: boolean;
  /** 0 at the top of the lane, 1 at the bottom. Drives subtle
   * progressive pacing changes for the descender animation only.
   * All rail dots themselves render identically — the governed
   * execution flow communicates that every step matters equally;
   * we never use color to elevate individual steps. */
  momentum: number;
}) {
  // Governance is the only tone that still affects rendering, and
  // only at the card level (frame + lock chip). The rail dot is
  // intentionally identical for every row.
  const isGovernance = tone === "governance";

  // Descender pacing accelerates with momentum: top descenders are
  // slower and softer, lower descenders are quicker and sharper.
  const descenderDuration = 1.9 - 0.7 * momentum;

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: 0.08 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex items-stretch gap-3 sm:gap-4"
    >
      {/* Rail dot column ── 28px wide, holds the dot for this row.
          Every step renders an identical ivory dot. We never tint
          individual steps with orange — the audience should read
          the entire governed execution flow as equally important. */}
      <div className="relative flex w-7 shrink-0 flex-col items-center">
        <span
          aria-hidden
          className="relative z-10 mt-3 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-brand-ivory/75"
        />

        {/* Animated descender — small ivory dot continuously moving
            top → bottom along the rail between this step and the
            next. Hidden on the last step. Pacing accelerates with
            momentum (bottom rows feel faster than top rows). Color
            stays neutral ivory — momentum is communicated through
            motion and pacing, not through color. */}
        {!isLast && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-3 -z-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
            style={{
              backgroundColor: `rgba(247,244,239,${0.5 + 0.3 * momentum})`,
            }}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: [8, 56], opacity: [0, 0.8, 0] }}
            transition={{
              duration: descenderDuration,
              delay: 0.22 * index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>

      {/* Step label — every row uses the same typographic weight
          and color. The governance row only differs through a
          neutral ivory frame + lock chip; it never uses orange to
          elevate itself above the other steps. */}
      <div
        className={[
          "flex flex-1 items-center justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3",
          isGovernance
            ? "mt-2 rounded-xl border border-brand-ivory/15 bg-brand-ivory/[0.04]"
            : "",
          !isLast ? "mb-1.5 sm:mb-2" : "",
        ].join(" ")}
        style={
          isGovernance
            ? {
                boxShadow:
                  "inset 0 1px 0 rgba(247,244,239,0.08), 0 6px 22px -16px rgba(247,244,239,0.18)",
              }
            : undefined
        }
      >
        <span className="font-display text-[14px] font-medium leading-none tracking-tight text-brand-ivory/90 sm:text-[15px] lg:text-[16px]">
          {label}
        </span>

        {isGovernance && (
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-brand-ivory/80 sm:text-[11px]">
            <LockGlyph />
            <span>Required</span>
          </span>
        )}
      </div>
    </motion.li>
  );
}

function LockGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 14"
      width="13"
      height="15"
      fill="none"
      className="text-brand-ivory/75"
    >
      <rect
        x="1.5"
        y="6"
        width="9"
        height="6.5"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M3.5 6V4.5a2.5 2.5 0 0 1 5 0V6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
