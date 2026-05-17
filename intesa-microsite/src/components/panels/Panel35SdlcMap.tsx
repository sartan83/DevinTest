"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * SDLC Execution Map — "Devin's strongest opportunity sits in the 83%
 * SDLC delivery zone."
 *
 * Anchors the entire business case on Intesa's own SDLC effort
 * distribution. Two zones light up:
 *   - 70% core execution zone   = 43% coding + 27% testing / release
 *     (saturated orange — best pilot entry point)
 *   - +13% Devin-assisted upstream = 8% functional + 5% technical
 *     (soft orange — broader delivery zone)
 *   - 17% requirements stays muted ivory (outside the orange band)
 *
 * Total Devin-relevant zone = 83%. The hero metric becomes 83%; the
 * 70% remains as the focused pilot anchor via the bracket label.
 *
 * Visual language:
 *   - Hero metric 83% (orange, dominant).
 *   - Premium horizontal stacked bar with 5 segments (17 / 8 / 5 / 43 / 27).
 *   - Saturated orange on core segments, soft orange on assisted,
 *     muted ivory on requirements.
 *   - Bracket label "70% core execution zone" anchored over coding +
 *     testing/release.
 *   - Two callouts under the bar: 83% delivery / 70% pilot.
 *   - Closing italic line + source rail.
 */
export function Panel35SdlcMap() {
  const p = intesa.panelSdlcMap;
  const total = p.distribution.reduce((acc, d) => acc + d.value, 0);

  // Compute the start/end percentage of the core execution zone
  // (coding + testing) so the bracket label can sit precisely above
  // the saturated-orange segments.
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
      <div className="flex h-full flex-col justify-center gap-6 sm:gap-7 lg:gap-8">
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

        {/* Hero metric — 83% Devin-relevant delivery zone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
        >
          <span
            className="font-display font-semibold leading-[0.9] tracking-tight text-[80px] sm:text-[112px] lg:text-[140px]"
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
            Five proportional segments coloured by zone:
              - core      → saturated orange + halo (coding, testing)
              - assisted  → soft orange (functional, technical)
              - outside   → muted ivory (requirements)
            Bracket label rail above anchors the 70% pilot zone. */}
        <div className="relative w-full">
          {/* Bracket label rail — "70% core execution zone" over the
              coding + testing/release segments. */}
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
              const isCore = s.zone === "core";
              const isAssisted = s.zone === "assisted";
              const isOrange = isCore || isAssisted;
              let background = "linear-gradient(180deg, rgba(247,244,239,0.06) 0%, rgba(247,244,239,0.02) 100%)";
              if (isCore) {
                background =
                  s.key === "coding"
                    ? "linear-gradient(180deg, rgba(243,111,33,0.85) 0%, rgba(243,111,33,0.55) 100%)"
                    : "linear-gradient(180deg, rgba(243,111,33,0.7) 0%, rgba(243,111,33,0.42) 100%)";
              } else if (isAssisted) {
                background =
                  "linear-gradient(180deg, rgba(243,111,33,0.32) 0%, rgba(243,111,33,0.18) 100%)";
              }
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
                    isOrange ? "" : "border-r border-brand-ivory/10 last:border-r-0",
                  ].join(" ")}
                  style={{ background }}
                >
                  {/* Soft halo on core segments */}
                  {isCore && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 0%, rgba(243,111,33,0.4) 0%, transparent 65%)",
                      }}
                    />
                  )}
                  {/* Subtle inner divider between assisted and core */}
                  {isAssisted && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 right-0 w-px bg-brand-ivory/10"
                    />
                  )}
                  <span
                    className={[
                      "relative z-10 font-display font-semibold leading-none tracking-tight",
                      isCore
                        ? "text-[22px] text-brand-ivory sm:text-[28px] lg:text-[34px]"
                        : isAssisted
                        ? "text-[16px] text-brand-ivory/90 sm:text-[18px] lg:text-[22px]"
                        : "text-[14px] text-brand-ivory/70 sm:text-[16px] lg:text-[18px]",
                    ].join(" ")}
                  >
                    {s.value}%
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Per-segment labels below — label + optional sub-label */}
          <div className="relative mt-3 h-12 w-full sm:mt-4 sm:h-14">
            {segments.map((s) => {
              const isCore = s.zone === "core";
              const isAssisted = s.zone === "assisted";
              return (
                <motion.div
                  key={`label-${s.key}`}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 flex flex-col items-center gap-0.5 px-1 text-center"
                  style={{ left: `${s.start}%`, width: `${s.widthPct}%` }}
                >
                  <span
                    className={[
                      "text-[9px] uppercase leading-tight tracking-[0.18em] sm:text-[10.5px]",
                      isCore
                        ? "text-brand-ivory/90"
                        : isAssisted
                        ? "text-brand-ivory/75"
                        : "text-brand-ivory/45",
                    ].join(" ")}
                  >
                    {s.label}
                  </span>
                  {s.subLabel && (
                    <span
                      className={[
                        "text-[8.5px] uppercase leading-tight tracking-[0.22em] sm:text-[9.5px]",
                        isCore
                          ? "text-brand-orange-soft"
                          : "text-brand-orange-soft/75",
                      ].join(" ")}
                    >
                      {s.subLabel}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Two callouts — 83% delivery zone (broad) and 70% pilot zone (core) */}
        {p.callouts && p.callouts.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {p.callouts.map((c, i) => {
              const isCore = c.tone === "core";
              return (
                <motion.div
                  key={c.key}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.7 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex min-w-0 flex-col gap-1.5 overflow-hidden rounded-2xl border px-4 py-3.5 sm:px-5 sm:py-4"
                  style={{
                    borderColor: isCore
                      ? "rgba(243,111,33,0.45)"
                      : "rgba(243,111,33,0.22)",
                    background: isCore
                      ? "linear-gradient(135deg, rgba(243,111,33,0.16) 0%, rgba(243,111,33,0.06) 60%, rgba(8,36,28,0.45) 100%)"
                      : "linear-gradient(135deg, rgba(243,111,33,0.09) 0%, rgba(243,111,33,0.03) 55%, rgba(8,36,28,0.5) 100%)",
                  }}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-display font-semibold leading-none tracking-tight text-[34px] sm:text-[40px] lg:text-[44px]"
                      style={{
                        color: isCore
                          ? "rgba(247,244,239,0.96)"
                          : "rgba(247,244,239,0.9)",
                      }}
                    >
                      {c.value}
                    </span>
                    <span className="text-[10.5px] uppercase tracking-[0.24em] text-brand-orange-soft sm:text-[11.5px]">
                      {c.title}
                    </span>
                  </div>
                  <p className="text-[11.5px] leading-relaxed text-brand-ivory/65 sm:text-[12.5px]">
                    {c.note}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Optional small math anchor */}
        {p.deliveryMathNote && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.92, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10.5px] uppercase tracking-[0.22em] text-brand-ivory/45 sm:text-[11.5px]"
          >
            {p.deliveryMathNote}
          </motion.div>
        )}

        {/* Closing interpretation line + source rail */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
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
