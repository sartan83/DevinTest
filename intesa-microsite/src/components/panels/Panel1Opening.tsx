"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 1 — Hero / Why Intesa.
 *
 * Cognition-style reset: operational pressure first, no transformation
 * storytelling. Current-state vs target-state KPIs (64% / ~100% / €4.6B
 * / ~3,300) lead. A short tension block (legacy dependencies / remediation
 * / testing / repetitive migration work) anchors the execution bottleneck.
 * No paragraphs, no scale narrative, no investor recap.
 */
export function Panel1Opening() {
  const p = intesa.panel1;
  return (
    <PanelShell
      eyebrow={p.eyebrow}
      bg="deep"
      headerRight={
        <motion.img
          src="logos/intesa-sanpaolo.svg"
          alt="Intesa Sanpaolo"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-5 w-auto sm:h-6 lg:h-7"
        />
      }
    >
      <div className="grid items-center gap-6 sm:gap-9 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <PanelHeadline text={p.headline} />

          <p className="mt-5 max-w-xl text-[13px] font-medium leading-relaxed text-brand-ivory/85 sm:text-[15px]">
            {p.closingNarrative}
          </p>

          {/* 2029 deadline anchor — sharp visual reminder of the
             modernization milestone. Sits inline under the headline as
             an executive pressure cue. */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-5 inline-flex max-w-xs items-stretch overflow-hidden rounded-xl border border-brand-orange/30 bg-brand-green-deep/60 backdrop-blur-sm"
            data-deadline-anchor
          >
            <div aria-hidden className="w-1 bg-brand-orange" />
            <div className="flex flex-col gap-0.5 px-4 py-3 sm:px-5 sm:py-3.5">
              <span className="text-[9px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10px]">
                {p.deadline.caption}
              </span>
              <span className="font-display text-3xl font-light leading-none text-brand-ivory sm:text-4xl">
                {p.deadline.year}
              </span>
              <span className="mt-0.5 text-[11px] leading-snug text-brand-ivory/65 sm:text-[12px]">
                {p.deadline.sub}
              </span>
            </div>
            <div aria-hidden className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-brand-orange/15 blur-2xl" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_0.85fr] sm:gap-4">
          {p.kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={[
                "relative overflow-hidden rounded-xl border backdrop-blur-sm",
                k.secondary
                  ? "border-brand-ivory/8 bg-brand-green-mid/20 p-3 sm:p-3.5"
                  : "border-brand-ivory/10 bg-brand-green-mid/40 p-4 sm:p-5",
              ].join(" ")}
            >
              <div className="flex items-baseline gap-2">
                <div
                  className={[
                    "font-display font-light leading-none text-brand-ivory",
                    k.secondary ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl",
                  ].join(" ")}
                >
                  {k.value}
                </div>
                {k.estimated && (
                  <span className="rounded-full border border-brand-ivory/20 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.18em] text-brand-ivory/55">
                    est.
                  </span>
                )}
              </div>
              <div
                className={[
                  "uppercase tracking-[0.2em]",
                  k.secondary
                    ? "mt-1.5 text-[10px] text-brand-ivory/45 sm:text-[11px]"
                    : "mt-2 text-[11px] text-brand-ivory/60 sm:text-xs",
                ].join(" ")}
              >
                {k.label}
              </div>
              {!k.secondary && (
                <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-brand-orange/10 blur-2xl" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Operational tension block — Cognition-style. Replaces the
         "Why Intesa matters" scale-anchor strip with execution-first
         pressure framing. */}
      <div className="mt-5 sm:mt-7">
        <div className="mb-2 flex items-baseline gap-3">
          <span className="text-[9px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10px]">
            {p.pressure.title}
          </span>
          <span aria-hidden className="h-px flex-1 bg-brand-ivory/10" />
        </div>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 sm:gap-x-5">
          {p.pressure.bullets.map((b, i) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline gap-2 text-[12px] leading-snug text-brand-ivory/80 sm:text-[13px]"
            >
              <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-brand-orange/70" />
              <span>{b}</span>
            </motion.li>
          ))}
        </ul>
        {p.pressure.bottleneck ? (
          <p className="mt-2.5 text-[12px] italic leading-snug text-brand-ivory/70 sm:text-[13px]">
            {p.pressure.bottleneck}
          </p>
        ) : null}
      </div>

      <p className="mt-5 text-[10px] leading-snug text-brand-ivory/35 sm:mt-6 sm:text-[11px]">
        {p.sourcesLine}
      </p>
    </PanelShell>
  );
}
