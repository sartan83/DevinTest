"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

type Column = { title: string; items: string[] };

function CommitmentColumn({
  col,
  accent,
  delay,
}: {
  col: Column;
  accent: "client" | "partner";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "flex flex-col rounded-xl border p-3.5 sm:p-4",
        accent === "partner"
          ? "border-brand-orange/30 bg-brand-orange/5"
          : "border-brand-ivory/15 bg-brand-green-mid/25",
      ].join(" ")}
    >
      <div className="flex items-baseline gap-2">
        <span
          aria-hidden
          className={[
            "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
            accent === "partner" ? "bg-brand-orange" : "bg-brand-ivory/60",
          ].join(" ")}
        />
        <h3 className="font-display text-[13px] font-medium uppercase tracking-[0.22em] text-brand-ivory sm:text-[14px]">
          {col.title}
        </h3>
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {col.items.map((it) => (
          <li
            key={it}
            className="flex gap-2 rounded-lg border border-brand-ivory/8 bg-brand-green-deep/40 px-2.5 py-1.5 text-[11px] leading-snug text-brand-ivory/85 sm:text-[12px]"
          >
            <span
              aria-hidden
              className={[
                "mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full",
                accent === "partner" ? "bg-brand-orange" : "bg-brand-ivory/40",
              ].join(" ")}
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Panel11MutualCommitment() {
  const p = intesa.panel12;
  return (
    <PanelShell eyebrow={p.eyebrow} compact bg="clean">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="grid gap-3 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-6">
          <PanelHeadline text={p.headline} className="max-w-3xl" compact />
          <p className="rounded-xl border border-brand-orange/30 bg-brand-orange/5 px-3.5 py-2.5 text-[12px] leading-relaxed text-brand-ivory/90 sm:px-4 sm:py-3 sm:text-[13px]">
            {p.partnership}
          </p>
        </div>

        <div className="grid gap-2.5 sm:gap-3 lg:grid-cols-2">
          <CommitmentColumn col={p.intesa} accent="client" delay={0.05} />
          <CommitmentColumn col={p.cognition} accent="partner" delay={0.15} />
        </div>

        <p className="rounded-xl border border-brand-ivory/12 bg-brand-green-deep/40 px-3.5 py-2.5 text-[12px] leading-relaxed text-brand-ivory/80 sm:px-4 sm:py-3 sm:text-[13px]">
          {p.successDependsOn}
        </p>

        <p className="text-[11px] leading-relaxed text-brand-ivory/65 sm:text-[12px]">
          {p.goLiveTransition}
        </p>
      </div>
    </PanelShell>
  );
}
