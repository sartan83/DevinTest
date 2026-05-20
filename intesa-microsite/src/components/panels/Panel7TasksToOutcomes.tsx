"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 7 — Capacity Redeployment.
 *
 * EB-pivot rebuild: this is a CIO big-number slide. Two scenarios
 * (conservative / realistic) translating dev-days/year into
 * developer-equivalents (1 dev-eq = 220 days/year). The previous
 * tasks-to-outcomes table and modelHypothesis box are dropped — the
 * presenter narrates the leverage story live.
 */
export function Panel7TasksToOutcomes() {
  const p = intesa.panel7;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="bright">
      <div className="flex h-full flex-col justify-between gap-6 sm:gap-8">
        <PanelHeadline text={p.headline} compact />

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          {p.capacityScenarios.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + 0.18 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={[
                "flex flex-col gap-3 rounded-2xl border px-5 py-5 sm:px-6 sm:py-6",
                s.key === "realistic"
                  ? "border-brand-orange/35 bg-brand-orange/5"
                  : "border-brand-ivory/25 bg-brand-green-mid/30",
              ].join(" ")}
            >
              <div className="text-[10.5px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[11px]">
                {s.title}
              </div>
              <div className="font-display text-[2rem] font-light leading-[1.05] text-brand-ivory sm:text-[2.6rem] lg:text-[3rem]">
                {s.devDays}
              </div>
              <div className="font-display text-[1.1rem] font-light leading-tight text-brand-ivory/94 sm:text-[1.4rem] lg:text-[1.6rem]">
                {s.devEquivalents}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="font-display text-[15px] font-light leading-snug text-brand-ivory sm:text-[16px] lg:text-[17px]">
            {p.capacityRedeploymentLine}
          </p>
          <p className="text-[11px] leading-snug text-brand-ivory/82 sm:text-[12px]">
            {p.capacityCalcNote}
          </p>
          <p className="text-[10.5px] leading-snug text-brand-ivory/70 sm:text-[11px]">
            {p.capacityFootnote}
          </p>
        </div>
      </div>
    </PanelShell>
  );
}
