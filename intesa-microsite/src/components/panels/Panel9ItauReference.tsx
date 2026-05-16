"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 9 — Banking Proof at Scale (Itaú, Gartner-validated).
 *
 * Compact proof slide. One primary metric (6×), five secondary
 * metrics as chips, one interpretation line, one small source
 * link. Reduced ~45% in height vs. the prior layout — no
 * letterhead logo block, no adoption section header, no large
 * tile grid.
 */
const ITAU_ORANGE = "#EC7000";
const ITAU_BLUE = "#002779";

export function Panel9ItauReference() {
  const p = intesa.panel9;
  const itau = p.itau;
  // Fold the 75% engineering-adoption signal into the secondary
  // chip row so the section reads as one tier, not two.
  const chips = [...itau.outcomeMetrics, ...itau.adoptionMetrics];
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-4 sm:gap-5">
        <PanelHeadline text={p.headline} compact />

        <div
          className="relative flex flex-col gap-3.5 overflow-hidden rounded-2xl border px-4 py-4 sm:gap-4 sm:px-5 sm:py-5"
          style={{
            borderColor: `${ITAU_ORANGE}26`,
            background: `radial-gradient(circle at 85% 18%, ${ITAU_ORANGE}1c 0%, transparent 45%), radial-gradient(circle at 15% 85%, ${ITAU_BLUE}26 0%, transparent 55%)`,
          }}
        >
          {/* Header — small Itaú · Gartner caption only. No logo
              block, no Reference badge — keeps the panel compact. */}
          <span
            className="text-[10px] uppercase tracking-[0.28em] sm:text-[10.5px]"
            style={{ color: `${ITAU_ORANGE}b3` }}
          >
            Itaú · Gartner-validated banking outcomes
          </span>

          {/* Hero anchor — 6× modernization acceleration. Inline
              row, reduced typography vs. prior version. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
          >
            <span
              className="font-display font-semibold leading-[0.9] tracking-tight text-[56px] sm:text-[72px] lg:text-[88px]"
              style={{ color: `${ITAU_ORANGE}f0` }}
            >
              {itau.heroMetric.metric}
            </span>
            <span className="text-[13px] uppercase tracking-[0.2em] text-brand-ivory/85 sm:text-[14px] lg:text-[15px]">
              {itau.heroMetric.label}
            </span>
          </motion.div>

          {/* Secondary metrics — five compact chips on a single
              wrapping row. Replaces the prior 4-tile grid + 1-tile
              adoption row. */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {chips.map((m, i) => (
              <motion.span
                key={m.label}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.42, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
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
          </div>

          {/* Interpretation + source — single tight row. */}
          <div
            className="flex flex-col gap-1.5 border-t pt-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:pt-3"
            style={{ borderColor: `${ITAU_ORANGE}1c` }}
          >
            {p.sdlcInterpretation && (
              <div className="text-[12px] italic leading-snug text-brand-ivory/80 sm:text-[12.5px]">
                {p.sdlcInterpretation}
              </div>
            )}
            <a
              href={itau.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-[10px] leading-relaxed text-brand-ivory/50 underline decoration-brand-ivory/20 underline-offset-4 transition-colors hover:text-brand-ivory hover:decoration-brand-ivory/60 sm:text-[10.5px]"
            >
              <span aria-hidden>↗</span>
              <span>{itau.sourceLabel}</span>
            </a>
          </div>
        </div>

        <div className="text-[10px] leading-relaxed text-brand-ivory/40 sm:text-[10.5px]">
          {p.disclaimer}
        </div>
      </div>
    </PanelShell>
  );
}
