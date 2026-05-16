"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 9 — Banking Proof at Scale.
 *
 * Compact premium case-study layout:
 *   LEFT  Itaú wordmark anchor + "Reference banking deployment"
 *         + small context line. Single proof anchor — NOT a logo
 *         wall.
 *   RIGHT 6× modernization-delivery hero + five secondary chips
 *         + one qualitative PR/review line.
 *
 * The Itaú anchor is the credibility frame for the section. Without
 * it the panel reads as a generic metric list — with it, the
 * outcomes are anchored to a real banking reference.
 */
const ITAU_ORANGE = "#EC7000";
const ITAU_BLUE = "#002779";

export function Panel9ItauReference() {
  const p = intesa.panel9;
  const itau = p.itau;
  // Fold the 75% adoption signal into the secondary chip row so the
  // proof reads as one tight metric cluster.
  const chips = [...itau.outcomeMetrics, ...itau.adoptionMetrics];

  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <PanelHeadline text={p.headline} compact />
          {p.sdlcInterpretation && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl text-[12px] leading-snug text-brand-ivory/70 sm:text-[13px]"
            >
              {p.sdlcInterpretation}
            </motion.p>
          )}
        </div>

        <div
          className="relative overflow-hidden rounded-2xl border"
          style={{
            borderColor: `${ITAU_ORANGE}33`,
            background: `radial-gradient(circle at 88% 18%, ${ITAU_ORANGE}1a 0%, transparent 45%), radial-gradient(circle at 12% 85%, ${ITAU_BLUE}26 0%, transparent 55%), linear-gradient(180deg, rgba(8,36,28,0.55) 0%, rgba(8,36,28,0.85) 100%)`,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
            {/* LEFT — Itaú anchor block. Wordmark logo + reference
                caption + small context line. Subtle vertical divider
                on lg. */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-3 border-b border-brand-ivory/8 px-5 py-5 sm:px-6 sm:py-6 lg:border-b-0 lg:border-r lg:border-brand-ivory/10"
            >
              <span
                className="text-[9.5px] uppercase tracking-[0.3em] sm:text-[10px]"
                style={{ color: `${ITAU_ORANGE}b3` }}
              >
                {itau.anchorCaption}
              </span>
              <div className="relative flex h-12 items-center sm:h-14">
                <Image
                  src={`/${itau.logoSrc}`}
                  alt={itau.logoAlt}
                  width={160}
                  height={56}
                  className="h-full w-auto select-none"
                  style={{
                    filter:
                      "drop-shadow(0 2px 8px rgba(236, 112, 0, 0.18))",
                  }}
                  priority={false}
                />
              </div>
              <span className="text-[11px] leading-snug text-brand-ivory/65 sm:text-[12px]">
                {itau.anchorContext}
              </span>
              <span className="mt-auto text-[10px] italic leading-snug text-brand-ivory/45 sm:text-[10.5px]">
                {itau.interpretiveFooter}
              </span>
            </motion.div>

            {/* RIGHT — metric proof cluster. 6× hero, secondary chip
                row, qualitative PR line, source. */}
            <div className="flex flex-col gap-3.5 px-5 py-5 sm:gap-4 sm:px-6 sm:py-6">
              {/* 6× hero */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
              >
                <span
                  className="font-display font-semibold leading-[0.9] tracking-tight text-[60px] sm:text-[80px] lg:text-[96px]"
                  style={{ color: `${ITAU_ORANGE}f0` }}
                >
                  {itau.heroMetric.metric}
                </span>
                <span className="max-w-xs text-[13px] uppercase tracking-[0.2em] text-brand-ivory/85 sm:text-[14px] lg:text-[15px]">
                  {itau.heroMetric.label}
                </span>
              </motion.div>

              {/* Secondary metrics — five compact chips. */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {chips.map((m, i) => (
                  <motion.span
                    key={m.label}
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.42,
                      delay: 0.06 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-flex items-baseline gap-1.5 rounded-full border bg-brand-green-mid/30 px-3 py-1 sm:gap-2 sm:px-3.5"
                    style={{ borderColor: `${ITAU_ORANGE}33` }}
                  >
                    <span
                      className="font-display text-[13px] font-semibold leading-none tracking-tight sm:text-[14px]"
                      style={{ color: `${ITAU_ORANGE}e0` }}
                    >
                      {m.metric}
                    </span>
                    <span className="text-[10.5px] uppercase tracking-[0.16em] text-brand-ivory/75 sm:text-[11px]">
                      {m.label}
                    </span>
                  </motion.span>
                ))}
                {itau.qualitativePr && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.42, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-baseline gap-1.5 rounded-full border border-brand-ivory/20 bg-brand-ivory/[0.04] px-3 py-1 sm:gap-2 sm:px-3.5"
                  >
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: `${ITAU_ORANGE}cc` }}
                    />
                    <span className="text-[10.5px] uppercase tracking-[0.16em] text-brand-ivory/85 sm:text-[11px]">
                      {itau.qualitativePr}
                    </span>
                  </motion.span>
                )}
              </div>

              {/* Source link. */}
              <div className="mt-1 flex items-center">
                <a
                  href={itau.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] leading-relaxed text-brand-ivory/50 underline decoration-brand-ivory/20 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60 sm:text-[10.5px]"
                >
                  <span aria-hidden>↗</span>
                  <span>{itau.sourceLabel}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-[10px] leading-relaxed text-brand-ivory/40 sm:text-[10.5px]">
          {p.disclaimer}
        </div>
      </div>
    </PanelShell>
  );
}
