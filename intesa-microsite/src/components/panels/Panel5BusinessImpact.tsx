"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 5 — Java Modernization Demo.
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
            className="max-w-xl text-[13px] leading-relaxed text-brand-ivory/65 sm:text-[14px] lg:text-[15px]"
          >
            {p.support}
          </motion.p>

          {/* Closing executive line — small, italic. */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12px] italic leading-relaxed text-brand-ivory/55 sm:text-[13px]"
          >
            {p.closingStatement}
          </motion.p>

          {/* Repo link — tiny, single line. */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[9px] leading-snug text-brand-ivory/40 sm:text-[10px]">
            <a
              href={p.repoLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand-ivory/55 underline decoration-brand-ivory/20 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60"
            >
              <span aria-hidden>↗</span>
              <span className="font-mono">{p.repoLink.label}</span>
            </a>
            <span className="text-brand-ivory/25">·</span>
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
              <span className="text-[9px] uppercase tracking-[0.3em] text-brand-ivory/50 sm:text-[10px]">
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
   * progressive intensity/pacing changes for the rail dot and the
   * descending animated dot. */
  momentum: number;
}) {
  const isAccent = tone === "accent";
  const isGovernance = tone === "governance";

  // Progressive dot opacity for default rows: subtle ramp from
  // ivory/55 at the top to ivory/85 near the bottom.
  const defaultDotOpacity = 0.55 + 0.3 * momentum;

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
      {/* Rail dot column ── 28px wide, holds the dot for this row */}
      <div className="relative flex w-7 shrink-0 flex-col items-center">
        {/* Step dot. Governance gets a thicker ring + outer halo;
            accent rows are solid orange; default rows ramp ivory
            opacity as the lane progresses downward. */}
        <span
          aria-hidden
          className={[
            "relative z-10 mt-3 inline-flex items-center justify-center rounded-full",
            isGovernance
              ? "h-3 w-3 bg-brand-orange ring-[5px] ring-brand-orange/25"
              : isAccent
                ? "h-2.5 w-2.5 bg-brand-orange"
                : "h-2.5 w-2.5",
          ].join(" ")}
          style={
            isGovernance
              ? { boxShadow: "0 0 16px 0 rgba(243,111,33,0.45)" }
              : !isAccent
                ? { backgroundColor: `rgba(247,244,239,${defaultDotOpacity})` }
                : undefined
          }
        />

        {/* Animated descender — small ivory dot continuously moving
            top → bottom along the rail between this step and the
            next. Hidden on the last step. Pacing accelerates with
            momentum (bottom rows feel faster than top rows). */}
        {!isLast && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-3 -z-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
            style={{
              backgroundColor: `rgba(247,244,239,${0.45 + 0.35 * momentum})`,
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

      {/* Step label — premium card row.
          - Default / accent rows: borderless, lightweight type.
          - Governance row: stronger frame, ivory label, lock chip.
            Reads as the trusted gated completion step. */}
      <div
        className={[
          "flex flex-1 items-center justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3",
          isGovernance
            ? "mt-2 rounded-xl border border-brand-orange/45 bg-brand-orange/[0.12]"
            : "",
          !isLast ? "mb-1.5 sm:mb-2" : "",
        ].join(" ")}
        style={
          isGovernance
            ? {
                boxShadow:
                  "inset 0 1px 0 rgba(247,244,239,0.1), 0 8px 28px -18px rgba(243,111,33,0.55)",
              }
            : undefined
        }
      >
        <span
          className={[
            "font-display leading-none tracking-tight",
            isGovernance
              ? "text-[16px] font-semibold text-brand-ivory sm:text-[17px] lg:text-[18px]"
              : isAccent
                ? "text-[14px] font-medium text-brand-ivory sm:text-[15px] lg:text-[16px]"
                : "text-[13px] font-medium text-brand-ivory/85 sm:text-[14px] lg:text-[15px]",
          ].join(" ")}
        >
          {label}
        </span>

        {isGovernance && (
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-brand-ivory/85 sm:text-[11px]">
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
      className="text-brand-orange-soft"
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
