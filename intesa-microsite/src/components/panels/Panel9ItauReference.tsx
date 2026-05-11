"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 9 — Banking Proof at Scale (Itaú + Nubank).
 *
 * Two complementary banking references on the same slide:
 *  - Itaú (primary, industrial enterprise banking scale) — two
 *    metric tiers stacked: banking-scale signals (org size +
 *    adoption) on top, execution acceleration outcomes below.
 *  - Nubank (secondary, hyperscale digital banking proof) — one
 *    hero metric + supporting metric + small footer line.
 *
 * Each card uses its own brand-accent palette as a low-opacity wash
 * (Itaú orange + deep blue · Nubank purple). Reads as focused
 * banking credibility — not a customer-logo wall, not vendor
 * marketing.
 */
const ITAU_ORANGE = "#EC7000";
const ITAU_BLUE = "#002779";
const NUBANK_PURPLE = "#820AD1";
const NUBANK_PURPLE_DEEP = "#3E1359";

type MetricEntry = { metric: string; label: string };

function ItauScaleTile({ m, i }: { m: MetricEntry; i: number }) {
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

function ItauOutcomeTile({ m, i }: { m: MetricEntry; i: number }) {
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
  const nubank = p.nubank;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-4 sm:gap-5">
        <PanelHeadline text={p.headline} compact />

        {/* ----- Itaú primary card ------------------------------------ */}
        <div
          className="relative flex flex-col gap-4 rounded-2xl px-4 py-5 sm:gap-5 sm:px-6 sm:py-6"
          style={{
            background: `radial-gradient(circle at 85% 18%, ${ITAU_ORANGE}1c 0%, transparent 45%), radial-gradient(circle at 15% 85%, ${ITAU_BLUE}30 0%, transparent 55%)`,
          }}
        >
          {/* Header: Itaú label + logo badge (no positioning prose) */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <span
              className="text-[10px] uppercase tracking-[0.28em] sm:text-[11px]"
              style={{ color: `${ITAU_ORANGE}b3` }}
            >
              Itaú · enterprise banking scale
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

          {/* Tier 1: Banking scale (4 dominant metrics) */}
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {itau.scaleMetrics.map((m, i) => (
              <ItauScaleTile key={m.label} m={m} i={i} />
            ))}
          </div>

          {/* Tier 2: Execution acceleration outcomes (3 lighter tiles) */}
          <div className="flex flex-col gap-2.5">
            <div
              className="text-[10px] uppercase tracking-[0.28em] sm:text-[11px]"
              style={{ color: `${ITAU_ORANGE}99` }}
            >
              Execution acceleration
            </div>
            <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
              {itau.outcomeMetrics.map((m, i) => (
                <ItauOutcomeTile key={m.label} m={m} i={i} />
              ))}
            </div>
          </div>

          {/* Source link only (no extra footnote prose) */}
          <div className="text-[10px] leading-relaxed text-brand-ivory/50 sm:text-[11px]">
            <a
              href={itau.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline decoration-brand-ivory/25 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60"
            >
              <span aria-hidden>↗</span>
              <span>{itau.sourceLabel}</span>
            </a>
          </div>
        </div>

        {/* ----- Nubank secondary card -------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col gap-4 rounded-2xl border px-4 py-4 sm:px-6 sm:py-5"
          style={{
            borderColor: `${NUBANK_PURPLE}33`,
            background: `radial-gradient(circle at 90% 10%, ${NUBANK_PURPLE}1c 0%, transparent 55%), linear-gradient(180deg, ${NUBANK_PURPLE_DEEP}1a 0%, rgba(8, 36, 28, 0.55) 100%)`,
          }}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className="text-[10px] uppercase tracking-[0.28em] sm:text-[11px]"
              style={{ color: `${NUBANK_PURPLE}cc` }}
            >
              Nubank · hyperscale modernization
            </span>
            <span className="text-[12px] leading-snug text-brand-ivory/70 sm:text-[13px]">
              {nubank.positioning}
            </span>
          </div>

          <div className="grid items-end gap-4 sm:grid-cols-[1.4fr_1fr] sm:gap-8">
            <div className="flex flex-col">
              <span
                className="font-display text-[56px] font-semibold leading-[0.95] tracking-tight sm:text-[72px] lg:text-[88px]"
                style={{ color: `${NUBANK_PURPLE}e6` }}
              >
                {nubank.hero.value}
              </span>
              <span className="mt-1 text-[11px] uppercase tracking-[0.22em] text-brand-ivory/65 sm:text-[12px]">
                {nubank.hero.label}
              </span>
            </div>
            <div className="flex flex-col sm:items-end">
              <span className="font-display text-3xl font-light leading-tight text-brand-ivory sm:text-4xl">
                {nubank.supporting.value}
              </span>
              <span className="mt-1 text-[11px] uppercase tracking-[0.22em] text-brand-ivory/65 sm:text-right sm:text-[12px]">
                {nubank.supporting.label}
              </span>
            </div>
          </div>

          <div
            className="border-t pt-2.5 text-[10px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[11px]"
            style={{ borderColor: `${NUBANK_PURPLE}26` }}
          >
            {nubank.footer}
          </div>
        </motion.div>

        {/* Shared disclaimer */}
        <div className="text-[10px] leading-relaxed text-brand-ivory/40 sm:text-[11px]">
          {p.disclaimer}
        </div>
      </div>
    </PanelShell>
  );
}
