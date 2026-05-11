"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead, PanelClosing } from "../PanelShell";

/**
 * Panel 6 — Governed Acceleration.
 *
 * Reframed from a "Built for Enterprise" feature grid into a governance
 * narrative. Three pillars (not five feature cards), large typography,
 * thin top-rule dividers instead of card framing, generous whitespace.
 * The panel communicates that modernization acceleration can operate
 * inside banking governance — not that the product has enterprise
 * features.
 */
export function Panel6EnterpriseTrust() {
  const p = intesa.panel6;
  return (
    <PanelShell eyebrow={p.eyebrow} bg="deep">
      <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
        <div className="flex flex-col gap-4 sm:gap-5">
          <PanelHeadline text={p.headline} />
          {p.subhead && (
            <PanelSubhead className="mt-0 max-w-xl text-brand-ivory/65">
              {p.subhead}
            </PanelSubhead>
          )}
        </div>

        {/* Three governance pillars.
            ─────────────────────────────────────────────────────────
            No card framing, no tag chips. Each pillar sits under a
            thin ivory top-rule so the three columns read as a single
            governance system, not as three separate feature tiles.
            Numbered (01 / 02 / 03) for executive rhythm.

            Pillar 1 (Human-in-the-loop execution) is subtly elevated
            as the primary governance anchor: wider column, brighter
            top-rule, slightly larger title, slightly brighter body
            and bullets. The other two remain at the supporting
            tier so the trio still reads as a single system, not as
            a hero card plus two footnotes. */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.35fr_1fr_1fr] lg:gap-14">
          {p.pillars.map((c, i) => {
            const isPrimary = i === 0;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + 0.09 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  isPrimary
                    ? "flex flex-col border-t-[1.5px] border-brand-ivory/30 pt-6 sm:pt-7"
                    : "flex flex-col border-t border-brand-ivory/15 pt-5 sm:pt-6"
                }
              >
                <span
                  className={
                    isPrimary
                      ? "text-[10px] uppercase tracking-[0.36em] text-brand-orange sm:text-[11px]"
                      : "text-[10px] uppercase tracking-[0.32em] text-brand-orange-soft sm:text-[11px]"
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={
                    isPrimary
                      ? "mt-4 font-display text-xl font-semibold leading-snug text-brand-ivory sm:text-[22px] lg:text-[26px]"
                      : "mt-4 font-display text-lg font-medium leading-snug text-brand-ivory sm:text-xl lg:text-[22px]"
                  }
                >
                  {c.title}
                </h3>
                <p
                  className={
                    isPrimary
                      ? "mt-3 max-w-[36ch] text-[14px] leading-relaxed text-brand-ivory/85 sm:text-[15px] lg:text-[16px]"
                      : "mt-2.5 max-w-[34ch] text-[13px] leading-relaxed text-brand-ivory/70 sm:text-[14px] lg:text-[15px]"
                  }
                >
                  {c.body}
                </p>
                {c.bullets && c.bullets.length > 0 && (
                  /* Subtle operational hints. Rendered as a tight list
                     of short phrases with a thin ivory micro-dot.
                     Premium and understated — no card, no chip, no
                     border. The bullets give engineering stakeholders
                     credible infra/operational signals without
                     turning the panel into a feature grid.

                     On the primary pillar the bullet ink and the
                     micro-dot are slightly brighter so the governance
                     anchor remains the most resolved column. */
                  <ul
                    className={
                      isPrimary
                        ? "mt-5 flex flex-col gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-ivory/70 sm:mt-6 sm:text-[12px]"
                        : "mt-4 flex flex-col gap-1.5 text-[11px] uppercase tracking-[0.18em] text-brand-ivory/55 sm:mt-5 sm:text-[12px]"
                    }
                  >
                    {c.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className={
                            isPrimary
                              ? "h-[4px] w-[4px] rounded-full bg-brand-ivory/55"
                              : "h-[3px] w-[3px] rounded-full bg-brand-ivory/40"
                          }
                        />
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>

        <PanelClosing>{p.closing}</PanelClosing>
      </div>
    </PanelShell>
  );
}
