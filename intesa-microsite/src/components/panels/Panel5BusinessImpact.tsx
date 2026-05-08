"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 5 — Demo: Governed Modernization Workflow.
 *
 * EB-pivot rebuild: this is the demo section. Single use-case anchor +
 * left-to-right flow + 3 demo bullets. Operational, visual, presenter-
 * narrated. The previous merged "operational leverage" metrics column
 * has been dropped — capacity sits in P7, ROI in P8.
 */
export function Panel5BusinessImpact() {
  const p = intesa.panel5;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="cinematic">
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Demo use case anchor */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-fit items-center gap-3 rounded-full border border-brand-orange/30 bg-brand-orange/5 px-3 py-1.5 sm:px-4 sm:py-2"
        >
          <span className="text-[9px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10px]">
            Demo use case
          </span>
          <span className="text-[12px] font-medium leading-snug text-brand-ivory sm:text-[13px]">
            {p.useCase}
          </span>
        </motion.div>

        <PanelHeadline text={p.headline} compact />

        {/* Left-to-right horizontal flow (6 nodes) */}
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {p.workflow.nodes.map((n, i) => (
            <FlowNode
              key={n.label}
              label={n.label}
              tone={n.tone}
              index={i}
              isLast={i === p.workflow.nodes.length - 1}
            />
          ))}
        </ol>

        {/* 3 demo bullets only */}
        <ul className="flex flex-col gap-1.5 sm:gap-2">
          {p.workflow.demoBullets.map((b, i) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.45,
                delay: 0.06 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-baseline gap-2.5 text-[12px] leading-snug text-brand-ivory/85 sm:text-[13px]"
            >
              <span
                aria-hidden
                className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange/70"
              />
              <span>{b}</span>
            </motion.li>
          ))}
        </ul>

        {/* Cinematic closing peak */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-balance text-[15px] font-light leading-tight tracking-displaytight text-brand-ivory sm:text-[18px] lg:text-[22px]"
        >
          {p.closingStatement}
        </motion.p>

        {/* Tiny disclaimer */}
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 text-[9px] leading-snug text-brand-ivory/45 sm:text-[10px]">
          <a
            href={p.repoLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-brand-ivory/65 underline decoration-brand-ivory/25 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60"
          >
            <span aria-hidden>↗</span>
            <span className="font-mono">{p.repoLink.label}</span>
          </a>
          <span className="text-brand-ivory/30">·</span>
          <span>{p.repoDisclaimer}</span>
        </div>
      </div>
    </PanelShell>
  );
}

function FlowNode({
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
        ? "border-brand-ivory/10 bg-brand-green-deep/45 text-brand-ivory/75"
        : "border-brand-ivory/15 bg-brand-green-mid/30 text-brand-ivory/90";

  return (
    <>
      <motion.li
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.42,
          delay: 0.06 * index,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={[
          "rounded-lg border px-2.5 py-1.5 text-[11px] leading-snug sm:px-3 sm:py-2 sm:text-[12px]",
          toneClass,
        ].join(" ")}
      >
        {label}
      </motion.li>
      {!isLast && (
        <motion.span
          aria-hidden
          animate={{ opacity: [0.32, 0.55, 0.32] }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4 * index,
          }}
          className="text-[12px] leading-none text-brand-ivory/40 sm:text-[13px]"
        >
          →
        </motion.span>
      )}
    </>
  );
}
