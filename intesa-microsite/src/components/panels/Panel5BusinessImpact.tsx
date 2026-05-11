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
 *          - subtle supporting line
 *          - understated 6× reference-deployment chip
 *
 *   RIGHT  Vertical execution stream
 *          - six bounded steps: Repo scan → Migration plan →
 *            Code transformation → Test generation → Governed PR →
 *            Human approval
 *          - connectors animate continuously top → bottom
 *          - last step ("Human approval") is enforced visually as
 *            governance, not optional
 *
 * Visual rules:
 *   - No horizontal workflow diagram. No arrows. No BPMN aesthetic.
 *   - Subtle vertical flow energy — continuous, lightweight.
 *   - "Reference deployment: 6× modernization acceleration" remains
 *     understated, not a KPI tile.
 */
export function Panel5BusinessImpact() {
  const p = intesa.panel5;

  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="cinematic" eyebrowSize="lg">
      <div className="grid gap-6 sm:gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
        {/* LEFT — Strategic narrative
            ─────────────────────────────────────────────────────────
            Strong whitespace, dominant typography, premium quietness.
        */}
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

          {/* Reference-deployment proof signal — understated.
              ──────────────────────────────────────────────────────
              Soft halo, no border, no card framing. Reads as an
              operational signal embedded in the narrative, not as a
              KPI tile. */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-1 flex flex-col gap-0.5"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-3 -inset-y-2 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at 12% 60%, rgba(243,111,33,0.16) 0%, transparent 60%)",
              }}
            />
            <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] text-brand-ivory/50 sm:text-[11px]">
              {p.referenceDeployment.caption}
            </span>
            <span className="relative z-10 flex items-baseline gap-3 sm:gap-4">
              <span
                className="font-display font-semibold leading-[0.9] tracking-tight text-[44px] sm:text-[56px] lg:text-[64px]"
                style={{ color: "rgba(243,111,33,0.95)" }}
              >
                {p.referenceDeployment.metric}
              </span>
              <span className="text-[12px] uppercase tracking-[0.22em] text-brand-ivory/80 sm:text-[13px]">
                {p.referenceDeployment.label}
              </span>
            </span>
          </motion.div>

          {/* Closing executive line — small, italic. */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
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
            Continuous downward flow. Each step renders as a soft
            floating row; the connector between rows is a thin ivory
            line with a small descending dot animating top→bottom.
            The final "Human approval" step is visually enforced as
            governance: distinct accent border, lock icon, clear bottom
            anchor. */}
        <motion.ol
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col"
        >
          {/* Continuous vertical guide line behind the stream. Sits
              under all steps; opacity tapers near the ends. */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[14px] top-3 bottom-3 w-px"
            style={{
              background:
                "linear-gradient(180deg, rgba(247,244,239,0) 0%, rgba(247,244,239,0.22) 12%, rgba(247,244,239,0.22) 88%, rgba(247,244,239,0) 100%)",
            }}
          />

          {p.workflow.steps.map((step, i) => {
            const isLast = i === p.workflow.steps.length - 1;
            return (
              <StreamStep
                key={step.label}
                label={step.label}
                tone={step.tone}
                index={i}
                isLast={isLast}
              />
            );
          })}
        </motion.ol>
      </div>
    </PanelShell>
  );
}

function StreamStep({
  label,
  tone,
  index,
  isLast,
}: {
  label: string;
  tone: "default" | "accent" | "governance";
  index: number;
  isLast: boolean;
}) {
  const isAccent = tone === "accent";
  const isGovernance = tone === "governance";

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
        {/* Dot — accent rows use orange, governance row is orange with
            a thicker ring + glow, default rows are ivory. */}
        <span
          aria-hidden
          className={[
            "relative z-10 mt-3 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full",
            isGovernance
              ? "bg-brand-orange ring-4 ring-brand-orange/20"
              : isAccent
                ? "bg-brand-orange"
                : "bg-brand-ivory/70",
          ].join(" ")}
        />

        {/* Animated descender — small ivory dot continuously moving
            top → bottom along the rail between this step and the
            next. Hidden on the last step. */}
        {!isLast && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-3 -z-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-ivory/50"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: [8, 56], opacity: [0, 0.75, 0] }}
            transition={{
              duration: 1.6,
              delay: 0.25 * index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>

      {/* Step label — premium card row, no border on default/accent,
          subtle border on governance row to anchor the close. */}
      <div
        className={[
          "flex flex-1 items-center justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3",
          isGovernance
            ? "mt-1 rounded-xl border border-brand-orange/35 bg-brand-orange/8"
            : "",
          !isLast ? "mb-1.5 sm:mb-2" : "",
        ].join(" ")}
      >
        <span
          className={[
            "font-display leading-none tracking-tight",
            isGovernance
              ? "text-[15px] font-semibold text-brand-ivory sm:text-[16px] lg:text-[17px]"
              : isAccent
                ? "text-[14px] font-medium text-brand-ivory sm:text-[15px] lg:text-[16px]"
                : "text-[13px] font-medium text-brand-ivory/85 sm:text-[14px] lg:text-[15px]",
          ].join(" ")}
        >
          {label}
        </span>

        {isGovernance && (
          <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.24em] text-brand-orange-soft sm:text-[10px]">
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
      width="11"
      height="13"
      fill="none"
      className="text-brand-orange-soft"
    >
      <rect x="1.5" y="6" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M3.5 6V4.5a2.5 2.5 0 0 1 5 0V6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
