"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 4 — Future-State Engineering Flow.
 *
 * Compact 3-column execution flow:
 *   Traditional execution → Devin execution layer → Reviewable output
 *
 * Reduced ~45% in height vs. the prior cinematic layout. Max 4
 * bullets per column, two metrics only (6× / 20–30%), one short
 * closing line. Designed to be presentable in 90 seconds.
 */
export function Panel4ExecutiveDiscovery() {
  const p = intesa.panel4;
  const reviewable = p.reviewable ?? {
    label: "Reviewable output",
    caption: "After",
    items: ["Structured diffs", "PR summary", "Test evidence", "Human approval"],
  };

  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Header. */}
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <PanelHeadline text={p.headline} className="max-w-3xl" compact />
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-[12px] leading-relaxed text-brand-ivory/65 sm:text-[13px] lg:text-[14px]"
          >
            {p.subhead}
          </motion.p>
        </div>

        {/* Three-column paradigm-shift flow.
            Current paradigm → Devin execution layer → Future paradigm.
            The center column is visually the heaviest (orange accent
            + parallel-line motion) so the slide reads as an operating
            model shift, not as a generic process diagram. */}
        <div className="relative grid gap-2.5 sm:gap-3 lg:grid-cols-[1fr_auto_1.05fr_auto_1fr] lg:items-stretch lg:gap-2">
          {/* Column 1 — Current paradigm (human-led linear execution) */}
          <Column
            label={p.current.label}
            caption={p.current.caption}
            subtitle={p.current.subtitle}
            items={p.current.items.slice(0, 4)}
            tone="muted"
            mode="linear"
          />

          <FlowArrow />

          {/* Column 2 — Devin execution layer (the paradigm shift) */}
          <Column
            label={p.future.label}
            caption={p.future.caption}
            subtitle={p.future.subtitle}
            items={p.future.items.slice(0, 4)}
            tone="primary"
            mode="parallel"
          />

          <FlowArrow />

          {/* Column 3 — Future paradigm (reviewable PR-ready delivery) */}
          <Column
            label={reviewable.label}
            caption={reviewable.caption}
            subtitle={reviewable.subtitle}
            items={reviewable.items.slice(0, 4)}
            tone="elevated"
            mode="ready"
          />
        </div>

        {/* Trust line — one thin reminder that human approval
            remains. Replaces the dedicated Governed Acceleration
            slide that has been moved to the appendix. */}
        {p.trustLine && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.26em] text-brand-ivory/55 sm:text-[11px]"
          >
            <span
              aria-hidden
              className="inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange-soft/80"
            />
            <span className="leading-snug">{p.trustLine}</span>
          </motion.p>
        )}

        {/* Two metrics + closing line — one tight row. */}
        <div className="flex flex-col gap-2 border-t border-brand-ivory/10 pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline gap-2"
            >
              <span className="font-display text-[28px] font-semibold leading-none tracking-tight text-brand-orange-soft sm:text-[32px]">
                {p.future.anchor.metric}
              </span>
              <span className="text-[10.5px] uppercase tracking-[0.22em] text-brand-ivory/70 sm:text-[11px]">
                {p.future.anchor.label}
              </span>
            </motion.div>
            {p.future.signals?.[0] && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-baseline gap-2"
              >
                <span className="font-display text-[18px] font-light leading-none text-brand-ivory sm:text-[20px]">
                  {p.future.signals[0].value}
                </span>
                <span className="text-[10.5px] uppercase tracking-[0.18em] text-brand-ivory/60 sm:text-[11px]">
                  {p.future.signals[0].label}
                </span>
              </motion.div>
            )}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-[11.5px] italic leading-snug text-brand-ivory/65 sm:text-[12.5px] lg:text-right"
          >
            {p.closing}
          </motion.p>
        </div>
      </div>
    </PanelShell>
  );
}

/* Single column primitive used for all three flow stages. */
function Column({
  label,
  caption,
  subtitle,
  items,
  tone,
  mode = "linear",
  highlightLast,
}: {
  label: string;
  caption: string;
  subtitle?: string;
  items: string[];
  tone: "muted" | "primary" | "elevated";
  /** Visual signature of the column: linear (current), parallel
   *  (Devin shift), ready (future). Drives the small motion strip
   *  rendered below the title block. */
  mode?: "linear" | "parallel" | "ready";
  highlightLast?: boolean;
}) {
  const isPrimary = tone === "primary";
  const isElevated = tone === "elevated";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "relative flex flex-col gap-2 overflow-hidden rounded-xl border px-3.5 py-3.5 sm:px-4 sm:py-4",
        isPrimary
          ? "border-brand-orange/40 bg-brand-orange/[0.06] shadow-[0_6px_24px_-16px_rgba(243,111,33,0.5)]"
          : isElevated
          ? "border-brand-ivory/15 bg-brand-green-mid/30"
          : "border-brand-ivory/8 bg-brand-green-deep/55",
      ].join(" ")}
    >
      <div className="flex flex-col gap-1 border-b border-brand-ivory/10 pb-2">
        <div className="flex items-baseline justify-between gap-2">
          <span
            className={[
              "text-[9.5px] uppercase tracking-[0.28em] sm:text-[10px]",
              isPrimary
                ? "text-brand-orange"
                : isElevated
                ? "text-brand-ivory/55"
                : "text-brand-ivory/35",
            ].join(" ")}
          >
            {caption}
          </span>
          <span
            className={[
              "font-display text-[12px] font-semibold leading-none sm:text-[13.5px] lg:text-[14.5px]",
              isPrimary
                ? "text-brand-ivory"
                : isElevated
                ? "text-brand-ivory/90"
                : "text-brand-ivory/55",
            ].join(" ")}
          >
            {label}
          </span>
        </div>
        {subtitle && (
          <span
            className={[
              "text-[10.5px] leading-snug sm:text-[11.5px]",
              isPrimary
                ? "text-brand-orange-soft/95"
                : isElevated
                ? "text-brand-ivory/65"
                : "text-brand-ivory/45",
            ].join(" ")}
          >
            {subtitle}
          </span>
        )}
        <ParadigmMotionStrip mode={mode} tone={tone} />
      </div>
      <ul className="flex flex-col gap-1.5">
        {items.map((item, i) => {
          const isApprovalGate =
            highlightLast && i === items.length - 1;
          return (
            <li
              key={item}
              className={[
                "flex items-center gap-2 text-[11.5px] leading-snug sm:text-[12.5px]",
                isApprovalGate
                  ? "text-brand-ivory"
                  : isPrimary
                  ? "text-brand-ivory/90"
                  : isElevated
                  ? "text-brand-ivory/80"
                  : "text-brand-ivory/55",
              ].join(" ")}
            >
              <span
                aria-hidden
                className={[
                  "inline-block shrink-0",
                  isApprovalGate
                    ? "h-1.5 w-1.5 rounded-[1px] bg-brand-orange"
                    : isPrimary
                    ? "h-1 w-1 rounded-full bg-brand-orange"
                    : "h-1 w-1 rounded-full bg-brand-ivory/40",
                ].join(" ")}
              />
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

/* Small motion strip under each column header. Communicates the
 * paradigm at a glance: linear (single thin line moving slowly),
 * parallel (three offset lines streaming through, hero motion on
 * the center column), ready (three short "ready" tick segments). */
function ParadigmMotionStrip({
  mode,
  tone,
}: {
  mode: "linear" | "parallel" | "ready";
  tone: "muted" | "primary" | "elevated";
}) {
  const isPrimary = tone === "primary";
  const isElevated = tone === "elevated";
  const accent = isPrimary
    ? "bg-brand-orange"
    : isElevated
    ? "bg-brand-orange-soft"
    : "bg-brand-ivory/35";
  const track = isPrimary
    ? "bg-brand-orange/15"
    : isElevated
    ? "bg-brand-orange-soft/12"
    : "bg-brand-ivory/8";

  if (mode === "linear") {
    return (
      <div
        aria-hidden
        className={`relative mt-1 h-[3px] w-full overflow-hidden rounded-full ${track}`}
      >
        <motion.span
          className={`absolute inset-y-0 left-0 w-1/3 rounded-full ${accent}`}
          initial={{ x: "-100%" }}
          whileInView={{ x: "260%" }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 4.4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  if (mode === "parallel") {
    return (
      <div aria-hidden className="mt-1 flex flex-col gap-[3px]">
        {[0, 1, 2].map((row) => (
          <div
            key={row}
            className={`relative h-[3px] w-full overflow-hidden rounded-full ${track}`}
          >
            <motion.span
              className={`absolute inset-y-0 left-0 w-1/2 rounded-full ${accent}`}
              initial={{ x: "-110%" }}
              whileInView={{ x: "220%" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: row * 0.25,
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  // mode === "ready" — three steady segments, hint of completion.
  return (
    <div aria-hidden className="mt-1 flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.25, scaleX: 0.7 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.5,
            delay: 0.25 + i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`h-[3px] flex-1 origin-left rounded-full ${accent}`}
        />
      ))}
    </div>
  );
}

/* Thin chevron connector between columns. lg only. */
function FlowArrow() {
  return (
    <div
      aria-hidden
      className="hidden items-center justify-center text-brand-ivory/35 lg:flex"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 11 H17 M13 7 L17 11 L13 15"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
