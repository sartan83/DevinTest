"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

/**
 * Panel 8 — ROI Signal · Capacity Redeployment.
 *
 * Cognition reset: default view shows ONLY the big numbers
 * (headline range + per-scenario € / dev-days / developer-
 * equivalents). Model assumptions (applicable / uplift / adoption),
 * formula, baseline, safety margin, sources and disclaimer all
 * collapse into a single "Methodology & sources" expandable —
 * available to the executive who wants the math, invisible to the
 * one who doesn't.
 */
export function Panel8RoiSignal() {
  const p = intesa.panel8;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="grid gap-3 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-8">
          <PanelHeadline text={p.headline} compact />
          <div className="flex flex-col gap-2">
            <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
            <div className="rounded-lg border border-brand-orange/30 bg-brand-green-mid/30 px-3 py-2.5">
              <div className="text-[9px] uppercase tracking-[0.24em] text-brand-orange-soft/90 sm:text-[10px]">
                Headline range
              </div>
              <div className="mt-0.5 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold leading-none text-brand-ivory sm:text-5xl">
                  {p.headlineRange.devEqLarge}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[11px]">
                  {p.headlineRange.devEqLargeLabel}
                </span>
              </div>
              <div className="mt-1 text-[11px] tracking-wide text-brand-ivory/55 sm:text-xs">
                {p.headlineRange.eur} · {p.headlineRange.devDays}
              </div>
            </div>
          </div>
        </div>

        {/* 3 scenario tiles — only big numbers visible. Per-tile
            assumptions (Applicable/Uplift/Adoption) collapse into a
            tiny "Assumptions" toggle so the default view stays a
            5-second scan. */}
        <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {p.scenarios.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={[
                "relative overflow-hidden rounded-xl border p-3.5 sm:p-4",
                s.key === "realistic"
                  ? "border-brand-orange/40 bg-devin-gradient-soft bg-brand-green-mid/40 shadow-elev"
                  : "border-brand-ivory/10 bg-brand-green-mid/25",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.24em] text-brand-ivory/65">
                  {s.title}
                </div>
                {s.key === "realistic" && (
                  <span className="rounded-full border border-brand-orange/50 bg-brand-orange/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-brand-orange-soft">
                    Focus
                  </span>
                )}
                {s.key === "best" && (
                  <span className="rounded-full border border-brand-ivory/20 bg-brand-ivory/5 px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-brand-ivory/60">
                    Ceiling
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-baseline gap-2 sm:mt-4">
                <span className="font-display text-[64px] font-semibold leading-[0.95] tracking-tight text-brand-ivory sm:text-[88px] lg:text-[104px]">
                  {s.devEqLarge}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[11px]">
                  {s.devEqLargeLabel}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-[11px] text-brand-ivory/55 sm:text-[12px]">
                <span>{s.reclaimedEur} / year</span>
                <span aria-hidden className="opacity-50">·</span>
                <span>≈ {s.reclaimedDevDays} dev-days redeployed</span>
              </div>

              <details className="group mt-3 border-t border-brand-ivory/10 pt-2.5">
                <summary className="cursor-pointer list-none text-[9px] uppercase tracking-[0.24em] text-brand-ivory/40 hover:text-brand-ivory/65 sm:text-[10px]">
                  Assumptions
                  <span aria-hidden className="ml-1 inline-block transition-transform group-open:rotate-180">↓</span>
                </summary>
                <dl className="mt-2 grid grid-cols-3 gap-2 text-[9px] uppercase tracking-[0.2em] text-brand-ivory/50 sm:text-[10px]">
                  <div>
                    <dt>Applicable</dt>
                    <dd className="mt-0.5 font-display text-sm font-semibold normal-case tracking-normal text-brand-ivory sm:text-base">
                      {s.applicableWorkPct}%
                    </dd>
                  </div>
                  <div>
                    <dt>Uplift</dt>
                    <dd className="mt-0.5 font-display text-sm font-semibold normal-case tracking-normal text-brand-ivory sm:text-base">
                      {s.upliftPct}%
                    </dd>
                  </div>
                  <div>
                    <dt>Adoption</dt>
                    <dd className="mt-0.5 font-display text-sm font-semibold normal-case tracking-normal text-brand-ivory sm:text-base">
                      {s.adoptionPct}%
                    </dd>
                  </div>
                </dl>
                <p className="mt-2 text-[10px] leading-snug text-brand-ivory/55 sm:text-[11px]">
                  {s.footnote}
                </p>
              </details>
            </motion.div>
          ))}
        </div>

        {/* Single global Methodology & sources expandable. Default
            collapsed so the slide is dominated by big numbers. */}
        <details className="group rounded-lg border border-brand-ivory/10 bg-brand-green-deep/40 px-3 py-2.5">
          <summary className="cursor-pointer list-none text-[10px] uppercase tracking-[0.24em] text-brand-ivory/45 hover:text-brand-ivory/70 sm:text-[11px]">
            Methodology &amp; sources
            <span aria-hidden className="ml-1 inline-block transition-transform group-open:rotate-180">↓</span>
          </summary>
          <div className="mt-2.5 flex flex-col gap-2 text-[11px] leading-relaxed text-brand-ivory/65 sm:text-[12px]">
            <p>
              <span className="uppercase tracking-[0.22em] text-brand-ivory/40">Model · </span>
              <span className="font-medium text-brand-ivory/85">{p.formula}</span>
            </p>
            <p>
              <span className="uppercase tracking-[0.22em] text-brand-ivory/40">Baseline · </span>
              {p.baseline.devsLabel} · {p.baseline.workingDaysPerYear} working days / year ·{" "}
              {p.baseline.fullyLoadedCostLabel}
            </p>
            <p>
              <span className="uppercase tracking-[0.22em] text-brand-ivory/40">Uplift · </span>
              {p.upliftHint}
            </p>
            <p>
              <span className="uppercase tracking-[0.22em] text-brand-ivory/40">Safety margin · </span>
              {p.safetyMarginNote}
            </p>
            <ul className="grid gap-1 sm:grid-cols-3 sm:gap-2">
              {p.sources.map((s) => (
                <li key={s} className="text-[10px] leading-snug text-brand-ivory/45 sm:text-[11px]">
                  · {s}
                </li>
              ))}
            </ul>
            <p className="text-[10px] leading-relaxed text-brand-ivory/45">{p.disclaimer}</p>
          </div>
        </details>
      </div>
    </PanelShell>
  );
}
