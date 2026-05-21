"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 3 — Where the remaining 36% gets hard.
 *
 * Executive hypothesis (not a discovery questionnaire). Names the
 * concrete modernization initiatives that live inside the remaining
 * 36% cloud-migration estate, then anchors a single live discovery
 * question with chip-style options.
 *
 * Visual language:
 *   - Section eyebrow doubles as the section name.
 *   - Hero question-style headline + subline.
 *   - 5-card initiative map (2 + 3 on lg) — title · note · accent line.
 *   - Question block + chip row (looks clickable; non-interactive).
 *   - Quiet closing line — pilot-link statement.
 */
export function Panel3CurrentState() {
  const p = intesa.panel3;
  return (
    <PanelShell
      eyebrow={p.eyebrow}
      compact
      headerRight={
        <motion.img
          src="logos/intesa-sanpaolo.svg"
          alt="Intesa Sanpaolo"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-6 w-auto sm:h-7 lg:h-8"
        />
      }
    >
      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-4">
        {/* Header — subline + hero */}
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <PanelHeadline text={p.headline} compact className="max-w-3xl" />
          <span className="max-w-3xl text-[13px] leading-snug text-brand-ivory/75 sm:text-[14px]">
            {p.discoveryIntro}
          </span>
        </div>

        {/* 5-card initiative map — 1 / 2 / 5 col responsive grid */}
        <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-5">
          {p.estateCards.map((card, i) => (
            <motion.li
              key={card.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: 0.08 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex min-w-0 flex-col gap-2 overflow-hidden rounded-xl border border-brand-ivory/18 bg-brand-green-mid/25 px-3.5 py-3 transition hover:border-brand-orange/35 hover:bg-brand-green-mid/35 sm:px-4 sm:py-3.5 lg:px-3.5 lg:py-3"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent"
              />
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange-soft"
                />
                <span className="text-[11px] uppercase tracking-[0.22em] text-brand-orange-soft sm:text-[11.5px]">
                  0{i + 1}
                </span>
              </div>
              <p className="font-display text-[14.5px] font-medium leading-[1.25] text-brand-ivory break-words sm:text-[15px] lg:text-[15.5px]">
                {card.title}
              </p>
              <p className="text-[12px] leading-relaxed text-brand-ivory/75 break-words sm:text-[12.5px]">
                {card.note}
              </p>
            </motion.li>
          ))}
        </ul>

        {/* Executive discovery question — chip row removed per user
            direction; the question stands alone as the live moment. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-1.5 rounded-xl border border-brand-ivory/16 bg-brand-ivory/[0.035] px-4 py-3 sm:px-5 sm:py-3.5"
        >
          <span className="text-[11px] uppercase tracking-[0.24em] text-brand-orange-soft sm:text-[11.5px]">
            Live discovery
          </span>
          <p className="font-display text-[16px] font-medium leading-[1.3] text-brand-ivory sm:text-[18px] lg:text-[20px]">
            {p.estateQuestion}
          </p>
        </motion.div>

        {/* Pilot-link closing line */}
        {p.validationFooter && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-2 text-[12px] italic leading-relaxed text-brand-ivory/75 sm:text-[13px]"
          >
            <span
              aria-hidden
              className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-orange-soft/70"
            />
            <span>{p.validationFooter}</span>
          </motion.div>
        )}
      </div>
    </PanelShell>
  );
}
