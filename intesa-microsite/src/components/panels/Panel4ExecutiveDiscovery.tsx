"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 4 — Future-State Engineering Flow.
 *
 * Operating-model transformation visual. NOT an architecture diagram.
 * Three reading regions, left → right:
 *
 *   LEFT    Traditional execution      muted, slightly desaturated,
 *                                       constrained card treatment
 *   CENTER  Devin execution layer      animated capability layer,
 *                                       subtle directional flow
 *   RIGHT   Governed AI execution      brighter, layered cards,
 *                                       soft ivory/orange glow
 *
 * The headline ("Modernization execution becomes scalable.") sits above
 * the three regions. A single executive closing line sits below.
 *
 * Visual rules:
 *   - No arrows pointing at boxes, no spaghetti, no "architecture".
 *   - Asymmetric: future column reads slightly larger and brighter.
 *   - Motion is subtle: a soft flowing line in the bridge + stagger
 *     reveal on the future column cards.
 */
export function Panel4ExecutiveDiscovery() {
  const p = intesa.panel4;

  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-5 sm:gap-7">
        <PanelHeadline text={p.headline} className="max-w-4xl" compact />

        {/* Operating-model transformation
            ──────────────────────────────────────────────────────────────
            Three regions stacked on mobile, side-by-side on lg.
            The grid is asymmetric: future column slightly wider so the
            eye lands on the "after" state.
        */}
        <div className="relative">
          {/* Background wash — subtle gradient from constrained left
              (deep green-mid) to elevated right (ivory-glow + orange
              tint). Painted on the wrapper so the columns sit on top. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(90deg, rgba(8,36,28,0.55) 0%, rgba(8,36,28,0.25) 38%, rgba(247,244,239,0.06) 62%, rgba(243,111,33,0.12) 100%)",
            }}
          />

          <div className="relative grid gap-4 p-3 sm:gap-5 sm:p-4 lg:grid-cols-[1fr_auto_1.1fr] lg:items-stretch lg:gap-6">
            {/* LEFT · Traditional execution */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3 rounded-2xl border border-brand-ivory/8 bg-brand-green-mid/35 px-4 py-5 sm:px-5 sm:py-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/45 sm:text-[11px]">
                  {p.current.caption}
                </span>
                <span className="font-display text-[13px] font-medium text-brand-ivory/65 sm:text-[14px]">
                  {p.current.label}
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {p.current.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[12px] leading-snug text-brand-ivory/65 sm:text-[13px] lg:text-[14px]"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-ivory/35"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CENTER · Devin execution layer
                ─────────────────────────────────────────────────────────
                Operational bridge, not architecture. Three subtle
                horizontal flowlines animate left → right under the
                badge to suggest continuous orchestration without
                directional arrows or system blocks. */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center justify-center self-stretch overflow-hidden rounded-2xl border border-brand-orange/25 px-4 py-5 lg:min-w-[180px] lg:py-6"
              style={{
                background:
                  "linear-gradient(180deg, rgba(243,111,33,0.10) 0%, rgba(247,244,239,0.06) 50%, rgba(243,111,33,0.10) 100%)",
                boxShadow:
                  "inset 0 0 0 1px rgba(247,244,239,0.05), 0 6px 28px -16px rgba(243,111,33,0.45)",
              }}
            >
              {/* Soft flow lines — three muted ivory streaks sweeping
                  L → R, infinite loop, low opacity. Reads as flow,
                  not as data path. */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 -translate-y-1/2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ x: "-30%", opacity: 0 }}
                    animate={{ x: "120%", opacity: [0, 0.5, 0] }}
                    transition={{
                      duration: 3.6,
                      delay: i * 1.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-px w-1/2"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, rgba(247,244,239,${0.35 - i * 0.07}) 50%, transparent 100%)`,
                      marginTop: `${(i - 1) * 10}px`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                <span className="text-[9px] uppercase tracking-[0.32em] text-brand-orange-soft/85 sm:text-[10px]">
                  {p.bridge.sublabel}
                </span>
                <span className="font-display text-[15px] font-semibold leading-tight text-brand-ivory sm:text-[16px] lg:text-[17px]">
                  {p.bridge.label}
                </span>
              </div>
            </motion.div>

            {/* RIGHT · Governed AI execution */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-3 rounded-2xl border border-brand-orange/30 px-4 py-5 sm:px-5 sm:py-6"
              style={{
                background:
                  "radial-gradient(circle at 80% 0%, rgba(243,111,33,0.14) 0%, transparent 55%), linear-gradient(180deg, rgba(247,244,239,0.06) 0%, rgba(8,36,28,0.35) 100%)",
                boxShadow:
                  "inset 0 0 0 1px rgba(247,244,239,0.08), 0 10px 36px -22px rgba(243,111,33,0.45)",
              }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[11px]">
                  {p.future.caption}
                </span>
                <span className="font-display text-[14px] font-semibold text-brand-ivory sm:text-[15px]">
                  {p.future.label}
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {p.future.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-start gap-2.5 text-[12px] leading-snug text-brand-ivory/90 sm:text-[13px] lg:text-[14px]"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Closing — single executive line, low-noise, no arrows. */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-[12px] italic leading-relaxed text-brand-ivory/70 sm:text-[13px] lg:text-[14px]"
        >
          {p.closing}
        </motion.p>
      </div>
    </PanelShell>
  );
}
