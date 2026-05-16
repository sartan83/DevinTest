"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 8 — A measured path toward the 15% SDLC efficiency ambition.
 *
 * Executive simplification:
 *   • Hero row — three large numbers (15% / ~€70M / 70%) with a
 *     subtle segmented bar showing 43% coding + 27% testing/release.
 *   • Value-logic strip — three compact blocks (~€467M implied
 *     baseline · ~€327M execution-effort zone · Pilot-validated
 *     contribution). €467M and €327M are explicitly labelled as
 *     implied / derived model numbers.
 *   • Pilot proof row — six measured signals.
 *   • Closing line — single italic executive frame.
 *   • Methodology — small collapsible drawer, secondary.
 *
 * Designed to be readable in 10 seconds without losing the
 * implied-model nuance. No scenario ranges, no dev-equivalents,
 * no McKinsey/Gartner anchors in the visible flow.
 */
export function Panel8RoiSignal() {
  const p = intesa.panel8;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-5 sm:gap-6">
        {/* Header — headline + subline + "Implied model" pill */}
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
            {p.valueStrip.label}
          </span>
        </div>

        {/* Hero — three large numbers (15% / ~€70M / 70%).
            The visual centre of the section. The 70% number carries
            a subtle segmented bar (43% + 27%) beneath it. */}
        <div className="relative overflow-hidden rounded-2xl border border-brand-ivory/12 bg-brand-green-mid/30 px-4 py-6 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,138,69,0.10),transparent_55%)]"
          />
          <div className="relative grid gap-7 sm:gap-8 lg:grid-cols-3 lg:gap-10">
            {p.hero.numbers.map((n, i) => {
              const isZone = n.key === "zone";
              return (
                <motion.div
                  key={n.key}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-3"
                >
                  <span
                    className={[
                      "font-display font-semibold leading-[0.92] tracking-tight",
                      "text-[68px] sm:text-[84px] lg:text-[104px]",
                      isZone ? "text-brand-ivory" : "text-brand-orange-soft",
                    ].join(" ")}
                  >
                    {n.value}
                  </span>
                  <span className="text-[10.5px] uppercase tracking-[0.22em] text-brand-ivory/65 sm:text-[11.5px]">
                    {n.label}
                  </span>

                  {/* 43% + 27% segmented bar beneath the 70% number */}
                  {isZone && (
                    <div className="mt-1 flex flex-col gap-2">
                      <div
                        className="flex h-2 w-full overflow-hidden rounded-full border border-brand-orange/35 bg-brand-green-deep/70 sm:h-2.5"
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
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.2em] text-brand-ivory/60 sm:text-[11px]">
                        {p.hero.executionZone.parts.map((part) => (
                          <span key={part.label} className="flex items-baseline gap-1.5">
                            <span className="font-display text-[13px] font-semibold tracking-tight text-brand-ivory sm:text-[15px]">
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

        {/* Value-logic strip — 3 compact derived-model blocks. */}
        <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
          {p.valueStrip.blocks.map((b, i) => {
            const isPilot = b.key === "pilot";
            return (
              <motion.div
                key={b.key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={[
                  "flex flex-col gap-2 rounded-xl border p-3.5 sm:p-4",
                  isPilot
                    ? "border-brand-orange/30 bg-brand-orange/[0.04]"
                    : "border-brand-ivory/12 bg-brand-green-mid/25",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-display font-semibold leading-tight tracking-tight",
                    isPilot
                      ? "whitespace-pre-line text-[18px] text-brand-orange-soft sm:text-[20px]"
                      : "text-[26px] text-brand-ivory sm:text-[30px] lg:text-[34px]",
                  ].join(" ")}
                >
                  {b.value}
                </span>
                <span className="text-[10.5px] uppercase tracking-[0.2em] text-brand-ivory/70 sm:text-[11px]">
                  {b.label}
                </span>
                <span className="text-[10.5px] italic leading-snug text-brand-ivory/50 sm:text-[11px]">
                  {b.note}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Pilot proof row — six measured signals, light chip style. */}
        <div className="flex flex-col gap-2.5 border-t border-brand-ivory/10 pt-4 sm:gap-3">
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
                transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-brand-ivory/12 bg-brand-green-mid/30 px-3 py-1.5 text-[11px] font-medium tracking-tight text-brand-ivory/85 sm:text-[12px]"
              >
                <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-brand-orange-soft/85" />
                {item}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Closing line — executive frame, italic, secondary scale. */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-[13px] italic leading-relaxed text-brand-ivory/75 sm:text-[14.5px] lg:text-[15.5px]"
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
              <p className="italic text-brand-ivory/45">{p.formula}</p>
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
