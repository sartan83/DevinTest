"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 4 — Current SDLC vs. SDLC with Devin.
 *
 * Two-side paradigm comparison:
 *   Current state  →  Devin execution layer  →  With Devin / Future state
 *
 * Restructured per VP feedback so the slide reads as a direct
 * "drug to the pain" frame: the LEFT side names the pain in the
 * current operating model, the CENTER transition makes the role
 * of Devin explicit ("execution layer"), and the RIGHT side
 * promotes the three hero outcomes (Scalability · Speed ·
 * Control) above five concrete outcomes that mirror the pain
 * points one-for-one. A 70% execution-zone anchor band sits
 * directly under the comparison and connects the paradigm shift
 * to Intesa's own SDLC effort distribution; two proof metrics
 * (6× / 20–30%) sit below as future-state evidence rather than
 * standalone claims.
 */
export function Panel4ExecutiveDiscovery() {
  const p = intesa.panel4;

  // Defensive defaults so the component never crashes if data
  // shape evolves.
  const current = p.current ?? {
    label: "Current state",
    caption: "Without Devin",
    subtitle: "Linear human-led SDLC execution",
    items: [] as string[],
    painLabel: "",
  };
  const withDevin = p.withDevin ?? {
    label: "With Devin",
    caption: "Future state",
    subtitle: "Parallel AI-augmented execution workstreams",
    items: [] as string[],
    outcomeLabel: "",
  };
  const bridge = p.bridge ?? {
    label: "Devin execution layer",
    sublabel: "AI-augmented execution",
  };
  const executionAnchor = p.executionAnchor;
  const proofMetrics = p.proofMetrics ?? [];

  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
        {/* Header: hero + subline. Eyebrow is rendered by the shell. */}
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <PanelHeadline text={p.headline} className="max-w-3xl" compact />
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[58ch] text-[13.5px] leading-relaxed text-brand-ivory/85 sm:text-[15px] lg:text-[16px]"
          >
            {p.subhead}
          </motion.p>
        </div>

        {/* Two-side comparison: Current state | Devin layer | With Devin.
            Mobile collapses to a single column with the transition
            inline; on lg the transition becomes a vertical pill in
            the gutter so the eye reads left → center → right in one
            sweep. */}
        <div className="relative grid gap-3 sm:gap-4 lg:grid-cols-[1fr_auto_1.1fr] lg:items-stretch">
          {/* LEFT — Current state. */}
          <SideCard
            tone="current"
            caption={current.caption}
            label={current.label}
            subtitle={current.subtitle}
            items={current.items}
            footerLabel={current.painLabel}
            footerKind="pain"
          />

          {/* CENTER — Devin execution layer transition. */}
          <CenterTransition
            label={bridge.label}
            sublabel={bridge.sublabel}
          />

          {/* RIGHT — With Devin / Future state. */}
          <SideCard
            tone="with-devin"
            caption={withDevin.caption}
            label={withDevin.label}
            subtitle={withDevin.subtitle}
            items={withDevin.items}
            footerLabel={withDevin.outcomeLabel}
            footerKind="outcome"
            outcomes={p.outcomes}
          />
        </div>

        {/* 70% execution-zone anchor band. One short line of formula
            + one short line of reason. Acts as the bridge between
            the paradigm comparison and the proof metrics below. */}
        {executionAnchor && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-1.5 rounded-xl border border-brand-ivory/10 bg-brand-green-deep/55 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-3.5"
          >
            <span className="font-display text-[14px] font-semibold leading-snug text-brand-ivory sm:text-[16px] lg:text-[17px]">
              {executionAnchor.formula}
            </span>
            <span className="text-[11.5px] leading-snug text-brand-ivory/70 sm:max-w-[52%] sm:text-[12.5px]">
              {executionAnchor.reason}
            </span>
          </motion.div>
        )}

        {/* Proof metrics row + trust line.
            Metrics are deliberately compact so they read as evidence
            of the future state, not as the page's hero numbers. */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          {proofMetrics.length > 0 && (
            <div className="flex flex-wrap items-end gap-x-6 gap-y-2 sm:gap-x-8">
              {proofMetrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.25 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col gap-0.5"
                >
                  <span className="font-display text-[22px] font-semibold leading-none text-brand-ivory sm:text-[26px] lg:text-[28px]">
                    {m.value}
                  </span>
                  <span className="text-[10.5px] uppercase tracking-[0.24em] text-brand-ivory/55 sm:text-[11px]">
                    {m.label}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          {p.trustLine && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.26em] text-brand-ivory/55 sm:text-[11px]"
            >
              <span
                aria-hidden
                className="inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange-soft/80"
              />
              <span className="leading-snug">{p.trustLine}</span>
            </motion.p>
          )}
        </div>

        {/* Optional closing punchline — guarded so the empty string
            in data does not render an orphan paragraph. */}
        {p.closing && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl border-t border-brand-ivory/10 pt-3 text-[12.5px] italic leading-snug text-brand-ivory/75 sm:text-[13.5px]"
          >
            {p.closing}
          </motion.p>
        )}
      </div>
    </PanelShell>
  );
}

/* ------------------------------------------------------------------------- */
/* Internal primitives                                                       */
/* ------------------------------------------------------------------------- */

type OutcomeWord = {
  word: string;
  label: string;
  emphasis?: "primary" | "secondary";
};

function SideCard({
  tone,
  caption,
  label,
  subtitle,
  items,
  footerLabel,
  footerKind,
  outcomes,
}: {
  tone: "current" | "with-devin";
  caption: string;
  label: string;
  subtitle?: string;
  items: string[];
  footerLabel?: string;
  footerKind: "pain" | "outcome";
  outcomes?: OutcomeWord[];
}) {
  const isWithDevin = tone === "with-devin";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "relative flex flex-col gap-3 overflow-hidden rounded-2xl border px-4 py-4 sm:gap-3.5 sm:px-5 sm:py-5",
        isWithDevin
          ? "border-brand-orange/40 bg-brand-orange/[0.05] shadow-[0_14px_40px_-24px_rgba(243,111,33,0.6)]"
          : "border-brand-ivory/12 bg-brand-green-deep/55",
      ].join(" ")}
    >
      {/* Header strip: caption + label + subtitle. */}
      <div className="flex flex-col gap-1.5 border-b border-brand-ivory/10 pb-3 sm:pb-3.5">
        <span
          className={[
            "text-[10px] uppercase tracking-[0.3em] sm:text-[10.5px]",
            isWithDevin ? "text-brand-orange" : "text-brand-ivory/55",
          ].join(" ")}
        >
          {caption}
        </span>
        <span
          className={[
            "font-display font-semibold leading-tight",
            "text-[20px] sm:text-[24px] lg:text-[28px]",
            isWithDevin ? "text-brand-ivory" : "text-brand-ivory",
          ].join(" ")}
        >
          {label}
        </span>
        {subtitle && (
          <span
            className={[
              "leading-snug",
              "text-[12px] sm:text-[13px] lg:text-[13.5px]",
              isWithDevin ? "text-brand-orange-soft" : "text-brand-ivory/65",
            ].join(" ")}
          >
            {subtitle}
          </span>
        )}
        {/* Side-specific motion strip — keeps the visual signature
            from the previous version while making linear vs.
            parallel readable at a glance. */}
        <ParadigmMotionStrip mode={isWithDevin ? "parallel" : "linear"} tone={tone} />
      </div>

      {/* Outcome hero strip — only on the With Devin side. The three
          words (Scalability · Speed · Control) sit above the bullet
          list so the right side reads as one statement, not just
          another list of features. */}
      {isWithDevin && outcomes && outcomes.length > 0 && (
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:gap-x-4">
          {outcomes.map((o, i) => (
            <div key={o.word} className="flex items-baseline gap-2">
              {i > 0 && (
                <span
                  aria-hidden
                  className="text-[14px] font-light text-brand-orange/45 sm:text-[16px]"
                >
                  ·
                </span>
              )}
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display text-[22px] font-semibold leading-none tracking-tight text-brand-ivory sm:text-[28px] lg:text-[32px]"
              >
                {o.word}
              </motion.span>
            </div>
          ))}
        </div>
      )}

      {/* Bullet list — pain points on the left, outcomes on the
          right. Larger row spacing than the prior version so each
          line is easier to scan from the panel. */}
      <ul className="flex flex-col gap-2 sm:gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className={[
              "flex items-start gap-2.5 leading-snug",
              "text-[12.5px] sm:text-[13.5px] lg:text-[14.5px]",
              isWithDevin ? "text-brand-ivory" : "text-brand-ivory/82",
            ].join(" ")}
          >
            <span
              aria-hidden
              className={[
                "mt-[6px] inline-block h-1 w-1 shrink-0 rounded-full",
                isWithDevin ? "bg-brand-orange" : "bg-brand-ivory/40",
              ].join(" ")}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Footer label — pain summary on the left, outcome summary on
          the right. Renders only if the data field is set. */}
      {footerLabel && (
        <div
          className={[
            "mt-auto flex items-center gap-2 rounded-md border px-3 py-2 text-[11px] uppercase tracking-[0.22em] sm:text-[11.5px]",
            footerKind === "pain"
              ? "border-brand-ivory/12 bg-brand-ivory/[0.03] text-brand-ivory/65"
              : "border-brand-orange/40 bg-brand-orange/[0.08] text-brand-orange",
          ].join(" ")}
        >
          <span
            aria-hidden
            className={[
              "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
              footerKind === "pain" ? "bg-brand-ivory/40" : "bg-brand-orange",
            ].join(" ")}
          />
          <span className="leading-snug">{footerLabel}</span>
        </div>
      )}
    </motion.div>
  );
}

/* Center transition column. On lg this is a vertical pill in the
 * gutter between the two sides; on smaller screens it collapses to
 * a horizontal chip with a forward arrow. */
function CenterTransition({
  label,
  sublabel,
}: {
  label: string;
  sublabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-center"
    >
      {/* Mobile / sm horizontal chip. */}
      <div className="flex w-full items-center gap-2 rounded-full border border-brand-orange/35 bg-brand-orange/[0.06] px-3 py-2 lg:hidden">
        <svg
          width="18"
          height="14"
          viewBox="0 0 24 18"
          fill="none"
          aria-hidden
          className="shrink-0 text-brand-orange"
        >
          <path d="M3 9 H20" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M14 3 L20 9 L14 15"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
          />
        </svg>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.28em] text-brand-orange sm:text-[10.5px]">
            {label}
          </span>
          {sublabel && (
            <span className="text-[10.5px] leading-snug text-brand-ivory/65 sm:text-[11.5px]">
              {sublabel}
            </span>
          )}
        </div>
      </div>

      {/* Desktop vertical pill. */}
      <div className="relative hidden h-full w-[140px] flex-col items-center justify-between gap-3 px-2 py-1 lg:flex">
        <FlowChevron direction="up" />
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="font-display text-[13px] font-semibold leading-tight text-brand-orange sm:text-[14px]">
            {label}
          </span>
          {sublabel && (
            <span className="max-w-[120px] text-[10.5px] uppercase tracking-[0.22em] leading-snug text-brand-ivory/55 sm:text-[11px]">
              {sublabel}
            </span>
          )}
        </div>
        <FlowChevron direction="down" />
      </div>
    </motion.div>
  );
}

function FlowChevron({ direction }: { direction: "up" | "down" }) {
  // Two short orange arrows pointing toward the center label make
  // the "current → Devin layer → future" reading explicit without
  // overpowering the columns either side.
  const rotation = direction === "up" ? "rotate-180" : "rotate-0";
  return (
    <svg
      width="22"
      height="40"
      viewBox="0 0 22 40"
      fill="none"
      aria-hidden
      className={`shrink-0 text-brand-orange ${rotation}`}
    >
      <path d="M11 2 V32" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 26 L11 34 L18 26"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  );
}

/* Small motion strip under each side header. Communicates the
 * paradigm at a glance: linear (single thin line moving slowly) for
 * the current state, parallel (three offset lines streaming
 * through) for the With Devin side. */
function ParadigmMotionStrip({
  mode,
  tone,
}: {
  mode: "linear" | "parallel";
  tone: "current" | "with-devin";
}) {
  const isWithDevin = tone === "with-devin";
  const accent = isWithDevin ? "bg-brand-orange" : "bg-brand-ivory/35";
  const track = isWithDevin ? "bg-brand-orange/15" : "bg-brand-ivory/8";

  if (mode === "linear") {
    return (
      <div
        aria-hidden
        className={`relative mt-1 h-[3px] w-full overflow-hidden rounded-full ${track}`}
      >
        <motion.span
          className={`absolute inset-y-0 left-0 w-1/3 rounded-full ${accent}`}
          initial={{ x: "-100%" }}
          whileInView={{ x: "260%" }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 4.4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden className="mt-1 flex flex-col gap-[3px]">
      {[0, 1, 2].map((row) => (
        <div
          key={row}
          className={`relative h-[3px] w-full overflow-hidden rounded-full ${track}`}
        >
          <motion.span
            className={`absolute inset-y-0 left-0 w-1/2 rounded-full ${accent}`}
            initial={{ x: "-110%" }}
            whileInView={{ x: "220%" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: row * 0.25,
            }}
          />
        </div>
      ))}
    </div>
  );
}
