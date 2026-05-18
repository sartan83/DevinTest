"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 4 — Current SDLC vs. SDLC with Devin.
 *
 * Rebuilt per VP feedback as an SDLC operating-model map.
 *
 * The slide reads top to bottom as:
 *   1. Eyebrow + headline (€70M target depends on how the 83%
 *      Devin-addressable SDLC flow is executed) + subline.
 *   2. End-to-end SDLC process bar — five stages grouped under
 *      Definition stages | Execution stages, with stage % visible
 *      and the addressable / core stages coloured.
 *   3. Two highlight badges flanking the bar — 83% Devin-addressable
 *      flow (broad) and 70% execution core (first pilot validation
 *      zone).
 *   4. Four Devin workstream cards under the bar, each mapped back
 *      to the SDLC stage(s) they concentrate on.
 *   5. One prioritization statement.
 *   6. Three outcome tags: Scalability · Speed · Control. The
 *      first two render slightly stronger than Control so the slide
 *      reads as an operating-model map, not a governance page.
 *
 * The visual language stays premium dark cinematic — no busy
 * connector lines, no SaaS-y arrows. Stage→workstream mapping is
 * communicated by an inline tag inside each workstream card.
 */
export function Panel4ExecutiveDiscovery() {
  const p = intesa.panel4;
  const stages = p.flow.stages;
  const totalEffort = stages.reduce((acc, s) => acc + s.value, 0);
  const definitionTotal = stages
    .filter((s) => s.group === "definition")
    .reduce((acc, s) => acc + s.value, 0);

  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex h-full flex-col gap-6 sm:gap-7 lg:gap-8">
        {/* Headline + subline */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <PanelHeadline text={p.headline} />
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-[12.5px] leading-relaxed text-brand-ivory/70 sm:text-[14px] lg:text-[15px]"
          >
            {p.subhead}
          </motion.p>
        </div>

        {/* Process map — group labels + bar + highlight badges.
            ─────────────────────────────────────────────────────────
            Two-group axis above the bar (Definition | Execution),
            a single horizontal stacked bar of five proportional
            stages below it, and two highlight badges flanking the
            map: 83% Devin-addressable flow (top-right) and 70%
            execution core (under the execution-side bracket). */}
        <div className="relative w-full">
          {/* Group axis */}
          <div
            className="relative mb-2.5 flex w-full text-[10px] uppercase tracking-[0.28em] text-brand-ivory/55 sm:mb-3 sm:text-[10.5px]"
            aria-hidden
          >
            <div
              className="relative flex items-end pb-1.5"
              style={{ width: `${(definitionTotal / totalEffort) * 100}%` }}
            >
              <span className="truncate">{p.flow.groups[0].label}</span>
              <span
                className="absolute bottom-0 right-0 h-2 w-px bg-brand-ivory/20"
                aria-hidden
              />
            </div>
            <div className="relative flex items-end pb-1.5 pl-3" style={{ flex: 1 }}>
              <span className="truncate">{p.flow.groups[1].label}</span>
            </div>
          </div>

          {/* The bar itself */}
          <div className="relative flex h-16 w-full overflow-hidden rounded-xl border border-brand-ivory/12 bg-brand-green-deep/55 sm:h-[72px] lg:h-20">
            {stages.map((s, i) => {
              const isCore = s.core;
              const isAddressable = s.addressable && !s.core;
              let background =
                "linear-gradient(180deg, rgba(247,244,239,0.05) 0%, rgba(247,244,239,0.015) 100%)";
              if (isCore) {
                background =
                  s.key === "coding"
                    ? "linear-gradient(180deg, rgba(243,111,33,0.85) 0%, rgba(243,111,33,0.55) 100%)"
                    : "linear-gradient(180deg, rgba(243,111,33,0.7) 0%, rgba(243,111,33,0.42) 100%)";
              } else if (isAddressable) {
                background =
                  "linear-gradient(180deg, rgba(243,111,33,0.34) 0%, rgba(243,111,33,0.18) 100%)";
              }
              return (
                <motion.div
                  key={s.key}
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{
                    width: `${(s.value / totalEffort) * 100}%`,
                    opacity: 1,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.25 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex h-full items-center justify-center overflow-hidden border-r border-brand-ivory/10 last:border-r-0"
                  style={{ background }}
                >
                  {isCore && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 0%, rgba(243,111,33,0.4) 0%, transparent 65%)",
                      }}
                    />
                  )}
                  <span
                    className={[
                      "relative z-10 font-display font-semibold leading-none tracking-tight",
                      isCore
                        ? "text-[22px] text-brand-ivory sm:text-[26px] lg:text-[32px]"
                        : isAddressable
                        ? "text-[16px] text-brand-ivory/95 sm:text-[20px] lg:text-[24px]"
                        : "text-[14px] text-brand-ivory/65 sm:text-[16px] lg:text-[20px]",
                    ].join(" ")}
                  >
                    {s.value}%
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Per-stage labels under the bar */}
          <div className="relative mt-2.5 flex w-full sm:mt-3">
            {stages.map((s, i) => {
              const isCore = s.core;
              const isAddressable = s.addressable && !s.core;
              return (
                <motion.div
                  key={`label-${s.key}`}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col items-center px-1 text-center"
                  style={{ width: `${(s.value / totalEffort) * 100}%` }}
                >
                  <span
                    className={[
                      "truncate text-[10px] uppercase leading-tight tracking-[0.18em] sm:text-[11px]",
                      isCore
                        ? "text-brand-ivory/95"
                        : isAddressable
                        ? "text-brand-ivory/80"
                        : "text-brand-ivory/45",
                    ].join(" ")}
                  >
                    {s.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Two highlight badges — 83% addressable + 70% execution core.
              Layout: side-by-side under the labels. Both are coloured
              orange but the core badge sits stronger (saturated border
              + halo) since it is the first pilot validation zone. */}
          <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex min-w-0 items-baseline gap-3 overflow-hidden rounded-2xl border border-brand-orange/30 px-4 py-3 sm:px-5 sm:py-3.5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(243,111,33,0.10) 0%, rgba(243,111,33,0.03) 55%, rgba(8,36,28,0.5) 100%)",
              }}
            >
              <span
                className="font-display font-semibold leading-none tracking-tight text-[32px] sm:text-[38px] lg:text-[42px]"
                style={{ color: "rgba(247,244,239,0.92)" }}
              >
                {p.flow.addressable.value}
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[10.5px] uppercase tracking-[0.24em] text-brand-orange-soft sm:text-[11.5px]">
                  {p.flow.addressable.label}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-ivory/55 sm:text-[10.5px]">
                  {p.flow.addressable.note}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.86, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex min-w-0 items-baseline gap-3 overflow-hidden rounded-2xl border border-brand-orange/55 px-4 py-3 shadow-[0_18px_42px_-26px_rgba(243,111,33,0.65)] sm:px-5 sm:py-3.5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(243,111,33,0.18) 0%, rgba(243,111,33,0.06) 55%, rgba(8,36,28,0.45) 100%)",
              }}
            >
              <span
                className="font-display font-semibold leading-none tracking-tight text-[32px] sm:text-[38px] lg:text-[42px]"
                style={{ color: "rgba(247,244,239,0.98)" }}
              >
                {p.flow.core.value}
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[10.5px] uppercase tracking-[0.24em] text-brand-orange sm:text-[11.5px]">
                  {p.flow.core.label}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-ivory/65 sm:text-[10.5px]">
                  {p.flow.core.note}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Devin workstream coverage — four cards in a 4-col grid
            (2-col on tablet, stacked on mobile). Each card carries
            a "Maps to" stage tag so the connection to the SDLC bar
            above is explicit without busy connector lines. */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-ivory/55 sm:text-[11px]">
              Devin workstream coverage
            </span>
            <span
              aria-hidden
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, rgba(247,244,239,0.18) 0%, rgba(247,244,239,0.02) 100%)",
              }}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4">
            {p.workstreams.map((w, i) => (
              <motion.div
                key={w.key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: 0.95 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex min-w-0 flex-col gap-2 rounded-2xl border border-brand-ivory/12 bg-brand-green-deep/55 px-4 py-3.5 sm:px-4 sm:py-4"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-4 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(243,111,33,0.55) 0%, rgba(243,111,33,0.05) 100%)",
                  }}
                />
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold leading-none text-[11.5px] uppercase tracking-[0.16em] text-brand-orange-soft sm:text-[12px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/50 sm:text-[10.5px]">
                    Maps to · {w.mapsToLabel}
                  </span>
                </div>
                <p className="font-display text-[14.5px] font-medium leading-snug text-brand-ivory sm:text-[15.5px] lg:text-[16.5px]">
                  {w.title}
                </p>
                <p className="text-[12px] leading-snug text-brand-ivory/72 sm:text-[12.5px] lg:text-[13px]">
                  {w.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Prioritization line — one short sentence that ties the
            four workstreams back to the 83% / 70% anchors. */}
        {p.prioritization && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl border-l-2 border-brand-orange/60 pl-4 font-display text-[14px] italic leading-snug text-brand-ivory/88 sm:pl-5 sm:text-[15.5px] lg:text-[17px]"
          >
            {p.prioritization}
          </motion.p>
        )}

        {/* Outcome tags — Scalability / Speed / Control.
            Scalability and Speed render with primary emphasis;
            Control sits secondary (smaller, lower contrast) so
            the slide stays an operating-model map. */}
        {p.outcomes && p.outcomes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 1.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-brand-ivory/10 pt-4 sm:gap-x-7 sm:pt-5"
          >
            {p.outcomes.map((o) => {
              const isPrimary = o.emphasis === "primary";
              return (
                <div key={o.word} className="flex items-baseline gap-2">
                  <span
                    className={[
                      "font-display font-semibold leading-none tracking-tight",
                      isPrimary
                        ? "text-[24px] text-brand-ivory sm:text-[30px] lg:text-[34px]"
                        : "text-[18px] text-brand-ivory/78 sm:text-[22px] lg:text-[26px]",
                    ].join(" ")}
                  >
                    {o.word}
                  </span>
                  <span
                    className={[
                      "text-[10.5px] uppercase tracking-[0.22em] sm:text-[11.5px]",
                      isPrimary
                        ? "text-brand-orange-soft"
                        : "text-brand-ivory/50",
                    ].join(" ")}
                  >
                    {o.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </PanelShell>
  );
}
