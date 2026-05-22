"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { intesa, type DiscoveryBlockKey } from "../../data/intesa";
import { PanelShell, PanelHeadline } from "../PanelShell";

export function AppendixDiscoveryFramework() {
  const p = intesa.appendixDiscoveryFramework;
  const [activeKey, setActiveKey] = useState<DiscoveryBlockKey>(p.blocks[0].key);
  const active = p.blocks.find((b) => b.key === activeKey) ?? p.blocks[0];

  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="flex flex-col gap-7 sm:gap-9">
        <div className="max-w-3xl">
          <PanelHeadline text={p.headline} className="text-2xl sm:text-4xl lg:text-5xl" />
          <p className="mt-4 text-sm leading-relaxed text-brand-ivory/70 sm:text-base">
            {p.intro}
          </p>
        </div>

        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Executive discovery framework blocks"
          className="flex flex-wrap gap-2 sm:gap-3"
        >
          {p.blocks.map((b) => {
            const selected = b.key === activeKey;
            return (
              <button
                key={b.key}
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveKey(b.key)}
                className={[
                  "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-all sm:text-xs",
                  selected
                    ? "border-brand-orange/50 bg-brand-orange/15 text-brand-ivory shadow-elev"
                    : "border-brand-ivory/15 bg-brand-green-deep/40 text-brand-ivory/70 hover:border-brand-ivory/30 hover:text-brand-ivory",
                ].join(" ")}
              >
                <span
                  aria-hidden
                  className={[
                    "inline-block h-1.5 w-1.5 rounded-full transition",
                    selected ? "bg-brand-orange" : "bg-brand-ivory/30 group-hover:bg-brand-ivory/60",
                  ].join(" ")}
                />
                <span>{b.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active block */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 rounded-2xl border border-brand-ivory/16 bg-brand-green-mid/25 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10"
          >
            <div>
              <h3 className="font-display text-xl font-light leading-snug text-brand-ivory sm:text-2xl">
                {active.headline}
              </h3>
              <ol className="mt-5 space-y-3">
                {active.questions.map((q, i) => (
                  <li
                    key={q}
                    className="flex gap-3 rounded-xl border border-brand-ivory/8 bg-brand-green-deep/40 px-4 py-3 sm:px-5 sm:py-4"
                  >
                    <span className="font-display text-sm font-semibold text-brand-orange-soft">
                      Q{i + 1}.
                    </span>
                    <span className="text-sm leading-relaxed text-brand-ivory/85 sm:text-[15px]">
                      {q}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="flex flex-col rounded-xl border border-brand-orange/25 bg-brand-orange/5 px-4 py-4 sm:px-5 sm:py-5">
              <div className="text-[10px] uppercase tracking-[0.28em] text-brand-orange-soft/90">
                Listening for
              </div>
              <p className="mt-2 text-sm leading-relaxed text-brand-ivory/80">
                {active.listening}
              </p>
            </aside>
          </motion.div>
        </AnimatePresence>

        <p className="max-w-3xl text-sm leading-relaxed text-brand-ivory/75 sm:text-base">
          {p.transition}
        </p>
      </div>
    </PanelShell>
  );
}
