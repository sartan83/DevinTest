"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  tone?: "dark" | "ivory";
  children: ReactNode;
  /** Optional className forwarded to the inner container. */
  className?: string;
};

export function PanelShell({ eyebrow, tone = "dark", children, className }: Props) {
  return (
    <section
      className={[
        "scroll-snap-start relative flex h-[100svh] w-screen shrink-0 items-stretch",
        tone === "dark" ? "panel-bg text-brand-ivory" : "panel-bg-ivory text-brand-charcoal",
      ].join(" ")}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-10% 0px -10% 0px", amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "mx-auto flex w-full max-w-[1400px] flex-col overflow-y-auto px-5 pb-16 pt-24 sm:px-10 sm:py-24 sm:justify-center md:px-16 md:overflow-visible lg:px-24",
          className ?? "",
        ].join(" ")}
      >
        {eyebrow && (
          <div className="mb-6 flex items-center gap-3">
            <span
              className={[
                "h-px w-8",
                tone === "dark" ? "bg-brand-orange/70" : "bg-brand-orange/80",
              ].join(" ")}
            />
            <span
              className={[
                "text-[11px] uppercase tracking-[0.32em]",
                tone === "dark" ? "text-brand-ivory/60" : "text-brand-charcoal/60",
              ].join(" ")}
            >
              {eyebrow}
            </span>
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}

export function PanelHeadline({
  text,
  tone = "dark",
  className,
}: {
  text: string;
  tone?: "dark" | "ivory";
  className?: string;
}) {
  return (
    <h2
      className={[
        "font-display font-light leading-[1.05] tracking-displaytight text-balance",
        "text-3xl sm:text-5xl lg:text-6xl",
        tone === "dark" ? "text-brand-ivory" : "text-brand-charcoal",
        className ?? "",
      ].join(" ")}
    >
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </h2>
  );
}

export function PanelSubhead({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "ivory";
  className?: string;
}) {
  return (
    <p
      className={[
        "mt-4 max-w-3xl text-pretty text-base leading-relaxed sm:mt-6 sm:text-lg lg:text-xl",
        tone === "dark" ? "text-brand-ivory/70" : "text-brand-charcoal/70",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </p>
  );
}

export function PanelClosing({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "ivory";
}) {
  return (
    <div
      className={[
        "mt-10 flex items-center gap-4",
        tone === "dark" ? "text-brand-ivory/80" : "text-brand-charcoal/80",
      ].join(" ")}
    >
      <span
        className={[
          "h-px w-10",
          tone === "dark" ? "bg-brand-orange/60" : "bg-brand-orange/80",
        ].join(" ")}
      />
      <span className="text-sm uppercase tracking-[0.28em]">{children}</span>
    </div>
  );
}
