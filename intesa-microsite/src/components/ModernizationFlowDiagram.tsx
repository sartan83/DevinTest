"use client";

import { motion } from "framer-motion";
import { intesa } from "../data/intesa";

/**
 * Clean enterprise modernization flow — horizontal process schema.
 * Visual contrast vs the card-grid layouts used elsewhere; communicates
 * bounded, governance-aware execution as a left-to-right pipeline.
 *
 * 5 nodes, 4 arrows, subtle motion. Apple/McKinsey style — no startup
 * gimmicks. Tones map nodes to narrative weight (accent = strategic
 * anchor, default = step, muted = upstream constraint).
 */
export function ModernizationFlowDiagram() {
  const flow = intesa.modernizationFlow;
  return (
    <div className="rounded-xl border border-brand-ivory/10 bg-brand-green-mid/15 px-3.5 py-3 sm:px-4 sm:py-3.5">
      <div className="mb-2.5 flex items-baseline gap-3">
        <span className="text-[9px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10px]">
          {flow.title}
        </span>
        <span aria-hidden className="h-px flex-1 bg-brand-ivory/10" />
      </div>

      <div className="flex flex-col items-stretch gap-2 sm:gap-2.5 lg:flex-row lg:items-center lg:gap-1.5">
        {flow.nodes.map((n, i) => (
          <FlowNodeWithArrow
            key={n.label}
            label={n.label}
            tone={n.tone}
            index={i}
            isLast={i === flow.nodes.length - 1}
          />
        ))}
      </div>

      <p className="mt-2.5 text-[11px] leading-snug text-brand-ivory/70 sm:text-[12px]">
        {flow.insight}
      </p>
    </div>
  );
}

function FlowNodeWithArrow({
  label,
  tone,
  index,
  isLast,
}: {
  label: string;
  tone: "default" | "accent" | "muted";
  index: number;
  isLast: boolean;
}) {
  const toneClass =
    tone === "accent"
      ? "border-brand-orange/35 bg-brand-orange/8 text-brand-ivory"
      : tone === "muted"
        ? "border-brand-ivory/10 bg-brand-green-deep/45 text-brand-ivory/70"
        : "border-brand-ivory/15 bg-brand-green-mid/30 text-brand-ivory/90";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "flex flex-1 items-center justify-center rounded-lg border px-2.5 py-2 text-center text-[11px] leading-snug sm:text-[12px]",
          toneClass,
        ].join(" ")}
      >
        {label}
      </motion.div>
      {!isLast && (
        <span aria-hidden className="self-center text-brand-ivory/35">
          {/* Down arrow on small screens, right arrow on lg. */}
          <span className="lg:hidden">↓</span>
          <span className="hidden lg:inline">→</span>
        </span>
      )}
    </>
  );
}
