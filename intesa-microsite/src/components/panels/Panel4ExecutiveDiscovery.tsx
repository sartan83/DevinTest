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
 *   LEFT    Traditional execution      muted, constrained, tightly
 *                                       stacked, visually heavier
 *   CENTER  Devin execution layer      animated capability layer,
 *                                       three subtle L→R flowlines
 *   RIGHT   Modernization engine       layered cards, parallel L→R
 *                                       sweeps behind each bullet,
 *                                       6× cinematic acceleration
 *                                       anchor + 3 micro signals
 *
 * Visual rules:
 *   - No arrows pointing at boxes, no spaghetti, no "architecture".
 *   - Asymmetric: future column is wider and elevated.
 *   - Motion is subtle but continuous: flowlines + parallel streams
 *     suggest "linear execution becoming parallel governed execution".
 */
export function Panel4ExecutiveDiscovery() {
  const p = intesa.panel4;

  return (
    <PanelShell eyebrow={p.eyebrow} compact>
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-2 sm:gap-3">
          <PanelHeadline text={p.headline} className="max-w-4xl" compact />
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-[12.5px] leading-relaxed text-brand-ivory/70 sm:text-[14px] lg:text-[15px]"
          >
            {p.subhead}
          </motion.p>
        </div>

        {/* Operating-model transformation
            ──────────────────────────────────────────────────────────────
            Three regions stacked on mobile, side-by-side on lg.
            Asymmetric grid: future column wider so the eye lands on
            the "after" state.
        */}
        <div className="relative">
          {/* Background wash — gradient from constrained left to
              elevated right. Painted on the wrapper so the columns
              sit on top. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(90deg, rgba(8,36,28,0.7) 0%, rgba(8,36,28,0.35) 38%, rgba(247,244,239,0.05) 62%, rgba(243,111,33,0.14) 100%)",
            }}
          />

          <div className="relative grid gap-3 p-3 sm:gap-4 sm:p-4 lg:grid-cols-[0.9fr_auto_1.35fr] lg:items-stretch lg:gap-5">
            {/* LEFT · Traditional execution
                ─────────────────────────────────────────────────────
                Darker, tighter, more rigid. Items stack with reduced
                gap and dimmer ivory. Reads as human-linear modernization. */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2.5 rounded-2xl border border-brand-ivory/5 bg-brand-green-deep/55 px-3.5 py-4 sm:px-4 sm:py-5"
            >
              <div className="flex items-baseline justify-between gap-2 pb-1 border-b border-brand-ivory/8">
                <span className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/40 sm:text-[11px]">
                  {p.current.caption}
                </span>
                <span className="font-display text-[12px] font-medium text-brand-ivory/55 sm:text-[13px]">
                  {p.current.label}
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {p.current.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[12px] leading-[1.35] text-brand-ivory/55 sm:text-[13px] lg:text-[13.5px]"
                  >
                    <span
                      aria-hidden
                      className="mt-[7px] inline-block h-[3px] w-[3px] shrink-0 rounded-[1px] bg-brand-ivory/30"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CENTER · Devin execution layer
                ─────────────────────────────────────────────────────
                Three subtle horizontal flowlines animate L → R under
                the label — continuous orchestration, not a system
                diagram. */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center justify-center self-stretch overflow-hidden rounded-2xl border border-brand-orange/25 px-4 py-5 lg:min-w-[170px] lg:py-6"
              style={{
                background:
                  "linear-gradient(180deg, rgba(243,111,33,0.12) 0%, rgba(247,244,239,0.06) 50%, rgba(243,111,33,0.12) 100%)",
                boxShadow:
                  "inset 0 0 0 1px rgba(247,244,239,0.05), 0 6px 28px -16px rgba(243,111,33,0.45)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 -translate-y-1/2"
              >
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

            {/* RIGHT · Modernization engine
                ─────────────────────────────────────────────────────
                Layered card with orange radial wash + soft glow.
                Five future-state items render as parallel streams:
                each row sits over a continuously-sweeping L→R ivory
                line with a staggered phase, so the cluster reads as
                modernization moving in parallel rather than sequentially.
                A cinematic 6× anchor sits below the streams, emerging
                from the new execution model, followed by three
                compact secondary signals. */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-brand-orange/30 px-4 py-5 sm:gap-5 sm:px-6 sm:py-6"
              style={{
                background:
                  "radial-gradient(circle at 80% 0%, rgba(243,111,33,0.16) 0%, transparent 55%), radial-gradient(circle at 0% 100%, rgba(247,244,239,0.07) 0%, transparent 50%), linear-gradient(180deg, rgba(247,244,239,0.07) 0%, rgba(8,36,28,0.45) 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(247,244,239,0.12), inset 0 0 0 1px rgba(247,244,239,0.06), 0 14px 44px -22px rgba(243,111,33,0.5)",
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

              {/* Parallel modernization streams — each item sits on
                  its own row with a subtle ivory sweep animating L→R
                  behind it. Sweeps are staggered so the cluster reads
                  as parallel flow. */}
              <ul className="relative flex flex-col gap-2.5">
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
                    className="relative flex items-center gap-2.5 overflow-hidden rounded-md py-1 pl-2 pr-1 text-[12px] leading-snug text-brand-ivory/95 sm:text-[13px] lg:text-[14px]"
                  >
                    {/* Parallel stream sweep — continuous L→R ivory
                        line behind each row. Staggered phase makes
                        the rows feel like independent streams moving
                        in parallel rather than a single train. */}
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -z-10 h-full w-2/3"
                      initial={{ x: "-40%", opacity: 0 }}
                      animate={{ x: "120%", opacity: [0, 0.45, 0] }}
                      transition={{
                        duration: 4.2,
                        delay: 0.35 * i,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(247,244,239,0.16) 45%, rgba(243,111,33,0.12) 60%, transparent 100%)",
                      }}
                    />
                    <span
                      aria-hidden
                      className="relative z-10 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                    />
                    <span className="relative z-10">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Embedded operational chips — sit inline between the
                  parallel modernization streams and the 6× anchor.
                  Read as the validation checkpoints inside the
                  future-state flow (PR-ready, reviewable diffs, tests,
                  CI, human approval, traceable history). The
                  "Human approval" chip is the controlled gate —
                  rendered with stronger orange contrast and a small
                  lock-style marker so it does NOT read as an
                  afterthought. */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-1.5 border-t border-brand-ivory/10 pt-3 sm:gap-2 sm:pt-3.5"
              >
                {p.flowMetrics.map((chip, i) => {
                  const isGate = chip.gate;
                  return (
                    <motion.span
                      key={chip.label}
                      initial={{ opacity: 0, y: 4 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.5 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={
                        isGate
                          ? "inline-flex items-center gap-1.5 rounded-full border border-brand-orange/55 bg-brand-orange/12 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-ivory sm:text-[11px]"
                          : "inline-flex items-center gap-1.5 rounded-full border border-brand-ivory/15 bg-brand-ivory/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-brand-ivory/70 sm:text-[11px]"
                      }
                    >
                      {isGate ? (
                        <span
                          aria-hidden
                          className="inline-block h-1.5 w-1.5 rounded-[1px] bg-brand-orange"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="inline-block h-1 w-1 rounded-full bg-brand-ivory/45"
                        />
                      )}
                      {chip.label}
                    </motion.span>
                  );
                })}
              </motion.div>

              {/* Cinematic acceleration anchor — emerges from the
                  parallel streams above. Premium scale, soft radial
                  halo, no border. Reads as an operational signal
                  coming out of the new model, not as a KPI tile. */}
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-1 flex flex-col items-start gap-1.5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-4 -inset-y-3 rounded-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at 18% 50%, rgba(243,111,33,0.22) 0%, transparent 60%)",
                  }}
                />
                <span
                  className="relative z-10 font-display font-semibold leading-[0.85] tracking-tight text-[64px] sm:text-[88px] lg:text-[104px]"
                  style={{ color: "rgba(243,111,33,0.95)" }}
                >
                  {p.future.anchor.metric}
                </span>
                <div className="relative z-10 flex max-w-xs flex-col gap-1 sm:max-w-[200px]">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-brand-ivory sm:text-[12px]">
                    {p.future.anchor.label}
                  </span>
                  <span className="text-[10px] italic leading-snug text-brand-ivory/50 sm:text-[11px]">
                    {p.future.anchor.caption}
                  </span>
                </div>
              </motion.div>

              {/* Secondary operational validation signals — sit under
                  the 6× anchor. Compact tile row, secondary tier,
                  Gartner-style operational metrics. */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-3 gap-2 border-t border-brand-ivory/10 pt-3 sm:gap-3 sm:pt-4"
              >
                {p.future.signals.map((sig) => (
                  <div key={sig.label} className="flex flex-col gap-0.5">
                    <span className="font-display text-[18px] font-semibold leading-none text-brand-ivory sm:text-[22px] lg:text-[24px]">
                      {sig.value}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-brand-ivory/55 sm:text-[10px]">
                      {sig.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* SDLC effort anchors — subtle chip row that maps the
            future-state flow onto Intesa's own SDLC effort
            distribution (43% coding + 27% testing/release = 70%
            execution zone). Reads as a contextual anchor, not as
            a competing KPI block. */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-2 border-t border-brand-ivory/10 pt-3 sm:gap-2.5 sm:pt-3.5"
        >
          <span className="text-[9px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[10px]">
            SDLC effort anchors
          </span>
          {p.sdlcAnchors.map((a) => {
            const isZone = a.label === "Execution zone";
            return (
              <span
                key={a.label}
                className={[
                  "inline-flex items-baseline gap-1.5 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] sm:text-[11px]",
                  isZone
                    ? "border-brand-orange/55 bg-brand-orange/10 text-brand-orange-soft"
                    : "border-brand-ivory/15 bg-brand-green-deep/40 text-brand-ivory/75",
                ].join(" ")}
              >
                <span className="font-display text-[13px] font-semibold tracking-tight text-brand-ivory sm:text-[14px]">
                  {a.value}
                </span>
                <span>{a.label}</span>
              </span>
            );
          })}
        </motion.div>

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

        {/* Subtle authority footer — anchors the governance
            message: AI scales execution throughput, decision
            authority stays with Intesa. Rendered as a thin
            uppercase rail, not as a sentence — reads as a
            governance principle, not as marketing copy. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 border-t border-brand-ivory/10 pt-3 sm:pt-3.5"
        >
          <span
            aria-hidden
            className="h-px w-6 bg-brand-orange/55 sm:w-8"
          />
          <span className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/70 sm:text-[11px]">
            {p.authorityLine}
          </span>
        </motion.div>
      </div>
    </PanelShell>
  );
}
