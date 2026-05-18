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
/** Helper · a single step pill inside the horizontal With-Devin
 *  flow chain. The "layer" variant renders as the orange-tinted
 *  Devin execution layer anchor; "input" / "output" / "default"
 *  share the same neutral pill treatment with subtle differences. */
function FlowStep({
  label,
  variant,
}: {
  label: string;
  variant: "input" | "layer" | "output" | "default";
}) {
  if (variant === "layer") {
    return (
      <div
        className="flex h-full min-h-[44px] items-center justify-center rounded-lg border border-brand-orange/55 px-3 py-2 text-center font-display text-[11.5px] font-semibold uppercase leading-snug tracking-[0.18em] text-brand-ivory sm:text-[12px] lg:text-[12.5px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(243,111,33,0.32) 0%, rgba(243,111,33,0.1) 100%)",
        }}
      >
        {label}
      </div>
    );
  }
  const borderClass =
    variant === "output"
      ? "border-brand-orange/40"
      : "border-brand-ivory/16";
  const textClass =
    variant === "output" ? "text-brand-ivory/92" : "text-brand-ivory/82";
  return (
    <div
      className={[
        "flex h-full min-h-[44px] items-center justify-center rounded-lg border bg-brand-green-deep/65 px-2.5 py-2 text-center text-[11px] uppercase leading-snug tracking-[0.16em] sm:text-[11.5px] lg:text-[12px]",
        borderClass,
        textClass,
      ].join(" ")}
    >
      {label}
    </div>
  );
}

/** Helper · arrow between flow steps. Renders as a downward arrow
 *  on mobile (vertical stack) and as a rightward arrow from lg
 *  upward (horizontal chain). */
function FlowArrow() {
  return (
    <span
      aria-hidden
      className="flex items-center justify-center text-brand-ivory/35 lg:px-0.5"
    >
      <span className="lg:hidden">↓</span>
      <span className="hidden lg:inline">→</span>
    </span>
  );
}

export function Panel4ExecutiveDiscovery() {
  const p = intesa.panel4;
  const stages = p.flow.stages;
  const totalEffort = stages.reduce((acc, s) => acc + s.value, 0);

  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex h-full flex-col gap-5 sm:gap-6 lg:gap-7">
        {/* Headline only — subline removed per user direction. */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <PanelHeadline text={p.headline} />
        </div>

        {/* Process map — simplified 2-block SDLC bar.
            ─────────────────────────────────────────────────────────
            Per user direction the bar collapses the 5-stage split
            into two readable blocks while preserving the same
            footprint:
              - 17% Requirements (muted, left)
              - 83% Near-term ROI zone (saturated orange anchor,
                right) — visually dominant, with the underlying
                stage breakdown rendered as a smaller secondary
                line inside the block.
            The previous group axis (Definition / Execution) and
            the bracket beneath the bar are retired; the two
            blocks carry the read on their own. */}
        <div className="relative w-full">
          <div className="relative flex h-[80px] w-full overflow-hidden rounded-xl border border-brand-ivory/12 bg-brand-green-deep/55 sm:h-[96px] lg:h-[112px]">
            {/* Requirements block (17%) — kept muted so the eye
                immediately lands on the 83% anchor on the right. */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{
                width: `${((stages[0]?.value ?? 0) / totalEffort) * 100}%`,
                opacity: 1,
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full shrink-0 flex-col items-center justify-center overflow-hidden border-r border-brand-ivory/10 px-2"
              style={{
                background:
                  "linear-gradient(180deg, rgba(247,244,239,0.05) 0%, rgba(247,244,239,0.015) 100%)",
              }}
            >
              <span className="relative z-10 font-display font-semibold leading-none tracking-tight text-[18px] text-brand-ivory/85 sm:text-[22px] lg:text-[26px]">
                {stages[0]?.value ?? 17}%
              </span>
              <span className="relative z-10 mt-1 text-center font-medium uppercase leading-tight tracking-[0.16em] text-[9px] text-brand-ivory/70 sm:mt-1.5 sm:text-[10.5px] lg:text-[11.5px]">
                Requirements
              </span>
            </motion.div>

            {/* Near-term ROI zone (83%) — visual anchor of the
                slide. Saturated-orange gradient + halo, with the
                stage breakdown as a smaller secondary line. */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{
                width: `${(1 - (stages[0]?.value ?? 17) / totalEffort) * 100}%`,
                opacity: 1,
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full flex-col items-center justify-center overflow-hidden px-3 sm:px-4"
              style={{
                background:
                  "linear-gradient(180deg, rgba(243,111,33,0.85) 0%, rgba(243,111,33,0.55) 100%)",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(243,111,33,0.4) 0%, transparent 65%)",
                }}
              />
              <span className="relative z-10 font-display font-semibold leading-none tracking-tight text-[26px] text-brand-ivory sm:text-[34px] lg:text-[42px]">
                83%
              </span>
              <span className="relative z-10 mt-1 text-center font-display font-medium uppercase leading-tight tracking-[0.22em] text-[10.5px] text-brand-ivory sm:mt-1.5 sm:text-[12.5px] lg:text-[14px]">
                Near-term ROI zone
              </span>
              <span className="relative z-10 mt-1 hidden text-center text-[10px] uppercase leading-tight tracking-[0.18em] text-brand-ivory/80 sm:mt-1.5 sm:inline-block sm:text-[10.5px] lg:text-[11.5px]">
                8% Functional · 5% Technical · 43% Coding · 27% Testing / Release
              </span>
            </motion.div>
          </div>
        </div>

        {/* With-Devin flow — horizontal end-to-end execution chain.
            Reads left-to-right on desktop, stacks vertically on
            mobile. Five steps with arrows between them:
              Requirements → Devin execution layer →
              [parallel coding + testing lanes stacked in one cell]
              → PR-ready output → Human review.
            Both lane groups render at equal visual weight so the
            slide cannot be read as "Devin parallelizes coding
            only". The current-flow box was retired per user
            direction — the horizontal layout keeps the slide
            compact while preserving the parallel lanes story. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-brand-orange/35 px-4 py-3.5 shadow-[0_24px_60px_-32px_rgba(243,111,33,0.55)] sm:px-5 sm:py-4 lg:gap-3.5"
          style={{
            background:
              "linear-gradient(150deg, rgba(243,111,33,0.10) 0%, rgba(243,111,33,0.03) 45%, rgba(8,36,28,0.55) 100%)",
          }}
        >
          <span
            aria-hidden
            className="absolute inset-x-5 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(243,111,33,0.7) 0%, rgba(243,111,33,0.05) 100%)",
            }}
          />

          <div className="flex items-baseline justify-between gap-2">
            <span className="font-display text-[14.5px] font-medium tracking-tight text-brand-ivory sm:text-[16px] lg:text-[17px]">
              {p.withDevinFlow.label}
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-brand-orange-soft sm:text-[10.5px] lg:text-[11px]">
              {p.withDevinFlow.caption}
            </span>
          </div>

          {/* Horizontal chain. On mobile this stacks; from lg up it
              becomes a real left-to-right flow. The middle Lanes
              cell is wider than the others so the two stacked lane
              boxes can breathe. */}
          <div className="grid items-stretch gap-2.5 sm:gap-3 lg:grid-cols-[0.85fr_auto_1fr_auto_2.05fr_auto_1fr_auto_0.85fr] lg:items-stretch lg:gap-3">
            {/* 1 · Requirements */}
            <FlowStep
              label={p.withDevinFlow.input}
              variant="input"
            />
            <FlowArrow />

            {/* 2 · Devin execution layer (anchor) */}
            <FlowStep
              label={p.withDevinFlow.layer}
              variant="layer"
            />
            <FlowArrow />

            {/* 3 · Parallel lanes — coding + testing/release.
                Lane title is now sentence-case display type for
                stronger contrast; pills bumped to text-[12/12.5px]
                for legibility. */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {p.withDevinFlow.lanes.map((lane) => (
                <div
                  key={lane.key}
                  className="relative flex flex-col gap-2 rounded-xl border border-brand-orange/30 bg-brand-green-deep/55 px-3.5 py-2.5 sm:px-4 sm:py-3"
                >
                  <span className="font-display text-[12.5px] font-medium leading-snug tracking-tight text-brand-ivory sm:text-[13.5px] lg:text-[14.5px]">
                    {lane.title}
                  </span>
                  <div className="flex flex-wrap gap-x-1.5 gap-y-1">
                    {lane.items.map((item) => (
                      <span
                        key={item}
                        className="inline-block whitespace-nowrap rounded-md border border-brand-ivory/16 bg-brand-green-deep/70 px-2.5 py-1 text-[12px] leading-snug text-brand-ivory/92 sm:text-[12.5px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <FlowArrow />

            {/* 4 · PR-ready output */}
            <FlowStep
              label={p.withDevinFlow.output}
              variant="output"
            />
            <FlowArrow />

            {/* 5 · Human review */}
            <FlowStep
              label={p.withDevinFlow.review}
              variant="default"
            />
          </div>

          {/* Three bullets — inline horizontal row on lg with bullet
              separators so the strip stays single-line. */}
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] leading-snug text-brand-ivory/82 sm:text-[12.5px] lg:text-[12.5px]">
            {p.withDevinFlow.bullets.map((b, i) => (
              <li key={b} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-1 w-1 shrink-0 rounded-full bg-brand-orange"
                />
                <span>{b}</span>
                {i < p.withDevinFlow.bullets.length - 1 && (
                  <span aria-hidden className="hidden text-brand-ivory/25 lg:inline">·</span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Key message — one emphasized sentence under the chain
            that anchors the operating-model read. */}
        {p.keyMessage ? (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 1.18, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl border-l-2 border-brand-orange/55 pl-4 font-display text-[14.5px] italic leading-snug text-brand-ivory/92 sm:pl-5 sm:text-[16px] lg:text-[17.5px]"
          >
            {p.keyMessage}
          </motion.p>
        ) : null}

        {/* Outcome strip removed per user direction. */}
      </div>
    </PanelShell>
  );
}
