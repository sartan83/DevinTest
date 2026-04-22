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

export function Panel7CounterClimax({ min, max }: Props) {
  const p = intesa.panel7;
  const finalMin = Math.max(min, intesa.counter.finalRange.min);
  const finalMax = Math.max(max, intesa.counter.finalRange.max);

  return (
    <PanelShell eyebrow={p.eyebrow} className="items-center justify-center text-center">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-brand-orange/30 bg-gradient-to-br from-brand-green-mid/70 to-brand-green-deep/70 px-10 py-12 shadow-elev"
        >
          <div className="text-[11px] uppercase tracking-[0.32em] text-brand-orange-soft">
            {intesa.counter.label}
          </div>
          <div className="mt-4 font-display text-5xl font-light leading-tight text-brand-ivory sm:text-6xl lg:text-7xl">
            ≈ {format(finalMin)}–{format(finalMax)}
          </div>
          <div className="mt-3 text-sm uppercase tracking-[0.28em] text-brand-ivory/70">
            {intesa.counter.unit}
          </div>
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[36px] bg-brand-orange/10 blur-3xl" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 font-display text-2xl font-light leading-snug text-brand-ivory sm:text-3xl"
        >
          {p.headlinePrefix}{" "}
          <span className="text-brand-orange-soft">
            ≈ {format(finalMin)}–{format(finalMax)} developer days
          </span>{" "}
          {p.headlineSuffix}
        </motion.p>

        <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-brand-ivory/45">
          {p.sub}
        </p>

        <div className="mt-10 h-px w-24 bg-brand-orange/40" />

        <p className="mt-6 font-display text-lg font-light leading-snug text-brand-ivory/80 sm:text-xl">
          {p.closing.split("\n").map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </PanelShell>
  );
}
