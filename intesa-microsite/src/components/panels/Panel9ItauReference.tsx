"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 9 — Banking Proof at Scale (Itaú, Gartner-validated).
 *
 * Single enterprise banking proof point. The section is intentionally
 * focused: Gartner-validated operational outcomes on top, adoption +
 * scale signals below, one small interpretive footer. No vendor logo
 * wall, no second customer card — reads as third-party validated
 * banking credibility, not a sales asset.
 *
 * Visual hierarchy:
 *   1. Hero statement
 *   2. Gartner outcome metrics (primary)
 *   3. Adoption + scale signals (secondary)
 *   4. Interpretive footer + source link
 */
const ITAU_ORANGE = "#EC7000";
const ITAU_BLUE = "#002779";

type MetricEntry = { metric: string; label: string };

function OutcomeTile({ m, i }: { m: MetricEntry; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col overflow-hidden rounded-2xl border p-4 sm:p-5"
      style={{
        borderColor: `${ITAU_ORANGE}26`,
        background: `linear-gradient(180deg, ${ITAU_BLUE}14 0%, rgba(8, 36, 28, 0.55) 100%)`,
      }}
    >
      <span
        className="font-display text-4xl font-light leading-[1.02] sm:text-5xl lg:text-[3.25rem]"
        style={{ color: `${ITAU_ORANGE}e6` }}
      >
        {m.metric}
      </span>
      <span className="mt-2 text-[10px] uppercase tracking-[0.22em] text-brand-ivory/70 sm:text-[11px]">
        {m.label}
      </span>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full blur-2xl"
        style={{ background: `${ITAU_ORANGE}1c` }}
      />
    </motion.div>
  );
}

function AdoptionTile({ m, i }: { m: MetricEntry; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-xl border px-4 py-3 sm:px-5 sm:py-4"
      style={{
        borderColor: `${ITAU_ORANGE}1c`,
        background: `${ITAU_BLUE}0d`,
      }}
    >
      <span
        className="font-display text-2xl font-light leading-none sm:text-3xl"
        style={{ color: `${ITAU_ORANGE}cc` }}
      >
        {m.metric}
      </span>
      <span className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-brand-ivory/65 sm:text-[11px]">
        {m.label}
      </span>
    </motion.div>
  );
}

export function Panel9ItauReference() {
  const p = intesa.panel9;
  const itau = p.itau;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-4 sm:gap-5">
        <PanelHeadline text={p.headline} compact />

        <div
          className="relative flex flex-col gap-4 rounded-2xl px-4 py-5 sm:gap-5 sm:px-6 sm:py-6"
          style={{
            background: `radial-gradient(circle at 85% 18%, ${ITAU_ORANGE}1c 0%, transparent 45%), radial-gradient(circle at 15% 85%, ${ITAU_BLUE}30 0%, transparent 55%)`,
          }}
        >
          {/* Header: Itaú label + logo badge */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <span
              className="text-[10px] uppercase tracking-[0.28em] sm:text-[11px]"
              style={{ color: `${ITAU_ORANGE}b3` }}
            >
              Itaú · Gartner-validated banking outcomes
            </span>
            {itau.logoSrc ? (
              <div
                className="flex items-center gap-3 self-start rounded-xl border bg-brand-green-deep/35 px-3.5 py-2.5 sm:self-center sm:px-4 sm:py-3"
                style={{ borderColor: `${ITAU_ORANGE}42` }}
              >
                <span
                  className="text-[9px] uppercase tracking-[0.28em] sm:text-[10px]"
                  style={{ color: `${ITAU_ORANGE}b3` }}
                >
                  Reference
                </span>
                <span
                  aria-hidden
                  className="block h-6 w-px"
                  style={{ background: `${ITAU_ORANGE}42` }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={itau.logoSrc}
                  alt={itau.logoAlt}
                  className="h-12 w-auto sm:h-14 lg:h-16"
                />
              </div>
            ) : null}
          </div>

          {/* Hero anchor — single dominant modernization multiplier */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border px-5 py-6 sm:px-8 sm:py-7"
            style={{
              borderColor: `${ITAU_ORANGE}33`,
              background: `radial-gradient(circle at 18% 50%, ${ITAU_ORANGE}26 0%, transparent 55%), linear-gradient(180deg, ${ITAU_BLUE}1f 0%, rgba(8, 36, 28, 0.6) 100%)`,
            }}
          >
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:gap-8">
              <span
                className="font-display font-semibold leading-[0.88] tracking-tight text-[88px] sm:text-[128px] lg:text-[168px]"
                style={{ color: `${ITAU_ORANGE}f2` }}
              >
                {itau.heroMetric.metric}
              </span>
              <span className="max-w-xs text-[14px] uppercase tracking-[0.22em] text-brand-ivory/85 sm:text-[15px] lg:text-[16px]">
                {itau.heroMetric.label}
              </span>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
              style={{ background: `${ITAU_ORANGE}26` }}
            />
          </motion.div>

          {/* Tier 1 — Gartner outcomes (4 dominant tiles) */}
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {itau.outcomeMetrics.map((m, i) => (
              <OutcomeTile key={m.label} m={m} i={i} />
            ))}
          </div>

          {/* Tier 2 — Adoption + scale signals (2 compact tiles) */}
          <div className="flex flex-col gap-2.5">
            <div
              className="text-[10px] uppercase tracking-[0.28em] sm:text-[11px]"
              style={{ color: `${ITAU_ORANGE}99` }}
            >
              Adoption & scale
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
              {itau.adoptionMetrics.map((m, i) => (
                <AdoptionTile key={m.label} m={m} i={i} />
              ))}
            </div>
          </div>

          {/* Interpretive footer + source link */}
          <div className="flex flex-col gap-1.5 border-t pt-3 sm:gap-2"
            style={{ borderColor: `${ITAU_ORANGE}1c` }}
          >
            <div className="text-[11px] leading-relaxed text-brand-ivory/75 sm:text-[12px]">
              {itau.interpretiveFooter}
            </div>
            <a
              href={itau.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] leading-relaxed text-brand-ivory/50 underline decoration-brand-ivory/25 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60 sm:text-[11px]"
            >
              <span aria-hidden>↗</span>
              <span>{itau.sourceLabel}</span>
            </a>
          </div>
        </div>

        <div className="text-[10px] leading-relaxed text-brand-ivory/40 sm:text-[11px]">
          {p.disclaimer}
        </div>
      </div>
    </PanelShell>
  );
}
