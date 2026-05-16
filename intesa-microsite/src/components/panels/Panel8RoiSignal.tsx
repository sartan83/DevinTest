"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 8 — From SDLC ambition to upside potential.
 *
 * Executive ROI section, rebuilt to explain how Devin contributes
 * to Intesa's official 15% / €70M SDLC efficiency ambition — and
 * what an upside trajectory above it would require.
 *
 * Layout, top to bottom:
 *   1. Header — headline + subline + "Implied model" pill.
 *   2. Hero — four large numbers (15% / ~€70M / 70% / ~21%) on
 *      a 2×2 grid. The 70% number carries a small 43% + 27%
 *      segmented bar. The ~21% number is the new ROI math anchor.
 *   3. Implied-model strip — ~€467M baseline and ~€327M execution
 *      zone, both labelled as derived figures.
 *   4. Formula — visible single line, with "after review and
 *      rework" as the explicit correction.
 *   5. Leverage stages — five compact cards (Code transformation
 *      · Test generation · Remediation · PR-ready packaging ·
 *      Review acceleration).
 *   6. Scenario ladder — four trajectories across the €327M
 *      execution zone (~€33M · ~€70M target · ~€82M · ~€98M).
 *   7. Pilot evidence row — operational signals.
 *   8. Closing line + governance reframe + small model-notes drawer.
 *
 * Designed to read in 10 seconds as a hero, then to support a
 * live talk track without forcing the presenter to read text aloud.
 */
export function Panel8RoiSignal() {
  const p = intesa.panel8;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Header — headline + subline + "Implied model" pill */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="flex flex-col gap-2 sm:gap-2.5">
            <PanelHeadline text={p.headline} compact />
            {p.subhead && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl text-[12px] leading-relaxed text-brand-ivory/70 sm:text-[13.5px] lg:text-[14.5px]"
              >
                {p.subhead}
              </motion.p>
            )}
          </div>
          <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-brand-orange/35 bg-brand-orange/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-brand-orange-soft sm:text-[11px]">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-brand-orange-soft" />
            {p.valueStrip.label}
          </span>
        </div>

        {/* Hero — four large numbers on a 2×2 grid. The fourth one
            (~21%) makes the ROI math visible. */}
        <div className="relative overflow-hidden rounded-2xl border border-brand-ivory/12 bg-brand-green-mid/30 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,138,69,0.10),transparent_55%)]"
          />
          <div className="relative grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-4 lg:gap-7">
            {p.hero.numbers.map((n, i) => {
              const isZone = n.key === "zone";
              const isNet = n.key === "netEfficiency";
              return (
                <motion.div
                  key={n.key}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: 0.08 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-2"
                >
                  <span
                    className={[
                      "font-display font-semibold leading-[0.92] tracking-tight",
                      "text-[44px] sm:text-[56px] lg:text-[68px]",
                      isZone
                        ? "text-brand-ivory"
                        : isNet
                        ? "text-brand-orange"
                        : "text-brand-orange-soft",
                    ].join(" ")}
                  >
                    {n.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-ivory/65 sm:text-[10.5px]">
                    {n.label}
                  </span>

                  {/* 43% + 27% segmented bar beneath the 70% number */}
                  {isZone && (
                    <div className="mt-1 flex flex-col gap-1.5">
                      <div
                        className="flex h-2 w-full overflow-hidden rounded-full border border-brand-orange/35 bg-brand-green-deep/70"
                        aria-hidden
                      >
                        <motion.span
                          initial={{ width: 0 }}
                          whileInView={{ width: "61.4%" }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="bg-gradient-to-r from-brand-orange/90 to-brand-orange/55"
                        />
                        <motion.span
                          initial={{ width: 0 }}
                          whileInView={{ width: "38.6%" }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="bg-gradient-to-r from-brand-orange/45 to-brand-orange/22"
                        />
                      </div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-[10px] uppercase tracking-[0.18em] text-brand-ivory/60">
                        {p.hero.executionZone.parts.map((part) => (
                          <span key={part.label} className="flex items-baseline gap-1.5">
                            <span className="font-display text-[12px] font-semibold tracking-tight text-brand-ivory">
                              {part.value}
                            </span>
                            <span>{part.label}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Implied-model strip + Formula — two-column row on lg.
            Left: two derived figures. Right: the ROI formula with
            the "after review and rework" emphasis. */}
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr] lg:gap-4">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {p.valueStrip.blocks.map((b, i) => (
              <motion.div
                key={b.key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-1.5 rounded-xl border border-brand-ivory/12 bg-brand-green-mid/25 p-3 sm:p-3.5"
              >
                <span className="font-display text-[22px] font-semibold leading-tight tracking-tight text-brand-ivory sm:text-[26px] lg:text-[30px]">
                  {b.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-ivory/70 sm:text-[10.5px]">
                  {b.label}
                </span>
                <span className="text-[10.5px] italic leading-snug text-brand-ivory/50 sm:text-[11px]">
                  {b.note}
                </span>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center gap-2 rounded-xl border border-brand-orange/25 bg-brand-orange/[0.04] p-3 sm:p-3.5"
          >
            <span className="text-[10px] uppercase tracking-[0.22em] text-brand-orange-soft sm:text-[10.5px]">
              {p.formula.label}
            </span>
            <p className="font-display text-[13px] leading-snug text-brand-ivory/90 sm:text-[14.5px] lg:text-[15.5px]">
              ROI contribution = addressable SDLC execution effort × workflow
              applicability × adoption ×{" "}
              <span className="text-brand-orange-soft">net efficiency after review and rework</span>
            </p>
          </motion.div>
        </div>

        {/* Leverage stages — five compact cards. */}
        <div className="flex flex-col gap-2.5 border-t border-brand-ivory/10 pt-4 sm:gap-3">
          <span className="text-[10px] uppercase tracking-[0.26em] text-brand-ivory/55 sm:text-[11px]">
            {p.leverageStages.label}
          </span>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {p.leverageStages.items.map((stage, i) => (
              <motion.div
                key={stage.key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.06 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-1 rounded-lg border border-brand-ivory/10 bg-brand-green-mid/25 px-2.5 py-2 sm:px-3 sm:py-2.5"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange-soft"
                  />
                  <span className="text-[10px] uppercase tracking-[0.18em] text-brand-orange-soft/90 sm:text-[10.5px]">
                    0{i + 1}
                  </span>
                </div>
                <span className="font-display text-[13px] font-medium leading-tight text-brand-ivory sm:text-[14px]">
                  {stage.title}
                </span>
                <span className="text-[10.5px] italic leading-snug text-brand-ivory/55 sm:text-[11px]">
                  {stage.note}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scenario ladder — four trajectories across the €327M zone. */}
        <div className="flex flex-col gap-2.5 border-t border-brand-ivory/10 pt-4 sm:gap-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.26em] text-brand-ivory/55 sm:text-[11px]">
              {p.scenarioLadder.label}
            </span>
            <span className="text-[10px] italic text-brand-ivory/50 sm:text-[10.5px]">
              {p.scenarioLadder.caption}
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {p.scenarioLadder.scenarios.map((s, i) => {
              const isTarget = s.tone === "target";
              const isUpside = s.tone === "upside" || s.tone === "highUpside";
              return (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={[
                    "relative flex flex-col gap-1.5 overflow-hidden rounded-xl border p-3 sm:p-3.5",
                    isTarget
                      ? "border-brand-orange/45 bg-devin-gradient-soft bg-brand-green-mid/40 shadow-elev"
                      : isUpside
                      ? "border-brand-orange/25 bg-brand-orange/[0.03]"
                      : "border-brand-ivory/12 bg-brand-green-mid/25",
                  ].join(" ")}
                >
                  {isTarget && (
                    <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-brand-orange/15 px-2 py-0.5 text-[8.5px] uppercase tracking-[0.22em] text-brand-orange-soft">
                      <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-brand-orange-soft" />
                      Target line
                    </span>
                  )}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-ivory/60 sm:text-[10.5px]">
                    {s.title}
                  </span>
                  <span
                    className={[
                      "font-display font-semibold leading-tight tracking-tight",
                      "text-[26px] sm:text-[30px] lg:text-[34px]",
                      isTarget ? "text-brand-orange-soft" : "text-brand-ivory",
                    ].join(" ")}
                  >
                    {s.value}
                  </span>
                  <span className="text-[10.5px] italic text-brand-ivory/55 sm:text-[11px]">
                    {s.efficiency} net efficiency on execution zone
                  </span>
                </motion.div>
              );
            })}
          </div>
          <ul className="flex flex-col gap-1 pt-1 text-[10.5px] italic leading-snug text-brand-ivory/50 sm:text-[11px]">
            {p.scenarioLadder.disclaimers.map((d) => (
              <li key={d} className="flex items-start gap-1.5">
                <span aria-hidden className="mt-[7px] inline-block h-[3px] w-[3px] shrink-0 rounded-full bg-brand-ivory/30" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pilot evidence row — operational metrics that test the
            credibility of the scenarios. */}
        <div className="flex flex-col gap-2 border-t border-brand-ivory/10 pt-4">
          <span className="text-[10px] uppercase tracking-[0.26em] text-brand-ivory/55 sm:text-[11px]">
            {p.pilotProof.label}
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {p.pilotProof.items.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.04 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-brand-ivory/12 bg-brand-green-mid/30 px-2.5 py-1 text-[10.5px] font-medium tracking-tight text-brand-ivory/85 sm:text-[11.5px]"
              >
                <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-brand-orange-soft/85" />
                {item}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Closing line — the executive frame for the entire section. */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-[12.5px] italic leading-relaxed text-brand-ivory/75 sm:text-[13.5px] lg:text-[14.5px]"
        >
          {p.closing}
        </motion.p>

        {/* Governance rail + collapsible model notes — secondary. */}
        <div className="flex flex-col gap-2 border-t border-brand-ivory/10 pt-3">
          <span className="text-[10px] uppercase tracking-[0.26em] text-brand-orange-soft/85 sm:text-[10.5px]">
            {p.redeploymentNote}
          </span>
          <details className="group text-[11px] text-brand-ivory/55 sm:text-[12px]">
            <summary className="cursor-pointer list-none select-none text-[10px] uppercase tracking-[0.22em] text-brand-ivory/45 transition hover:text-brand-ivory/70 sm:text-[10.5px]">
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden className="transition group-open:rotate-90">›</span>
                Model notes
              </span>
            </summary>
            <div className="mt-2 flex flex-col gap-1.5 leading-snug">
              <p className="italic">{p.derivationNote}</p>
              <ul className="mt-1 flex flex-col gap-0.5 text-brand-ivory/45">
                {p.sources.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
              <p className="mt-1 italic text-brand-ivory/40">{p.disclaimer}</p>
            </div>
          </details>
        </div>
      </div>
    </PanelShell>
  );
}
