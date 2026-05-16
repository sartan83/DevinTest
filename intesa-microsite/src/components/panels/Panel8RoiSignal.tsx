"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 8 — ROI / Upside Potential.
 *
 * Cognition-style minimal page. Reads in 5 seconds:
 *   1. Hero statement (€70M is the target. The upside sits in the
 *      execution zone.)
 *   2. Subline (70% of SDLC effort sits in coding + testing/release.)
 *   3. Value arc — three large numbers: €70M / €82M / €98M
 *   4. One compact calculation line
 *   5. One short caveat
 *
 * Everything else (benchmarks, formula block, leverage path, pilot
 * evidence chips, 4-number tile, methodology drawer) is intentionally
 * removed. The page should feel bold, sparse and commercial.
 */
export function Panel8RoiSignal() {
  const p = intesa.panel8;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-7 sm:gap-9 lg:gap-10">
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <PanelHeadline text={p.headline} compact />
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12.5px] leading-snug text-brand-ivory/70 sm:text-[14px] lg:text-[15px]"
          >
            {p.subhead}
          </motion.p>
        </div>

        {/* Value arc — three large economic outcomes. The visual
            hero of the page. Each point sits in its own column;
            arrows between columns (lg only) read as a premium
            value arc, not as a chart. */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-3 sm:gap-4 lg:gap-2">
            {p.valueArc.points.map((point, i) => {
              const isTarget = point.tone === "target";
              const isHigh = point.tone === "highUpside";
              return (
                <div key={point.value} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.18 + i * 0.18,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col items-start gap-1.5 sm:items-center sm:text-center"
                  >
                    <span
                      className={[
                        "font-display font-semibold leading-[0.85] tracking-tight",
                        "text-[68px] sm:text-[88px] lg:text-[112px]",
                        isTarget
                          ? "text-brand-ivory"
                          : isHigh
                          ? "text-brand-orange"
                          : "text-brand-orange-soft",
                      ].join(" ")}
                    >
                      {point.value}
                    </span>
                    <span className="text-[10.5px] uppercase tracking-[0.32em] text-brand-ivory/70 sm:text-[11.5px] lg:text-[12px]">
                      {point.label}
                    </span>
                  </motion.div>
                  {/* Arrow between points (lg only). Drawn on the
                      right edge of the column so it visually reads
                      as a flow from this point to the next. */}
                  {i < p.valueArc.points.length - 1 && (
                    <motion.span
                      aria-hidden
                      initial={{ opacity: 0, x: -4 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.55 + i * 0.18,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="pointer-events-none absolute right-[-22px] top-[58%] hidden -translate-y-1/2 select-none text-[28px] font-light leading-none text-brand-ivory/30 sm:right-[-18px] lg:block"
                    >
                      →
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] leading-snug text-brand-ivory/55 sm:text-[12px] sm:text-center"
          >
            {p.valueArc.caption}
          </motion.p>
        </div>

        {/* Compact calculation line + caveat. Both visible but
            small — the math is there for anyone who looks; the
            page hero is the value arc above. */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-1.5 border-t border-brand-ivory/10 pt-3.5 sm:gap-2 sm:pt-4"
        >
          <p className="text-[11px] leading-snug text-brand-ivory/65 sm:text-[12.5px]">
            <span className="text-[9.5px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10px]">
              Math ·{" "}
            </span>
            {p.calcLine}
          </p>
          <p className="text-[10.5px] italic leading-snug text-brand-ivory/45 sm:text-[11.5px]">
            {p.caveat}
          </p>
        </motion.div>
      </div>
    </PanelShell>
  );
}
