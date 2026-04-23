"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { intesa, DiscoveryPersona } from "../../data/intesa";
import {
  PanelShell,
  PanelHeadline,
  PanelSubhead,
  PanelClosing,
} from "../PanelShell";

const PERSONAS: DiscoveryPersona[] = ["CIO", "CTO", "COO", "Risk"];

export function Panel35Discovery() {
  const p = intesa.panel35;
  const [persona, setPersona] = useState<DiscoveryPersona>("CIO");
  const [open, setOpen] = useState<number | null>(0);

  const block = p.personas.find((b) => b.persona === persona)!;

  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <PanelHeadline text={p.headline} />
          <PanelSubhead>{p.subhead}</PanelSubhead>
          <div className="mt-5 max-w-md rounded-lg border-l-2 border-brand-orange/50 bg-brand-green-mid/20 px-4 py-3 text-[12px] italic text-brand-ivory/70 sm:text-[13px]">
            {p.framingNote}
          </div>
          <PanelClosing>{p.bottomLine}</PanelClosing>
        </div>

        <div>
          <div className="inline-flex rounded-full border border-brand-ivory/15 bg-brand-green-deep/50 p-1">
            {PERSONAS.map((role) => {
              const isActive = role === persona;
              return (
                <button
                  key={role}
                  onClick={() => {
                    setPersona(role);
                    setOpen(0);
                  }}
                  className={[
                    "relative rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] transition-colors",
                    isActive
                      ? "text-brand-ivory"
                      : "text-brand-ivory/55 hover:text-brand-ivory/80",
                  ].join(" ")}
                >
                  {isActive && (
                    <motion.span
                      layoutId="persona-pill"
                      className="absolute inset-0 rounded-full bg-devin-gradient shadow-glow"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative">{role}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 text-sm text-brand-ivory/60">{block.headline}</div>

          <div className="mt-4 flex flex-col gap-3" data-allow-native-scroll="true">
            <AnimatePresence mode="wait">
              <motion.div
                key={persona}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-3"
              >
                {block.questions.map((q, i) => {
                  const isOpen = open === i;
                  return (
                    <button
                      key={q.q}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className={[
                        "group w-full rounded-xl border text-left transition-colors",
                        isOpen
                          ? "border-brand-orange/40 bg-brand-green-mid/60"
                          : "border-brand-ivory/10 bg-brand-green-mid/25 hover:border-brand-ivory/25 hover:bg-brand-green-mid/40",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-4 px-5 py-4">
                        <div className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-orange/40 text-[10px] font-semibold text-brand-orange-soft">
                            Q{i + 1}
                          </span>
                          <p className="text-[15px] font-medium text-brand-ivory">
                            {q.q}
                          </p>
                        </div>
                        <span
                          aria-hidden
                          className={[
                            "mt-1 text-brand-ivory/60 transition-transform",
                            isOpen ? "rotate-180" : "rotate-0",
                          ].join(" ")}
                        >
                          ⌃
                        </span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <ul className="space-y-2 border-t border-brand-ivory/10 px-5 py-4">
                              {q.followUps.map((f) => (
                                <li
                                  key={f}
                                  className="flex items-start gap-2 text-sm text-brand-ivory/75"
                                >
                                  <span className="mt-2 inline-block h-1 w-1 rounded-full bg-brand-orange/70" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
