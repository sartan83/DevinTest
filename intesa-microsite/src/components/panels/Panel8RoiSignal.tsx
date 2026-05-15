"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 8 — Contribution to the 15% SDLC efficiency ambition.
 *
 * Restructured from standalone €6M/€19M scenarios into a value-logic
 * cascade anchored on Intesa's own 15% / ~€70M SDLC efficiency
 * ambition. The cascade reads:
 *   ~€467M implied SDLC baseline (derived)
 *     ↓ 15% SDLC efficiency ambition (official)
 *     ↓ ~€70M target by 2028 (official)
 *     ↓ 70% execution zone (≈ €327M implied, derived)
 *     ↓ Pilot-validated contribution
 *
 * The right rail anchors the 70% execution zone (43% coding +
 * 27% testing/release). Contribution scenarios sit below as
 * ranges-to-validate, not as guaranteed savings.
 */
export function Panel8RoiSignal() {
  const p = intesa.panel8;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Hero row — headline + subline + "Implied model" pill */}
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
            {p.valueLogic.label}
          </span>
        </div>

        {/* Two-column anchor row.
            ─────────────────────────────────────────────────────────
            LEFT  · Value-logic cascade — €467M → 15% → €70M → 70% → pilot
            RIGHT · 70% SDLC execution zone visual (43% coding + 27%
                    testing/release) — premium horizontal bar split */}
        <div className="grid items-stretch gap-3 sm:gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT — Value-logic cascade */}
          <div className="relative overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/30 p-3.5 sm:p-4">
            <div className="text-[9px] uppercase tracking-[0.26em] text-brand-ivory/45 sm:text-[10px]">
              Value logic
            </div>
            <div className="mt-3 flex flex-col gap-1.5 sm:gap-2">
              {p.valueLogic.steps.map((s, i) => {
                const isOfficial = s.tone === "official";
                const isPilot = s.tone === "pilot";
                return (
                  <div key={s.label} className="flex flex-col gap-1.5 sm:gap-2">
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className={[
                        "flex items-baseline justify-between gap-3 rounded-lg px-3 py-2 sm:py-2.5",
                        isOfficial
                          ? "border border-brand-orange/40 bg-brand-orange/5"
                          : isPilot
                          ? "border border-brand-ivory/15 bg-brand-green-deep/50"
                          : "border border-brand-ivory/10 bg-brand-green-deep/30",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "font-display font-semibold leading-none tracking-tight",
                          isPilot
                            ? "text-[18px] text-brand-ivory sm:text-[22px]"
                            : "text-[22px] text-brand-ivory sm:text-[28px] lg:text-[32px]",
                          isOfficial ? "text-brand-orange-soft" : "",
                        ].join(" ")}
                      >
                        {s.value}
                      </span>
                      <span className="text-right text-[10px] uppercase tracking-[0.18em] text-brand-ivory/65 sm:text-[11px]">
                        {s.label}
                      </span>
                    </motion.div>
                    {i < p.valueLogic.steps.length - 1 && (
                      <span aria-hidden className="ml-3 inline-block h-3 w-px bg-brand-ivory/20 sm:h-4" />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-[10px] italic leading-snug text-brand-ivory/50 sm:text-[11px]">
              {p.derivationNote}
            </p>
          </div>

          {/* RIGHT — 70% SDLC execution zone visual */}
          <div className="relative overflow-hidden rounded-xl border border-brand-orange/30 bg-brand-green-deep/55 p-3.5 sm:p-4">
            <div className="text-[9px] uppercase tracking-[0.26em] text-brand-orange-soft sm:text-[10px]">
              {p.executionZone.label}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-[72px] font-semibold leading-[0.95] tracking-tight text-brand-ivory sm:text-[96px] lg:text-[112px]">
                70%
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/60 sm:text-[11px]">
                of SDLC effort
              </span>
            </div>

            {/* Stacked split bar — 43% / 27% with gradient + glow */}
            <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full border border-brand-orange/40 bg-brand-green-deep/70 sm:h-3.5">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "61.4%" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="bg-gradient-to-r from-brand-orange/85 to-brand-orange/55"
                aria-hidden
              />
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "38.6%" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-gradient-to-r from-brand-orange/45 to-brand-orange/25"
                aria-hidden
              />
            </div>
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.2em] text-brand-ivory/65 sm:text-[11px]">
              {p.executionZone.parts.map((part) => (
                <span key={part.label} className="flex items-baseline gap-1.5">
                  <span className="font-display text-base font-semibold tracking-tight text-brand-ivory sm:text-lg">
                    {part.value}
                  </span>
                  <span>{part.label}</span>
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] italic leading-snug text-brand-ivory/65 sm:text-[12px]">
              ≈ €327M implied execution-effort zone (derived).
            </p>
          </div>
        </div>

        {/* Summary band — single-line headline range. */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-baseline justify-between gap-3 border-t border-brand-ivory/10 pt-3"
        >
          <span className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/55 sm:text-[11px]">
            Range to validate
          </span>
          <div className="flex flex-wrap items-baseline gap-3 sm:gap-5">
            <span className="font-display text-xl font-semibold tracking-tight text-brand-ivory sm:text-2xl">
              {p.headlineRange.pct}
            </span>
            <span className="font-display text-base font-medium tracking-tight text-brand-ivory/80 sm:text-lg">
              {p.headlineRange.eur}
            </span>
          </div>
        </motion.div>

        {/* 3 contribution scenarios. Each shows contribution % of the
            €70M target + the soft EUR translation. Reads as ranges
            to validate, not as committed savings. */}
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
                s.key === "base"
                  ? "border-brand-orange/40 bg-devin-gradient-soft bg-brand-green-mid/40 shadow-elev"
                  : "border-brand-ivory/10 bg-brand-green-mid/25",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.24em] text-brand-ivory/65">
                  {s.title}
                </div>
                {s.key === "base" && (
                  <span className="rounded-full border border-brand-orange/50 bg-brand-orange/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-brand-orange-soft">
                    Focus
                  </span>
                )}
                {s.key === "stretch" && (
                  <span className="rounded-full border border-brand-ivory/20 bg-brand-ivory/5 px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-brand-ivory/60">
                    Ceiling
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-baseline gap-2 sm:mt-4">
                <span className="font-display text-[56px] font-semibold leading-[0.95] tracking-tight text-brand-ivory sm:text-[80px] lg:text-[96px]">
                  {s.contributionPct}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[11px]">
                  of €70M target
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-2xl font-semibold tracking-tight text-brand-ivory/85 sm:text-3xl">
                  {s.contributionEur}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[11px]">
                  potential
                </span>
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-brand-ivory/45 sm:text-[11px]">
                {s.subtitle}
              </div>

              <div className="mt-3 border-t border-brand-ivory/10 pt-2.5">
                <p className="text-[10.5px] leading-snug text-brand-ivory/55 sm:text-[11.5px]">
                  {s.footnote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scenarios disclaimer rail */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <span aria-hidden className="h-px w-6 bg-brand-orange/55 sm:w-8" />
          <span className="text-[10px] uppercase tracking-[0.26em] text-brand-ivory/65 sm:text-[11px]">
            {p.scenariosLabel}
          </span>
        </motion.div>

        {/* Capacity-redeployment governance line */}
        {p.redeploymentNote && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span aria-hidden className="h-px w-6 bg-brand-orange/55 sm:w-8" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/75 sm:text-[11px]">
              {p.redeploymentNote}
            </span>
          </motion.div>
        )}

        {/* Methodology & sources — collapsed by default */}
        <details className="group rounded-lg border border-brand-ivory/10 bg-brand-green-deep/40 px-3 py-2.5">
          <summary className="cursor-pointer list-none text-[10px] uppercase tracking-[0.24em] text-brand-ivory/45 hover:text-brand-ivory/70 sm:text-[11px]">
            Methodology &amp; sources
            <span aria-hidden className="ml-1 inline-block transition-transform group-open:rotate-180">↓</span>
          </summary>
          <div className="mt-2.5 flex flex-col gap-2 text-[11px] leading-relaxed text-brand-ivory/65 sm:text-[12px]">
            <p>
              <span className="uppercase tracking-[0.22em] text-brand-ivory/40">Formula · </span>
              <span className="font-medium text-brand-ivory/85">{p.formula}</span>
            </p>
            <p>
              <span className="uppercase tracking-[0.22em] text-brand-ivory/40">Derivation · </span>
              {p.derivationNote}
            </p>
            <ul className="grid gap-1 sm:grid-cols-1 sm:gap-2">
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
