"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type BgVariant = "default" | "deep" | "cinematic" | "bright" | "clean";

type Props = {
  eyebrow?: string;
  tone?: "dark" | "ivory";
  children: ReactNode;
  /** Optional className forwarded to the inner container. */
  className?: string;
  /** Compact mode reduces vertical padding and eyebrow margin so dense panels
   * (Current State / Discovery Gaps / Demo) fit in a 1280×800 viewport without
   * intra-panel scrolling. */
  compact?: boolean;
  /** Subtle tonal variation per panel (visual rhythm). All variants stay
   * within the Intesa green-graphite-ivory-orange brand palette — only
   * gradient stops and opacity shift, no new hues. */
  bg?: BgVariant;
  /** Eyebrow size. `lg` bumps the eyebrow type scale + accent rule for
   * panels where the eyebrow is part of the narrative anchor (e.g. the
   * Demo panel). Default keeps the compact mode used everywhere else. */
  eyebrowSize?: "default" | "lg";
  /** Optional content rendered at the right end of the eyebrow row
   * (e.g. a client logo on the Opening panel). Reserves space inline
   * with the eyebrow so the logo balances the eyebrow on the left. */
  headerRight?: ReactNode;
};

const BG_CLASS: Record<BgVariant, string> = {
  default: "panel-bg",
  deep: "panel-bg-deep",
  cinematic: "panel-bg-cinematic",
  bright: "panel-bg-bright",
  clean: "panel-bg-clean",
};

export function PanelShell({
  eyebrow,
  tone = "dark",
  children,
  className,
  compact = false,
  bg = "default",
  eyebrowSize = "default",
  headerRight,
}: Props) {
  const isLgEyebrow = eyebrowSize === "lg";
  const showHeaderRow = Boolean(eyebrow) || Boolean(headerRight);
  return (
    <section
      className={[
        "scroll-snap-start relative flex h-[100svh] w-screen shrink-0 items-stretch",
        tone === "dark" ? `${BG_CLASS[bg]} text-brand-ivory` : "panel-bg-ivory text-brand-charcoal",
      ].join(" ")}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-10% 0px -10% 0px", amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "mx-auto flex w-full max-w-[1400px] flex-col overflow-y-auto px-5 sm:px-10 md:px-16 lg:px-24 md:justify-center",
          compact
            ? "pb-10 pt-16 sm:pb-12 sm:pt-16 lg:pb-14 lg:pt-20"
            : "pb-16 pt-24 sm:pb-20 sm:pt-24",
          className ?? "",
        ].join(" ")}
      >
        {showHeaderRow && (
          <div
            className={[
              "flex items-center justify-between gap-4",
              compact ? "mb-3" : "mb-6",
            ].join(" ")}
          >
            {eyebrow ? (
              <div
                className={[
                  "flex items-center",
                  isLgEyebrow ? "gap-4" : "gap-3",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-px",
                    isLgEyebrow ? "w-12" : "w-8",
                    tone === "dark"
                      ? "bg-brand-orange/70"
                      : "bg-brand-orange/80",
                  ].join(" ")}
                />
                <span
                  className={[
                    "uppercase",
                    isLgEyebrow
                      ? "font-display font-medium text-[15px] tracking-[0.28em] sm:text-[17px] lg:text-[19px]"
                      : "text-[11px] tracking-[0.32em]",
                    tone === "dark"
                      ? isLgEyebrow
                        ? "text-brand-ivory/96"
                        : "text-brand-ivory/75"
                      : isLgEyebrow
                        ? "text-brand-charcoal/96"
                        : "text-brand-charcoal/75",
                  ].join(" ")}
                >
                  {eyebrow}
                </span>
              </div>
            ) : (
              <span />
            )}
            {headerRight && (
              <div className="flex shrink-0 items-center">{headerRight}</div>
            )}
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
  compact = false,
  size,
}: {
  text: string;
  tone?: "dark" | "ivory";
  className?: string;
  /** Compact reduces font scale by ~25% for dense panels. */
  compact?: boolean;
  /** Optional explicit size override that wins over `compact`.
   * - "md" sits between default and compact; useful when the default
   *   scale is slightly too dominant for a panel but compact is too
   *   tight (e.g. the SDLC operating-model page). */
  size?: "md";
}) {
  const sizeClass =
    size === "md"
      ? "text-[1.65rem] sm:text-[2.4rem] lg:text-[3.25rem]"
      : compact
        ? "text-2xl sm:text-3xl lg:text-[2.5rem]"
        : "text-3xl sm:text-5xl lg:text-6xl";
  return (
    <h2
      className={[
        "font-display font-light leading-[1.05] tracking-displaytight text-balance",
        sizeClass,
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
  // Minimalism pass: many panels now ship with empty subheads. Render
  // nothing rather than an empty paragraph to avoid stray margin.
  if (children == null || children === "" || (Array.isArray(children) && children.length === 0)) {
    return null;
  }
  return (
    <p
      className={[
        "mt-4 max-w-3xl text-pretty text-sm leading-relaxed sm:mt-5 sm:text-base lg:text-lg",
        tone === "dark" ? "text-brand-ivory/82" : "text-brand-charcoal/82",
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
        tone === "dark" ? "text-brand-ivory/92" : "text-brand-charcoal/92",
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
