"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 3 — Executive validation points.
 *
 * Repositioned from "discovery findings" to a live executive
 * validation checkpoint. Designed to support the in-room roleplay:
 * the meeting pauses, four open questions land, and the
 * conversation moves from "what we observed" to "what we need to
 * validate" before Devin is introduced.
 *
 * Visual language:
 *   - Conversational intro at the top (italic, soft ivory).
 *   - Headline reads as a question framing — "What we need to
 *     validate." — not a research synthesis.
 *   - Four cards on a 2×2 grid: title · question · supporting note.
 *   - No competing metrics with adjacent sections (the 15% / €70M
 *     numbers stay in Why Now, ROI, and the SDLC map; here the
 *     numbers become questions).
 *   - Quiet footer line restating the goal.
 */
export function Panel3CurrentState() {
  const p = intesa.panel3;
  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-5 sm:gap-6">
        {/* Header — conversational intro + question-style headline */}
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <span className="text-[12px] italic leading-snug text-brand-ivory/55 sm:text-[13px]">
            {p.discoveryIntro}
          </span>
          <PanelHeadline text={p.headline} compact className="max-w-3xl" />
        </div>

        {/* Validation cards — 2×2 grid. Each card is a small
            executive checkpoint: title · open question · supporting
            note. Questions are the primary content; notes sit muted
            beneath them. */}
        <ul className="grid gap-3 sm:gap-4 lg:grid-cols-2">
          {p.validationCards.map((card, i) => (
            <motion.li
              key={card.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: 0.08 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-brand-ivory/10 bg-brand-green-mid/25 px-4 py-4 transition hover:border-brand-orange/35 hover:bg-brand-green-mid/35 sm:px-5 sm:py-5"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange-soft"
                />
                <span className="text-[10.5px] uppercase tracking-[0.24em] text-brand-orange-soft/85 sm:text-[11.5px]">
                  {card.title}
                </span>
              </div>
              <p className="font-display text-[16px] font-medium leading-[1.3] text-brand-ivory sm:text-[18px] lg:text-[19.5px]">
                {card.question}
              </p>
              <p className="text-[11.5px] leading-relaxed text-brand-ivory/55 sm:text-[12.5px]">
                {card.note}
              </p>
            </motion.li>
          ))}
        </ul>

        {/* Quiet goal footer — restates the section's purpose so it
            reads as a discovery checkpoint, not as a conclusion. */}
        {p.validationFooter && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-2 text-[11px] italic leading-relaxed text-brand-ivory/55 sm:text-[12.5px]"
          >
            <span
              aria-hidden
              className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-ivory/35"
            />
            <span>{p.validationFooter}</span>
          </motion.div>
        )}
      </div>
    </PanelShell>
  );
}
