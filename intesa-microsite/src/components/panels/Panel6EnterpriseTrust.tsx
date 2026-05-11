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
            Numbered (01 / 02 / 03) for executive rhythm. */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-3 lg:gap-14">
          {p.pillars.map((c, i) => (
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
              className="flex flex-col border-t border-brand-ivory/15 pt-5 sm:pt-6"
            >
              <span className="text-[10px] uppercase tracking-[0.32em] text-brand-orange-soft sm:text-[11px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg font-medium leading-snug text-brand-ivory sm:text-xl lg:text-[22px]">
                {c.title}
              </h3>
              <p className="mt-2.5 max-w-[34ch] text-[13px] leading-relaxed text-brand-ivory/70 sm:text-[14px] lg:text-[15px]">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>

        <PanelClosing>{p.closing}</PanelClosing>
      </div>
    </PanelShell>
  );
}
