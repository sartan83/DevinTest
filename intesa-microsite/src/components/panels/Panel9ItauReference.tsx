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
  const metrics = itau.proofMetrics;

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

            {/* RIGHT — five official Itaú proof tiles in a clean
                grid: 6× faster (.NET → Java), 5× faster (SQL),
                5× lower cost (.NET → Java), 300,000+ repos
                documented, 75% adoption. */}
            <div className="flex flex-col gap-4 px-5 py-5 sm:gap-5 sm:px-6 sm:py-6">
              <div className="grid auto-rows-fr grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-5">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.08 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex min-w-0 flex-col gap-1 rounded-xl border bg-brand-green-deep/40 px-3 py-3 sm:px-3.5 sm:py-3.5 lg:gap-1.5 lg:px-3 lg:py-3"
                    style={{ borderColor: `${ITAU_ORANGE}33` }}
                  >
                    {/* Value + suffix stack. On lg the tile is narrow
                        (1/5 of width) so we keep value on its own
                        line and let suffix sit just under it to
                        avoid overflow on wide values like "300,000+". */}
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="block font-display font-semibold leading-[1] tracking-tight text-[26px] sm:text-[30px] lg:text-[28px] xl:text-[32px]"
                        style={{ color: `${ITAU_ORANGE}ee` }}
                      >
                        {m.value}
                      </span>
                      {m.suffix && (
                        <span className="text-[10.5px] uppercase tracking-[0.16em] text-brand-ivory/85 sm:text-[11px]">
                          {m.suffix}
                        </span>
                      )}
                    </div>
                    <span className="break-words text-[11px] leading-snug text-brand-ivory/85 sm:text-[12px] lg:text-[11.5px]">
                      {m.label}
                    </span>
                    {m.note && (
                      <span className="break-words text-[10px] italic leading-snug text-brand-ivory/55 sm:text-[10.5px] lg:text-[10px]">
                        {m.note}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Pattern line — one compact secondary line under
                  the proof grid. */}
              {itau.patternLine && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-2 border-l-2 pl-3 text-[12px] leading-snug text-brand-ivory/85 sm:text-[13px]"
                  style={{ borderColor: `${ITAU_ORANGE}99` }}
                >
                  {itau.patternLine}
                </motion.p>
              )}

              {/* Capacity-shift footer + source link row. */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                {itau.capacityShift && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-2xl text-[10.5px] italic leading-snug text-brand-ivory/55 sm:text-[11px]"
                  >
                    {itau.capacityShift}
                  </motion.p>
                )}
                <a
                  href={itau.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 self-start text-[10px] leading-relaxed text-brand-ivory/50 underline decoration-brand-ivory/20 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60 sm:self-end sm:text-[10.5px]"
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
