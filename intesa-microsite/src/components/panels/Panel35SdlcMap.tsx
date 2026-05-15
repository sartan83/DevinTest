"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * SDLC Execution Map — "Where the SDLC effort concentrates".
 *
 * North-star section anchoring the entire business case on Intesa's
 * own SDLC effort distribution. The 70% execution zone (43% coding +
 * 27% testing/release) is the visual hero of the entire microsite.
 *
 * Rendered as:
 *   - Hero metric (70%) + supporting line
 *   - Premium horizontal stacked bar with 5 segments (17/8/5/43/27).
 *     Requirements / functional / technical analysis stay visually
 *     quiet (muted ivory). Coding + testing/release glow as the
 *     execution zone (orange gradient + halo).
 *   - Bracket label "70% execution zone" anchored over the two
 *     prominent segments.
 *   - Devin relevance italic line + source rail at the bottom.
 *
 * Premium, cinematic, executive — NOT a chart dump. The geometry
 * sells the insight: the right two thirds of the SDLC light up.
 */
export function Panel35SdlcMap() {
  const p = intesa.panelSdlcMap;
  const total = p.distribution.reduce((acc, d) => acc + d.value, 0);

  // Compute the start/end percentage of the execution zone (coding +
  // testing) so the bracket label can sit precisely above the
  // highlighted segments.
  let cursor = 0;
  const segments = p.distribution.map((d) => {
    const start = cursor;
    cursor += (d.value / total) * 100;
    return { ...d, start, end: cursor, widthPct: (d.value / total) * 100 };
  });
  const zoneStart = segments.find((s) => s.key === "coding")!.start;
  const zoneEnd = segments.find((s) => s.key === "testing")!.end;
  const zoneWidth = zoneEnd - zoneStart;

  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex h-full flex-col justify-center gap-6 sm:gap-8 lg:gap-10">
        {/* Headline + subhead */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <PanelHeadline text={p.headline} compact />
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-[12.5px] leading-relaxed text-brand-ivory/70 sm:text-[14px] lg:text-[15px]"
          >
            {p.subhead}
          </motion.p>
        </div>

        {/* Hero metric — 70% of SDLC effort */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
        >
          <span
            className="font-display font-semibold leading-[0.9] tracking-tight text-[88px] sm:text-[120px] lg:text-[148px]"
            style={{ color: "rgba(243,111,33,0.95)" }}
          >
            {p.heroMetric.value}
          </span>
          <span className="max-w-md text-[12.5px] uppercase tracking-[0.22em] text-brand-ivory/80 sm:text-[14px] lg:text-[15px]">
            {p.heroMetric.label}
          </span>
        </motion.div>

        {/* Cinematic horizontal stacked bar.
            ─────────────────────────────────────────────────────────
            Five proportional segments. The two prominent ones share
            an orange gradient and emit a soft halo above them. The
            three quieter ones stay in muted ivory tones. */}
        <div className="relative w-full">
          {/* Bracket label rail above the bar — "70% execution zone"
              anchored over the coding + testing/release segments. */}
          <div className="relative mb-3 h-10 sm:mb-4 sm:h-12">
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 flex flex-col items-center gap-1"
              style={{
                left: `${zoneStart}%`,
                width: `${zoneWidth}%`,
              }}
            >
              <div className="flex w-full items-center gap-1.5">
                <span
                  aria-hidden
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(243,111,33,0.85) 0%, rgba(243,111,33,0.35) 100%)",
                  }}
                />
                <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[11px]">
                  {p.zoneLabel}
                </span>
                <span
                  aria-hidden
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(243,111,33,0.35) 0%, rgba(243,111,33,0.85) 100%)",
                  }}
                />
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-brand-ivory/60 sm:text-[11px]">
                {p.zoneSubLabel}
              </div>
              {/* Down ticks */}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-2 w-px bg-brand-orange/65"
              />
              <span
                aria-hidden
                className="absolute -bottom-1 right-0 h-2 w-px bg-brand-orange/65"
              />
            </motion.div>
          </div>

          {/* The bar itself */}
          <div className="relative flex h-14 w-full overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-deep/55 sm:h-16 lg:h-20">
            {segments.map((s, i) => {
              const isProminent = s.prominent;
              return (
                <motion.div
                  key={s.key}
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: `${s.widthPct}%`, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.25 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={[
                    "relative flex h-full items-center justify-center overflow-hidden",
                    isProminent ? "" : "border-r border-brand-ivory/10 last:border-r-0",
                  ].join(" ")}
                  style={
                    isProminent
                      ? {
                          background:
                            s.key === "coding"
                              ? "linear-gradient(180deg, rgba(243,111,33,0.85) 0%, rgba(243,111,33,0.55) 100%)"
                              : "linear-gradient(180deg, rgba(243,111,33,0.55) 0%, rgba(243,111,33,0.3) 100%)",
                        }
                      : {
                          background:
                            "linear-gradient(180deg, rgba(247,244,239,0.06) 0%, rgba(247,244,239,0.02) 100%)",
                        }
                  }
                >
                  {/* Soft halo on prominent segments */}
                  {isProminent && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 0%, rgba(243,111,33,0.35) 0%, transparent 65%)",
                      }}
                    />
                  )}
                  <span
                    className={[
                      "relative z-10 font-display font-semibold leading-none tracking-tight",
                      isProminent
                        ? "text-[22px] text-brand-ivory sm:text-[28px] lg:text-[34px]"
                        : "text-[14px] text-brand-ivory/70 sm:text-[16px] lg:text-[18px]",
                    ].join(" ")}
                  >
                    {s.value}%
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Per-segment labels below */}
          <div className="relative mt-3 h-10 w-full sm:mt-4 sm:h-12">
            {segments.map((s) => (
              <motion.div
                key={`label-${s.key}`}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 flex flex-col items-center gap-0.5 px-1"
                style={{ left: `${s.start}%`, width: `${s.widthPct}%` }}
              >
                <span
                  className={[
                    "text-center text-[9px] uppercase leading-tight tracking-[0.18em] sm:text-[10.5px]",
                    s.prominent ? "text-brand-ivory/85" : "text-brand-ivory/45",
                  ].join(" ")}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Devin relevance line — subtle italic anchor */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2.5 border-t border-brand-ivory/10 pt-4 sm:pt-5"
        >
          <p className="max-w-3xl text-[12.5px] italic leading-relaxed text-brand-ivory/75 sm:text-[13.5px] lg:text-[15px]">
            {p.devinRelevance}
          </p>
          <span className="text-[10px] uppercase tracking-[0.24em] text-brand-ivory/40 sm:text-[11px]">
            {p.source}
          </span>
        </motion.div>
      </div>
    </PanelShell>
  );
}
