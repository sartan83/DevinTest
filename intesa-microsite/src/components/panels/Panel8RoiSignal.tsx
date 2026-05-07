"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

export function Panel8RoiSignal() {
  const p = intesa.panel8;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex flex-col gap-8 sm:gap-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-10">
          <PanelHeadline text={p.headline} />
          <div className="flex flex-col gap-4">
            <PanelSubhead className="mt-0">{p.subhead}</PanelSubhead>
            <div className="rounded-lg border border-brand-orange/30 bg-brand-green-mid/30 px-4 py-3">
              <div className="text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft/90">
                Headline range
              </div>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="font-display text-2xl font-semibold text-brand-ivory sm:text-3xl">
                  {p.headlineRange.eur}
                </span>
                <span className="text-xs tracking-wide text-brand-ivory/70 sm:text-sm">
                  ≈ {p.headlineRange.devDays}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-brand-ivory/10 bg-brand-green-deep/40 px-4 py-3 text-[11px] leading-relaxed text-brand-ivory/65 sm:text-xs">
          <span className="uppercase tracking-[0.22em] text-brand-ivory/45">Model · </span>
          <span className="font-medium text-brand-ivory/85">{p.formula}</span>
          <span className="block pt-1 text-brand-ivory/50">
            Baseline: {p.baseline.devsLabel} · {p.baseline.workingDaysPerYear} working days / year ·{" "}
            {p.baseline.fullyLoadedCostLabel}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {p.scenarios.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={[
                "relative overflow-hidden rounded-2xl border p-5 sm:p-6",
                s.key === "realistic"
                  ? "border-brand-orange/40 bg-devin-gradient-soft bg-brand-green-mid/40 shadow-elev"
                  : "border-brand-ivory/10 bg-brand-green-mid/25",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-brand-ivory/55">
                    {s.title}
                  </div>
                  <div className="mt-1 text-[10px] text-brand-ivory/50">{s.subtitle}</div>
                </div>
                {s.key === "realistic" && (
                  <span className="rounded-full border border-brand-orange/50 bg-brand-orange/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-brand-orange-soft">
                    Focus
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-3xl font-semibold text-brand-ivory sm:text-4xl">
                  {s.reclaimedEur}
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-brand-ivory/55">
                  / year
                </span>
              </div>
              <div className="mt-1 text-sm text-brand-ivory/70">
                ≈ {s.reclaimedDevDays} developer-days / year reclaimed
              </div>

              <dl className="mt-5 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-ivory/50">
                <div>
                  <dt>Applicable</dt>
                  <dd className="mt-1 font-display text-base font-semibold normal-case tracking-normal text-brand-ivory">
                    {s.applicableWorkPct}%
                  </dd>
                </div>
                <div>
                  <dt>Uplift</dt>
                  <dd className="mt-1 font-display text-base font-semibold normal-case tracking-normal text-brand-ivory">
                    {s.upliftPct}%
                  </dd>
                </div>
                <div>
                  <dt>Adoption</dt>
                  <dd className="mt-1 font-display text-base font-semibold normal-case tracking-normal text-brand-ivory">
                    {s.adoptionPct}%
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-[11px] leading-relaxed text-brand-ivory/55">{s.footnote}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-[11px] leading-relaxed text-brand-ivory/55 sm:text-xs">
          <p className="rounded-lg border border-brand-ivory/10 bg-brand-green-deep/40 px-3 py-2">
            <span className="uppercase tracking-[0.22em] text-brand-ivory/45">
              Safety margin ·{" "}
            </span>
            {p.safetyMarginNote}
          </p>
          <details className="group">
            <summary className="cursor-pointer text-[10px] uppercase tracking-[0.22em] text-brand-ivory/40 hover:text-brand-ivory/65 sm:text-[11px]">
              Sources
              <span aria-hidden className="ml-1 inline-block transition-transform group-open:rotate-180">↓</span>
            </summary>
            <ul className="mt-1.5 grid gap-1 px-1 sm:grid-cols-3 sm:gap-2">
              {p.sources.map((s) => (
                <li key={s} className="text-[10px] leading-snug text-brand-ivory/45 sm:text-[11px]">
                  · {s}
                </li>
              ))}
            </ul>
          </details>
          <p className="text-[10px] leading-relaxed text-brand-ivory/45">
            {p.disclaimer}
          </p>
        </div>
      </div>
    </PanelShell>
  );
}
