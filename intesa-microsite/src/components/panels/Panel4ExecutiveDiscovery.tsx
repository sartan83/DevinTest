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

        {/* Three-column compact flow.
            Traditional execution → Devin layer → Reviewable output.
            On lg the columns are wider in the center (Devin) so the
            eye lands on the execution layer. Arrows between columns
            on lg only. */}
        <div className="relative grid gap-2.5 sm:gap-3 lg:grid-cols-[1fr_auto_1.05fr_auto_1fr] lg:items-stretch lg:gap-2">
          {/* Column 1 — Traditional execution */}
          <Column
            label={p.current.label}
            caption={p.current.caption}
            items={p.current.items.slice(0, 4)}
            tone="muted"
          />

          <FlowArrow />

          {/* Column 2 — Devin execution layer (elevated) */}
          <Column
            label={p.future.label}
            caption={p.future.caption}
            items={p.future.items.slice(0, 4)}
            tone="primary"
          />

          <FlowArrow />

          {/* Column 3 — Future-state PR-ready workstream. No
              gate-styled last item — governance language lives in
              Panel 6, not here. */}
          <Column
            label={reviewable.label}
            caption={reviewable.caption}
            items={reviewable.items.slice(0, 4)}
            tone="elevated"
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
  items,
  tone,
  highlightLast,
}: {
  label: string;
  caption: string;
  items: string[];
  tone: "muted" | "primary" | "elevated";
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
        "flex flex-col gap-2 rounded-xl border px-3.5 py-3.5 sm:px-4 sm:py-4",
        isPrimary
          ? "border-brand-orange/35 bg-brand-orange/[0.05] shadow-[0_6px_24px_-16px_rgba(243,111,33,0.45)]"
          : isElevated
          ? "border-brand-ivory/15 bg-brand-green-mid/30"
          : "border-brand-ivory/8 bg-brand-green-deep/55",
      ].join(" ")}
    >
      <div className="flex items-baseline justify-between gap-2 border-b border-brand-ivory/10 pb-1.5">
        <span
          className={[
            "text-[9.5px] uppercase tracking-[0.28em] sm:text-[10px]",
            isPrimary
              ? "text-brand-orange-soft"
              : isElevated
              ? "text-brand-ivory/55"
              : "text-brand-ivory/35",
          ].join(" ")}
        >
          {caption}
        </span>
        <span
          className={[
            "font-display text-[11px] font-medium leading-none sm:text-[12px]",
            isPrimary
              ? "text-brand-ivory"
              : isElevated
              ? "text-brand-ivory/85"
              : "text-brand-ivory/50",
          ].join(" ")}
        >
          {label}
        </span>
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
