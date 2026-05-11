"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="flex flex-col gap-2 sm:gap-2.5">
            <PanelHeadline text={p.headline} compact />
            {p.subhead && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl text-[12.5px] leading-relaxed text-brand-ivory/70 sm:text-[14px] lg:text-[15px]"
              >
                {p.subhead}
              </motion.p>
            )}
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-orange/35 bg-brand-orange/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-brand-orange-soft sm:text-[11px]">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-brand-orange-soft" />
            Modeled conservatively
          </span>
        </div>

        {/* isytech / cloud bridge.
            ─────────────────────────────────────────────────────────
            Anchors the capacity redeployment narrative to Intesa's
            own structural efficiency programme. The pilot reads as
            validating the execution layer rather than proposing a
            parallel value stream. Rendered as a thin uppercase rail
            above the scenarios, not as a card. */}
        {p.bridge && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-3 border-t border-brand-ivory/10 pt-3 sm:pt-3.5"
          >
            <span
              aria-hidden
              className="mt-1 inline-block h-px w-6 shrink-0 bg-brand-orange/50 sm:w-8"
            />
            <span className="text-[11.5px] italic leading-relaxed text-brand-ivory/65 sm:text-[12.5px]">
              {p.bridge}
            </span>
          </motion.div>
        )}

        {/* 3 scenario tiles. Per-tile assumptions (Applicable / Uplift
            / Adoption) stay visible inline so the executive can read
            the model without expanding anything. */}
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
                  {s.reclaimedEur}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[11px]">
                  / year
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:mt-4">
                <span className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-brand-ivory/90 sm:text-6xl lg:text-[72px]">
                  {s.devEqLarge}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/60 sm:text-[11px]">
                  {s.devEqLargeLabel}
                </span>
              </div>
              <div className="mt-1.5 text-[11px] text-brand-ivory/45 sm:text-[12px]">
                ≈ {s.reclaimedDevDays} dev-days redeployed
              </div>

              <div className="mt-3 border-t border-brand-ivory/10 pt-2.5">
                <div className="text-[9px] uppercase tracking-[0.24em] text-brand-ivory/40 sm:text-[10px]">
                  Assumptions
                </div>
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
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explicit governance line — capacity redeployment, NOT
            headcount reduction. Sits under the scenarios so the
            executive reads the model through the right framing
            before opening methodology. */}
        {p.redeploymentNote && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span
              aria-hidden
              className="h-px w-6 bg-brand-orange/55 sm:w-8"
            />
            <span className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/75 sm:text-[11px]">
              {p.redeploymentNote}
            </span>
          </motion.div>
        )}

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
