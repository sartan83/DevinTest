"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 8 — ROI / Upside Potential.
 *
 * Restored calculation spine. Structure, top to bottom:
 *   1. Header — hero statement + supporting line.
 *   2. Hero numbers — 15% / ~€70M / 70% / ~21%.
 *   3. Calculation spine — 3 explicit derivation steps, visible.
 *   4. Formula — ROI contribution = … × net efficiency after review and rework.
 *   5. Scenario ladder — 4 horizontal points (~€33M / ~€70M / ~€82M / ~€98M).
 *   6. Leverage path — tiny inline phrase.
 *   7. Pilot evidence chips.
 *   8. Closing message + small disclaimer drawer.
 *
 * The math is NOT hidden in a drawer — calculation spine and formula
 * are both visible. The page reads as ambitious + defensible.
 */
export function Panel8RoiSignal() {
  const p = intesa.panel8;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex flex-col gap-3.5 sm:gap-4">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <PanelHeadline text={p.headline} compact />
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-[12px] leading-snug text-brand-ivory/70 sm:text-[13px]"
          >
            If governed AI improves net efficiency across the 70% execution zone, the path to target becomes measurable and upside becomes visible.
          </motion.p>
        </div>

        {/* Hero — four numbers on one row. */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 rounded-xl border border-brand-ivory/12 bg-brand-green-mid/25 px-3.5 py-3 sm:px-4 sm:py-3.5 lg:grid-cols-4 lg:gap-x-5">
          {p.hero.numbers.map((n, i) => {
            const isZone = n.key === "zone";
            const isNet = n.key === "netEfficiency";
            return (
              <motion.div
                key={n.key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: 0.06 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-1"
              >
                <span
                  className={[
                    "font-display font-semibold leading-[0.95] tracking-tight",
                    "text-[32px] sm:text-[40px] lg:text-[48px]",
                    isZone
                      ? "text-brand-ivory"
                      : isNet
                      ? "text-brand-orange"
                      : "text-brand-orange-soft",
                  ].join(" ")}
                >
                  {n.value}
                </span>
                <span className="text-[9.5px] uppercase tracking-[0.2em] text-brand-ivory/65 sm:text-[10.5px]">
                  {n.label}
                </span>
                {isZone && (
                  <div
                    className="mt-1 flex h-1.5 w-full overflow-hidden rounded-full border border-brand-orange/30 bg-brand-green-deep/70"
                    aria-hidden
                  >
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: "61.4%" }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-gradient-to-r from-brand-orange/90 to-brand-orange/55"
                    />
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: "38.6%" }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-gradient-to-r from-brand-orange/45 to-brand-orange/22"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Calculation spine — three explicit derivation rows.
            Each row reads as left = expression, right = result. */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-1.5 rounded-xl border border-brand-orange/25 bg-brand-orange/[0.04] px-3.5 py-3 sm:px-4 sm:py-3.5"
        >
          <span className="text-[9.5px] uppercase tracking-[0.26em] text-brand-orange-soft sm:text-[10.5px]">
            Calculation spine · implied model
          </span>
          <div className="flex flex-col gap-1 text-[11.5px] leading-snug sm:text-[12.5px]">
            <CalcRow
              expression={
                <>
                  <em className="not-italic font-semibold text-brand-ivory">€70M</em>{" "}
                  /{" "}
                  <em className="not-italic font-semibold text-brand-ivory">15%</em>
                </>
              }
              result={
                <>
                  <em className="not-italic font-semibold text-brand-orange-soft">~€467M</em>{" "}
                  <span className="text-brand-ivory/55">implied SDLC baseline</span>
                </>
              }
            />
            <CalcRow
              expression={
                <>
                  <em className="not-italic font-semibold text-brand-ivory">~€467M</em>{" "}
                  ×{" "}
                  <em className="not-italic font-semibold text-brand-ivory">70%</em>
                </>
              }
              result={
                <>
                  <em className="not-italic font-semibold text-brand-orange-soft">~€327M</em>{" "}
                  <span className="text-brand-ivory/55">execution zone</span>
                </>
              }
            />
            <CalcRow
              expression={
                <>
                  <em className="not-italic font-semibold text-brand-ivory">€70M</em>{" "}
                  /{" "}
                  <em className="not-italic font-semibold text-brand-ivory">~€327M</em>
                </>
              }
              result={
                <>
                  <em className="not-italic font-semibold text-brand-orange">~21%</em>{" "}
                  <span className="text-brand-ivory/55">net efficiency to reach target</span>
                </>
              }
              highlight
            />
          </div>
        </motion.div>

        {/* Formula — visible single line, compact. The "after review
            and rework" clause is the key correction vs. coding-speed-only. */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-1 rounded-lg border border-brand-ivory/10 bg-brand-green-mid/20 px-3.5 py-2.5 sm:px-4"
        >
          <span className="text-[9.5px] uppercase tracking-[0.26em] text-brand-ivory/55 sm:text-[10px]">
            ROI contribution formula
          </span>
          <p className="text-[11px] leading-snug text-brand-ivory/85 sm:text-[12px]">
            execution-zone effort{" "}
            <span className="text-brand-ivory/50">×</span> workflow applicability{" "}
            <span className="text-brand-ivory/50">×</span> adoption{" "}
            <span className="text-brand-ivory/50">×</span>{" "}
            <em className="not-italic font-semibold text-brand-orange-soft">net efficiency after review and rework</em>
          </p>
        </motion.div>

        {/* Scenario ladder — horizontal. */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.26em] text-brand-ivory/55 sm:text-[10.5px]">
              Scenarios across coding, testing/release and PR-ready delivery
            </span>
            <span className="text-[10px] italic text-brand-ivory/45 sm:text-[10.5px]">
              Net efficiency on ~€327M
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 lg:grid-cols-4">
            {p.scenarioLadder.scenarios.map((s, i) => {
              const isTarget = s.tone === "target";
              const isUpside = s.tone === "upside" || s.tone === "highUpside";
              return (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className={[
                    "relative flex items-baseline gap-2 rounded-lg border px-3 py-2 sm:px-3.5 sm:py-2.5",
                    isTarget
                      ? "border-brand-orange/45 bg-brand-orange/[0.08]"
                      : isUpside
                      ? "border-brand-orange/22 bg-brand-orange/[0.03]"
                      : "border-brand-ivory/12 bg-brand-green-mid/25",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "font-display font-semibold leading-none tracking-tight",
                      "text-[18px] sm:text-[20px] lg:text-[22px]",
                      isTarget ? "text-brand-orange-soft" : "text-brand-ivory",
                    ].join(" ")}
                  >
                    {s.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-brand-ivory/60 sm:text-[10.5px]">
                    {s.efficiency} net efficiency
                  </span>
                  {isTarget && (
                    <span className="absolute -top-1.5 right-2 rounded-full bg-brand-orange/20 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.2em] text-brand-orange-soft">
                      Target
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
          <p className="text-[10px] italic leading-snug text-brand-ivory/45 sm:text-[10.5px]">
            Trajectory scenarios to validate — not guaranteed savings.
          </p>
        </div>

        {/* Tiny inline leverage path. */}
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10.5px] leading-snug text-brand-ivory/65 sm:text-[11.5px]"
        >
          <span className="uppercase tracking-[0.22em] text-brand-orange-soft/85">
            Leverage path ·
          </span>{" "}
          code transformation → test generation → remediation → PR-ready packaging → review acceleration
        </motion.p>

        {/* Pilot evidence chips. */}
        <div className="flex flex-col gap-1.5 border-t border-brand-ivory/10 pt-2.5">
          <span className="text-[9.5px] uppercase tracking-[0.26em] text-brand-ivory/55 sm:text-[10.5px]">
            Operational proof from the pilot
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              "PR-ready time",
              "Review effort",
              "PR acceptance",
              "Test pass rate",
              "Rework",
              "Engineering hours redeployed",
            ].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.04 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-ivory/12 bg-brand-green-mid/25 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-brand-ivory/75 sm:text-[10.5px]"
              >
                <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-brand-orange-soft/85" />
                {item}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Closing line + small disclaimer drawer. */}
        <div className="flex flex-col gap-1.5">
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11.5px] italic leading-snug text-brand-ivory/75 sm:text-[12.5px]"
          >
            ~21% net efficiency across the execution zone reaches the official €70M ambition. 25–30% creates upside.
          </motion.p>
          <details className="group text-[10.5px] text-brand-ivory/50 sm:text-[11px]">
            <summary className="cursor-pointer list-none select-none text-[9.5px] uppercase tracking-[0.22em] text-brand-ivory/40 transition hover:text-brand-ivory/70 sm:text-[10px]">
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden className="transition group-open:rotate-90">›</span>
                Model notes
              </span>
            </summary>
            <div className="mt-1.5 flex flex-col gap-1 leading-snug">
              <p className="italic">{p.derivationNote}</p>
              <p className="italic text-brand-ivory/40">{p.disclaimer}</p>
            </div>
          </details>
        </div>
      </div>
    </PanelShell>
  );
}

function CalcRow({
  expression,
  result,
  highlight,
}: {
  expression: React.ReactNode;
  result: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "grid grid-cols-[auto_auto_1fr] items-baseline gap-2 rounded-md px-1.5 py-1 sm:gap-3",
        highlight ? "bg-brand-orange/[0.06]" : "",
      ].join(" ")}
    >
      <span className="text-brand-ivory/85">{expression}</span>
      <span aria-hidden className="text-brand-orange-soft/85">
        =
      </span>
      <span>{result}</span>
    </div>
  );
}
