"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 8 — ROI / Upside Potential.
 *
 * Minimal Cognition-style page with the math visible enough to be
 * credible. Reads in 5–8 seconds:
 *
 *   1. Hero — €70M is the target. Upside lives in the 70% execution zone.
 *   2. Subline — 70% of SDLC effort sits in coding + testing/release.
 *   3. Value arc — €70M / €82M / €98M.
 *   4. ROI logic bar — €70M / 15% → ×70% → 21–30% scenarios.
 *   5. Scenario line — 21% / 25% / 30% net efficiency → value arc.
 *   6. One caveat.
 *
 * Removed (NOT rendered here): 4-number hero tile, formula block,
 * Gartner / McKinsey benchmark cards, leverage path row, pilot
 * evidence chips, methodology drawer. Trust & Control lives in the
 * appendix.
 */
export function Panel8RoiSignal() {
  const p = intesa.panel8;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-9">
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <PanelHeadline text={p.headline} compact />
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-[12.5px] leading-snug text-brand-ivory/70 sm:text-[14px] lg:text-[15px]"
          >
            {p.subhead}
          </motion.p>
        </div>

        {/* Value arc — four large economic outcomes (target → upside →
            strong upside → high upside) across the 83% delivery zone. */}
        <div className="flex flex-col gap-3 sm:gap-3.5">
          <div className="grid grid-cols-2 items-end gap-6 sm:grid-cols-4 sm:gap-3 lg:gap-2">
            {p.valueArc.points.map((point, i) => {
              const isTarget = point.tone === "target";
              const isHigh = point.tone === "highUpside";
              const isStrong = point.tone === "strongUpside";
              return (
                <div key={point.value} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.18 + i * 0.16,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col items-start gap-1.5 sm:items-center sm:text-center"
                  >
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span
                        className={[
                          "font-display font-semibold leading-[0.85] tracking-tight",
                          "text-[44px] sm:text-[64px] lg:text-[84px]",
                          isTarget
                            ? "text-brand-ivory"
                            : isHigh
                            ? "text-brand-orange"
                            : isStrong
                            ? "text-brand-orange"
                            : "text-brand-orange-soft",
                        ].join(" ")}
                        style={
                          isStrong
                            ? { color: "rgba(243,111,33,0.82)" }
                            : undefined
                        }
                      >
                        {point.value}
                      </span>
                      {point.unit && (
                        <span className="text-[11px] font-light leading-none text-brand-ivory/55 sm:text-[12.5px] lg:text-[14px]">
                          {point.unit}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/70 sm:text-[10.5px] lg:text-[11.5px]">
                      {point.label}
                    </span>
                  </motion.div>
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
                      className="pointer-events-none absolute right-[-22px] top-[52%] hidden -translate-y-1/2 select-none text-[26px] font-light leading-none text-brand-ivory/30 sm:right-[-18px] lg:block"
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

        {/* ROI logic bar — three derivation steps. Visible and
            legible but compact. NOT a financial model. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3 border-t border-brand-ivory/10 pt-4 sm:gap-2 sm:pt-5"
        >
          <span className="text-[9.5px] uppercase tracking-[0.32em] text-brand-orange-soft/85 sm:text-[10.5px]">
            ROI logic
          </span>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-2 lg:gap-3">
            {p.logicBar.map((step, i) => (
              <div
                key={step.op}
                className="relative flex items-baseline gap-3 sm:flex-col sm:items-start sm:gap-1"
              >
                <span className="text-[9.5px] uppercase tracking-[0.28em] text-brand-ivory/40 sm:text-[10px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-display text-[18px] font-medium leading-tight text-brand-ivory sm:text-[22px] lg:text-[24px]">
                    {step.op}
                  </span>
                  <span className="text-[11px] leading-snug text-brand-ivory/65 sm:text-[12px]">
                    {step.result}
                  </span>
                </div>
                {i < p.logicBar.length - 1 && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-[-10px] top-[26%] hidden select-none text-[18px] font-light leading-none text-brand-ivory/25 sm:block"
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scenario line — thin horizontal ladder linking each net
            efficiency point back to its value arc outcome. */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5 text-[11px] text-brand-ivory/65 sm:text-[12px]"
        >
          {p.scenarioLine.map((s, i) => {
            const isTarget = s.label === "target";
            return (
              <span key={s.eff} className="flex items-baseline gap-1.5">
                <span
                  className={[
                    "font-display text-[13px] font-medium leading-none sm:text-[14px]",
                    isTarget ? "text-brand-ivory" : "text-brand-orange-soft",
                  ].join(" ")}
                >
                  {s.eff}
                </span>
                <span className="text-brand-ivory/40">→</span>
                <span className="font-display text-[13px] font-medium leading-none text-brand-ivory sm:text-[14px]">
                  {s.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/55 sm:text-[10.5px]">
                  {s.label}
                </span>
                {i < p.scenarioLine.length - 1 && (
                  <span aria-hidden className="ml-3 text-brand-ivory/20">
                    ·
                  </span>
                )}
              </span>
            );
          })}
        </motion.div>

        {/* Single caveat + pilot-link footer — sit at the very bottom. */}
        <div className="flex flex-col gap-1.5">
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10.5px] italic leading-snug text-brand-ivory/45 sm:text-[11.5px]"
          >
            {p.caveat}
          </motion.p>
          {p.pilotFooter && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 1.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10.5px] leading-snug text-brand-ivory/55 sm:text-[11.5px]"
            >
              {p.pilotFooter}
            </motion.p>
          )}
        </div>
      </div>
    </PanelShell>
  );
}
