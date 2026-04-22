"use client";

import { motion } from "framer-motion";
import { intesa } from "../../data/intesa";
import { PanelShell, PanelHeadline, PanelSubhead } from "../PanelShell";

type Props = {
  onCta: (targetPanel: number) => void;
};

export function Panel1Opening({ onCta }: Props) {
  const p = intesa.panel1;
  return (
    <PanelShell eyebrow={p.eyebrow}>
      <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <PanelHeadline text={p.headline} />
          <PanelSubhead>{p.subhead}</PanelSubhead>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-10">
            {p.ctas.map((cta) => (
              <button
                key={cta.label}
                onClick={() => onCta(cta.target)}
                className={[
                  "group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all",
                  cta.primary
                    ? "bg-devin-gradient text-brand-ivory shadow-glow hover:brightness-110"
                    : "border border-brand-ivory/20 text-brand-ivory/90 hover:border-brand-ivory/40 hover:bg-brand-ivory/5",
                ].join(" ")}
              >
                <span>{cta.label}</span>
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {p.kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-xl border border-brand-ivory/10 bg-brand-green-mid/40 p-4 backdrop-blur-sm sm:p-5"
            >
              <div className="font-display text-2xl font-light leading-none text-brand-ivory sm:text-3xl">
                {k.value}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-brand-ivory/60 sm:text-xs">
                {k.label}
              </div>
              {k.caption && (
                <div className="mt-1 text-[10px] text-brand-ivory/35">{k.caption}</div>
              )}
              <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-brand-orange/10 blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-[10px] uppercase tracking-[0.28em] text-brand-ivory/40 sm:mt-12 sm:text-[11px]">
        Public references · illustrative framing · {intesa.brand.client}
      </p>
    </PanelShell>
  );
}
