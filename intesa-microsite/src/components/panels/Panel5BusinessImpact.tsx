"use client";

import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";
import { ModernizationFlowDiagram } from "../ModernizationFlowDiagram";

/**
 * Tab 5 — Devin modernization demo.
 * Differentiated from Tab 4 (Executive alignment, conversational) by being
 * deliberately operational/visual: a clean horizontal flow diagram replaces
 * the prior 4-card step grid. Use case + repo link kept as concrete
 * proof-of-execution context. Presenter narrates the workflow verbally.
 */
export function Panel5BusinessImpact() {
  const p = intesa.panel5;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="grid gap-3 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-8">
          <div>
            <PanelHeadline text={p.headline} compact />
            <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-brand-orange-soft/90 sm:text-[12px]">
              {p.useCase}
            </p>
            <a
              href={p.repoLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-brand-ivory/70 underline decoration-brand-ivory/25 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60 sm:text-[12px]"
            >
              <span aria-hidden>↗</span>
              <span className="font-mono">{p.repoLink.label}</span>
            </a>
            <p className="mt-2 text-[10px] leading-relaxed text-brand-ivory/45 sm:text-[11px]">
              {p.repoDisclaimer}
            </p>
          </div>
          <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
        </div>

        {/* Modernization flow diagram — clean enterprise schema in place of
           the prior step-card grid. Visual differentiation vs Tab 4. */}
        <ModernizationFlowDiagram />

        {p.valueStatements[0] && (
          <p className="rounded-xl border border-brand-orange/25 bg-brand-orange/5 px-4 py-3 text-[13px] leading-relaxed text-brand-ivory/85 sm:text-[14px]">
            {p.valueStatements[0]}
          </p>
        )}
      </div>
    </PanelShell>
  );
}
