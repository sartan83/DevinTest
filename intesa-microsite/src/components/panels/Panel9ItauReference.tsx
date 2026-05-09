"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 9 — Enterprise Reference · Itaú.
 *
 * Cognition reset: 5-second proof slide. 4 metric tiles + footnote
 * only. The slide is colour-shifted toward the Itaú palette
 * (Itaú orange #EC7000 + deep blue #002779) on accents, separators,
 * KPI numbers and logo framing — without abandoning the dark
 * premium executive base. Reads as an external proof chapter
 * inside the Intesa narrative.
 */
const ITAU_ORANGE = "#EC7000";
const ITAU_BLUE = "#002779";

export function Panel9ItauReference() {
  const p = intesa.panel9;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      {/* Subtle Itaú palette wash painted directly on the content
          wrapper (avoids z-index/stacking issues vs the section
          background). Keeps the dark premium base; introduces
          deep-blue + orange accents via a low-opacity radial. */}
      <div
        className="relative flex flex-col gap-5 rounded-2xl px-4 py-5 sm:gap-6 sm:px-6 sm:py-6"
        style={{
          background: `radial-gradient(circle at 85% 18%, ${ITAU_ORANGE}26 0%, transparent 45%), radial-gradient(circle at 15% 85%, ${ITAU_BLUE}3d 0%, transparent 55%)`,
        }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <PanelHeadline text={p.headline} compact />
          {p.logoSrc ? (
            <div
              className="flex items-center gap-3 self-start rounded-xl border bg-brand-green-deep/35 px-3.5 py-2.5 sm:self-center sm:px-4 sm:py-3"
              style={{ borderColor: `${ITAU_ORANGE}55` }}
            >
              <span
                className="text-[9px] uppercase tracking-[0.28em] sm:text-[10px]"
                style={{ color: `${ITAU_ORANGE}cc` }}
              >
                Reference
              </span>
              <span
                aria-hidden
                className="block h-6 w-px"
                style={{ background: `${ITAU_ORANGE}55` }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logoSrc}
                alt={p.logoAlt}
                className="h-14 w-auto sm:h-16 lg:h-20"
              />
            </div>
          ) : null}
        </div>

        {/* 4 metric tiles. KPI numbers shift to Itaú orange on a
            deep-blue tint background — section-only palette accent. */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {p.kpis.map((k, i) => (
            <motion.div
              key={k.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-2xl border p-4 sm:p-5"
              style={{
                borderColor: `${ITAU_ORANGE}33`,
                background: `linear-gradient(180deg, ${ITAU_BLUE}1a 0%, rgba(8, 36, 28, 0.55) 100%)`,
              }}
            >
              <span
                className="font-display text-3xl font-light leading-tight sm:text-4xl lg:text-[2.5rem]"
                style={{ color: ITAU_ORANGE }}
              >
                {k.metric}
              </span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.22em] text-brand-ivory/70 sm:text-[11px]">
                {k.title}
              </span>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full blur-2xl"
                style={{ background: `${ITAU_ORANGE}26` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Footnote-style row: governed-AI framing + Gartner source. */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10px] leading-relaxed text-brand-ivory/45 sm:text-[11px]">
          <span className="text-brand-ivory/70">{p.footnote}</span>
          <span style={{ color: `${ITAU_ORANGE}66` }}>·</span>
          <a
            href={p.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline decoration-brand-ivory/25 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60"
          >
            <span aria-hidden>↗</span>
            <span>{p.sourceLabel}</span>
          </a>
          <span style={{ color: `${ITAU_ORANGE}66` }}>·</span>
          <span>{p.disclaimer}</span>
        </div>
      </div>
    </PanelShell>
  );
}
