"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 5 — Governance-Aware Modernization Workflow (MERGED).
 *
 * Consolidates the former P5 (conceptual demo) and P5b (live workflow
 * preview) into one premium executive section. Opens with a cinematic
 * transition line. Left column: 5-node bounded operational workflow.
 * Right column: business interpretation — scale anchors with
 * developer-equivalent translation, plus governance/scalability
 * statements.
 *
 * Visual differentiation vs Tab 4 (strategic / conversational):
 * deliberately operational, visual, proof-oriented. Audience perceives
 * the shift from alignment into operational proof.
 */
export function Panel5BusinessImpact() {
  const p = intesa.panel5;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-2.5 sm:gap-3">
        {/* Cinematic executive transition statement — set above the
           headline as a quoted strapline. Uses orange accent border-left
           for executive emphasis without theatrical weight. */}
        <motion.blockquote
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="border-l-2 border-brand-orange/60 pl-3 text-[12px] italic leading-relaxed text-brand-ivory/80 sm:pl-4 sm:text-[13px]"
        >
          {p.transitionStatement}
        </motion.blockquote>

        <div className="grid gap-2 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-8">
          <PanelHeadline text={p.headline} compact />
          <p className="text-[11px] leading-relaxed text-brand-ivory/70 sm:text-[12px]">
            {p.subhead}
          </p>
        </div>

        {/* Two-column layout — left: workflow flow / right: business impact.
           Stacks vertically on small screens. */}
        <div className="grid gap-2.5 sm:gap-3 lg:grid-cols-[1.15fr_1fr] lg:gap-4">
          {/* LEFT — Bounded operational workflow (5 nodes, vertical flow). */}
          <div className="rounded-xl border border-brand-ivory/10 bg-brand-green-mid/15 px-3 py-2.5 sm:px-3.5 sm:py-3">
            <div className="mb-2 flex items-baseline gap-3">
              <span className="text-[9px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10px]">
                {p.workflow.title}
              </span>
              <span aria-hidden className="h-px flex-1 bg-brand-ivory/10" />
            </div>

            <ol className="flex flex-col gap-1">
              {p.workflow.nodes.map((n, i) => (
                <WorkflowNode
                  key={n.label}
                  label={n.label}
                  tone={n.tone}
                  index={i}
                  isLast={i === p.workflow.nodes.length - 1}
                />
              ))}
            </ol>

            <p className="mt-2 text-[10px] leading-snug text-brand-ivory/70 sm:text-[11px]">
              {p.workflow.insight}
            </p>
          </div>

          {/* RIGHT — Business interpretation (operational leverage). */}
          <div className="rounded-xl border border-brand-orange/25 bg-brand-orange/5 px-3 py-2.5 sm:px-3.5 sm:py-3">
            <div className="mb-2 flex items-baseline gap-3">
              <span className="text-[9px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10px]">
                {p.businessImpact.title}
              </span>
              <span aria-hidden className="h-px flex-1 bg-brand-orange/20" />
            </div>

            <ul className="flex flex-col gap-1.5">
              {p.businessImpact.metrics.map((m, i) => (
                <motion.li
                  key={m.label}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-2.5"
                >
                  <span className="font-display text-[15px] font-light tabular-nums text-brand-ivory sm:text-base">
                    {m.value}
                  </span>
                  <span className="text-[11px] leading-snug text-brand-ivory/75 sm:text-[12px]">
                    {m.label}
                  </span>
                </motion.li>
              ))}
            </ul>

            <ul className="mt-2.5 flex flex-col gap-1 border-t border-brand-orange/15 pt-2">
              {p.businessImpact.statements.map((s) => (
                <li
                  key={s}
                  className="flex gap-2 text-[11px] leading-snug text-brand-ivory/85 sm:text-[12px]"
                >
                  <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange/65" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footnote row: repo link + condensed disclaimers. */}
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
          <span className="text-brand-ivory/30">·</span>
          <span>{p.businessImpact.devEquivalentFootnote}</span>
        </div>
      </div>
    </PanelShell>
  );
}

function WorkflowNode({
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
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, delay: 0.07 * index, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "flex items-center gap-2 rounded-lg border px-2.5 py-1 text-[11px] leading-snug sm:text-[12px]",
          toneClass,
        ].join(" ")}
      >
        <span className="font-mono text-[10px] tabular-nums text-brand-ivory/45 sm:text-[11px]">
          0{index + 1}
        </span>
        <span>{label}</span>
      </motion.li>
      {!isLast && (
        <motion.span
          aria-hidden
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 * index }}
          className="ml-3 text-[10px] leading-none text-brand-ivory/30 sm:ml-4"
        >
          ↓
        </motion.span>
      )}
    </>
  );
}
