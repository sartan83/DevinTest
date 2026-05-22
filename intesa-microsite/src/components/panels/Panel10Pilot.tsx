"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

/**
 * Panel 11 — 4-Week Pilot · controlled validation sprint.
 *
 * Layout (top → bottom):
 *   1. Hero + supporting subline + net-efficiency anchor
 *   2. Four weekly execution blocks (compact, single Output line)
 *   3. Single "Success criteria" block — six measurement chips,
 *      each with a title and a tier label. Replaces the previous
 *      "Measured KPIs" + "Decision criteria" duo, which overlapped.
 */
export function Panel10Pilot() {
  const p = intesa.panel11;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="clean">
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <PanelHeadline text={p.headline} compact />
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-[12.5px] leading-relaxed text-brand-ivory/92 sm:text-[14px] lg:text-[15px]"
          >
            {p.subhead}
          </motion.p>
          {p.netEfficiencyLine && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl text-[11.5px] italic leading-relaxed text-brand-orange-soft/95 sm:text-[12.5px]"
            >
              {p.netEfficiencyLine}
            </motion.p>
          )}
        </div>

        {/* 4 weekly execution blocks — each with a single Output
            line. Reads as a tight 4-step progression. */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {p.blocks.map((b, i) => (
            <motion.div
              key={b.week}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-xl border border-brand-ivory/20 bg-brand-green-mid/25 p-4 sm:p-4.5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-brand-orange-soft sm:text-[11px]">
                  {b.week}
                </span>
                <span className="font-display text-[11px] font-light leading-none text-brand-ivory/52 sm:text-[12px]">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-1.5 text-[13.5px] font-medium leading-snug text-brand-ivory sm:text-[14.5px]">
                {b.title}
              </div>
              <p className="mt-2 text-[11.5px] leading-snug text-brand-ivory/92 sm:text-[12.5px]">
                <span className="text-[10.5px] uppercase tracking-[0.22em] text-brand-ivory/75 sm:text-[10.5px]">
                  Output ·{" "}
                </span>
                {b.output}
              </p>
              {i < p.blocks.length - 1 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-base text-brand-ivory/42 lg:block"
                >
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mutual commitment line — quiet bridge from the 4-week
            pilot to the post-pilot path. Per user direction this
            sits directly under the Week 4 / Executive Decision
            step. Compact, secondary to the main pilot structure,
            single line, with a small orange tick so it reads as
            an intentional anchor rather than a footnote. */}
        {p.mutualCommitment && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-baseline gap-2 rounded-lg border-l-2 border-brand-orange/55 bg-brand-orange/[0.04] px-3 py-2 text-[12px] leading-snug text-brand-ivory/94 sm:text-[13px] lg:text-[13.5px]"
          >
            <span
              aria-hidden
              className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange-soft"
            />
            <span>{p.mutualCommitment}</span>
          </motion.p>
        )}

        {/* Success criteria — single consolidated block. Six chips,
            each with a title + tier label. Replaces the previous
            Measured KPIs + Decision criteria duo. */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3 border-t border-brand-ivory/20 pt-4 sm:gap-3.5 sm:pt-5"
        >
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-[11px] uppercase tracking-[0.32em] text-brand-orange sm:text-[12px]">
              {p.successCriteria.label}
            </span>
            <span className="text-[10.5px] italic leading-snug text-brand-ivory/82 sm:text-[11px]">
              {p.successCriteria.caption}
            </span>
          </div>
          {/* Three-theme grouped grid — Execution · Trust · Scale.
              Each theme renders as a small column with its uppercase
              label + two criteria chips. Falls back to a flat 6-chip
              grid if `groups` is absent. */}
          {p.successCriteria.groups && p.successCriteria.groups.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {p.successCriteria.groups.map((group, gi) => (
                <motion.div
                  key={group.key}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.38 + gi * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="inline-block h-1 w-3.5 rounded-[1px] bg-brand-orange/80"
                    />
                    <span className="text-[10.5px] uppercase tracking-[0.32em] text-brand-orange sm:text-[10.5px]">
                      {group.theme}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {group.items.map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 4 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.45,
                          delay: 0.45 + gi * 0.08 + i * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-baseline gap-2 rounded-lg border border-brand-orange/22 bg-brand-orange/[0.05] px-3 py-2 sm:px-3.5"
                      >
                        <span
                          aria-hidden
                          className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-[1px] bg-brand-orange/80"
                        />
                        <div className="flex flex-col">
                          <span className="text-[12px] font-medium leading-tight text-brand-ivory sm:text-[12.5px]">
                            {item.title}
                          </span>
                          <span className="text-[10.5px] uppercase tracking-[0.22em] text-brand-ivory/82 sm:text-[10.5px]">
                            {item.tag}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3">
              {p.successCriteria.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.4 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-baseline gap-2 rounded-lg border border-brand-orange/22 bg-brand-orange/[0.05] px-3 py-2 sm:px-3.5"
                >
                  <span
                    aria-hidden
                    className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-[1px] bg-brand-orange/80"
                  />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-medium leading-tight text-brand-ivory sm:text-[12.5px]">
                      {item.title}
                    </span>
                    <span className="text-[10.5px] uppercase tracking-[0.22em] text-brand-ivory/82 sm:text-[10.5px]">
                      {item.tag}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Short interpretation line — anchors the cluster on the
              broader signal: execution speed + review trust + scale-out
              potential, not just code generation. */}
          {p.successCriteria.interpretation && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl text-[11.5px] italic leading-snug text-brand-ivory/88 sm:text-[12.5px]"
            >
              {p.successCriteria.interpretation}
            </motion.p>
          )}
        </motion.div>

        {/* Commitment ask + closing — absorbs the former Decision
            Point slide. Pilot now closes the room on its own with a
            short, executive commitment block and a strategic anchor. */}
        {p.commitment && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 border-t-[1.5px] border-brand-orange/45 pt-4 sm:gap-3.5 sm:pt-5"
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-[11px] uppercase tracking-[0.32em] text-brand-orange sm:text-[12px]">
                {p.commitment.label}
              </span>
              {p.commitment.caption && (
                <span className="text-[10.5px] italic leading-snug text-brand-ivory/82 sm:text-[11px]">
                  {p.commitment.caption}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {p.commitment.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.5 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-ivory/25 bg-brand-ivory/[0.04] px-2.5 py-1 text-[11px] leading-tight text-brand-ivory/94 sm:text-[12px]"
                >
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-[1px] bg-brand-orange/80"
                  />
                  {item}
                </motion.span>
              ))}
            </div>
            {p.closing && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl text-[11.5px] italic leading-snug text-brand-ivory/90 sm:text-[12.5px]"
              >
                {p.closing}
              </motion.p>
            )}
          </motion.div>
        )}
      </div>
    </PanelShell>
  );
}
