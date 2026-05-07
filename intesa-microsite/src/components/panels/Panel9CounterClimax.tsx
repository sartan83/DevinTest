"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell } from "../PanelShell";

type Props = {
  min: number;
  max: number;
};

function format(n: number) {
  return Math.round(n).toLocaleString("en-GB");
}

function formatHours(n: number) {
  // Round to nearest 10 hours for readability at presentation distance.
  return Math.round(n / 10) * 10;
}

function formatFte(n: number) {
  // Round to 1 decimal place.
  return (Math.round(n * 10) / 10).toLocaleString("en-GB", {
    minimumFractionDigits: n % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  });
}

export function Panel9CounterClimax({ min, max }: Props) {
  const p = intesa.panel10;
  const c = intesa.counter;
  // Show the cumulative value reached AT THIS MOMENT in the live presentation,
  // not the final headline envelope. The number grows panel-by-panel as the
  // audience walks through the deck and only reaches 8.0–18.0 at the closing.
  const finalMin = min;
  const finalMax = max;

  // Translation layer: dev-days → engineering hours → annualized FTE-equivalent.
  // Annualized projection = (dev-days reclaimed per session × ~50 sessions/year)
  // expressed as FTE-equivalents at 220 dev-days / FTE-year.
  const sessionsPerYear = 50;
  const hoursMin = finalMin * c.hoursPerDay * sessionsPerYear;
  const hoursMax = finalMax * c.hoursPerDay * sessionsPerYear;
  const fteMin = (finalMin * sessionsPerYear) / c.annualizedFteProjectionFactor;
  const fteMax = (finalMax * sessionsPerYear) / c.annualizedFteProjectionFactor;

  return (
    <PanelShell eyebrow={p.eyebrow} className="items-center justify-center text-center" compact bg="cinematic">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Framing: scale of repetitive engineering execution. */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl text-[12px] leading-relaxed text-brand-ivory/65 sm:text-[13px]"
        >
          {c.framing}
        </motion.p>

        {/* Headline KPI block — visually dominant counter. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-3 rounded-3xl border border-brand-orange/30 bg-gradient-to-br from-brand-green-mid/70 to-brand-green-deep/70 px-5 py-5 shadow-elev sm:px-8 sm:py-7"
        >
          <div className="text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[11px] sm:tracking-[0.32em]">
            {c.label}
          </div>
          <div className="mt-2 font-display text-3xl font-light leading-tight tabular-nums text-brand-ivory sm:mt-3 sm:text-5xl lg:text-6xl">
            ≈ {format(finalMin)}–{format(finalMax)}
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.28em] text-brand-ivory/70 sm:text-sm">
            {c.unit}
          </div>

          {/* Dev-equivalent translation — capacity redeployment framing. */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-brand-ivory/75 sm:text-[12px]">
            <span className="tabular-nums font-medium text-brand-ivory">
              ≈ {formatHours(hoursMin).toLocaleString("en-GB")}–
              {formatHours(hoursMax).toLocaleString("en-GB")} engineering hours
            </span>
            <span aria-hidden className="text-brand-ivory/35">·</span>
            <span>
              ~<span className="tabular-nums font-medium text-brand-ivory">{formatFte(fteMin)}–{formatFte(fteMax)}</span> developer-equivalent capacity / year
            </span>
          </div>

          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[36px] bg-brand-orange/10 blur-3xl" />
        </motion.div>

        {/* Original narrative line. */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 font-display text-base font-light leading-snug text-brand-ivory sm:text-2xl"
        >
          {p.headlinePrefix}{" "}
          <span className="text-brand-orange-soft">
            ≈ {format(finalMin)}–{format(finalMax)} developer days
          </span>{" "}
          {p.headlineSuffix}
        </motion.p>

        <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-brand-ivory/45 sm:text-[11px]">
          {p.sub}
        </p>

        {/* Business interpretation — the strategic value statement. */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-5 max-w-2xl rounded-xl border border-brand-orange/25 bg-brand-orange/5 px-4 py-2.5 text-[12px] leading-relaxed text-brand-ivory/85 sm:text-[13px]"
        >
          {c.interpretation}
        </motion.p>

        <p className="mt-3 max-w-xl text-[10px] leading-snug text-brand-ivory/45 sm:text-[11px]">
          {c.devEquivalentFootnote}
        </p>
      </div>
    </PanelShell>
  );
}
