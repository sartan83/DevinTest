"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { intesa } from "../data/intesa";
import { ExecutiveCounter } from "./ExecutiveCounter";
import { ProgressBar } from "./ProgressBar";
import { Panel1Opening } from "./panels/Panel1Opening";
import { Panel2Transformation } from "./panels/Panel2Transformation";
import { Panel3Dora } from "./panels/Panel3Dora";
import { Panel35Discovery } from "./panels/Panel35Discovery";
import { Panel4WhereDevinFits } from "./panels/Panel4WhereDevinFits";
import { Panel5UseCase } from "./panels/Panel5UseCase";
import { Panel6ExecutiveValue } from "./panels/Panel6ExecutiveValue";
import { Panel7CounterClimax } from "./panels/Panel7CounterClimax";
import { Panel8Lighthouse } from "./panels/Panel8Lighthouse";

const TOTAL_PANELS = 9;
const MOBILE_MAX_WIDTH = 767;

export function MicrositeShell() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const [isMobile, setIsMobile] = useState(false);

  // Track viewport orientation (horizontal panels on desktop, vertical on phones).
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(TOTAL_PANELS - 1, idx));
      if (isMobile) {
        el.scrollTo({ top: el.clientHeight * clamped, behavior: "smooth" });
      } else {
        el.scrollTo({ left: el.clientWidth * clamped, behavior: "smooth" });
      }
    },
    [isMobile]
  );

  // Track which panel is active from scroll position.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const idx = isMobile
          ? Math.round(el.scrollTop / el.clientHeight)
          : Math.round(el.scrollLeft / el.clientWidth);
        setActive((prev) => (prev === idx ? prev : idx));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  // When switching between horizontal and vertical modes, realign scroll to the
  // currently active panel so we don't end up stranded between two snaps.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (isMobile) {
      el.scrollTop = el.clientHeight * active;
      el.scrollLeft = 0;
    } else {
      el.scrollLeft = el.clientWidth * active;
      el.scrollTop = 0;
    }
    // Only realign on axis switch, not on every active change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // Mark panels as visited as they become active (drives counter).
  useEffect(() => {
    setVisited((prev) => {
      if (prev.has(active)) return prev;
      const next = new Set(prev);
      next.add(active);
      return next;
    });
  }, [active]);

  // Keyboard navigation (desktop; ignored on touch-only devices).
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          goTo(active + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          goTo(active - 1);
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(TOTAL_PANELS - 1);
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, goTo]);

  // On desktop, translate vertical wheel intent into horizontal scroll.
  // On mobile (vertical snap layout), the native wheel/touch behavior is what we want.
  useEffect(() => {
    if (isMobile) return;
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // If the user is clearly scrolling within a nested scrollable area, leave it.
      const path = e.composedPath() as HTMLElement[];
      for (const node of path) {
        if (node === el) break;
        if (!(node instanceof HTMLElement)) continue;
        if (node.dataset?.allowNativeScroll === "true") return;
      }
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isMobile]);

  const counterValue = useMemo(() => {
    let min = 0;
    let max = 0;
    for (const step of intesa.counter.steps) {
      const idx = step.panel - 1;
      if (visited.has(idx)) {
        min += step.addMin;
        max += step.addMax;
      }
    }
    // Clamp to final range once user has reached the climax panel.
    if (visited.has(7) /* Panel7CounterClimax */) {
      min = Math.max(min, intesa.counter.finalRange.min);
      max = Math.min(
        Math.max(max, intesa.counter.finalRange.max),
        intesa.counter.finalRange.max
      );
    }
    return { min, max };
  }, [visited]);

  const counterExpanded = active === 7; // Panel7CounterClimax is the climax.

  return (
    <div className="relative h-[100svh] w-screen overflow-hidden bg-brand-green text-brand-ivory">
      {/* Top bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 px-4 pt-3 sm:gap-6 sm:px-8 sm:pt-6 md:px-12">
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <LogoMark />
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/60 sm:text-[11px]">
              {intesa.brand.partner}
            </span>
            <span className="text-xs font-medium text-brand-ivory sm:text-sm">
              {intesa.brand.client} · {intesa.brand.sessionLabel}
            </span>
          </div>
        </div>

        <ExecutiveCounter
          min={counterValue.min}
          max={counterValue.max}
          expanded={counterExpanded}
        />
      </header>

      {/* Snap scroller: horizontal on desktop, vertical on mobile */}
      <div
        ref={scrollerRef}
        className={[
          "no-scrollbar h-full w-full",
          isMobile
            ? "scroll-snap-y overflow-y-auto overflow-x-hidden"
            : "scroll-snap-x overflow-x-auto overflow-y-hidden",
        ].join(" ")}
      >
        <div
          className={isMobile ? "flex w-full flex-col" : "flex h-full"}
          style={
            isMobile
              ? { height: `calc(${TOTAL_PANELS} * 100svh)` }
              : { width: `${TOTAL_PANELS * 100}vw` }
          }
        >
          <Panel1Opening onCta={(target) => goTo(target - 1)} />
          <Panel2Transformation />
          <Panel3Dora />
          <Panel35Discovery />
          <Panel4WhereDevinFits />
          <Panel5UseCase />
          <Panel6ExecutiveValue />
          <Panel7CounterClimax min={counterValue.min} max={counterValue.max} />
          <Panel8Lighthouse />
        </div>
      </div>

      {/* Bottom progress + nav */}
      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-3 px-4 pb-3 sm:gap-6 sm:px-8 sm:pb-6 md:px-12">
        <ProgressBar active={active} onSelect={goTo} isMobile={isMobile} />
        <div className="pointer-events-auto hidden items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-brand-ivory/50 md:flex">
          <KeyHint k="←" />
          <KeyHint k="→" />
          <span>navigate</span>
        </div>
      </footer>

      {/* Transient hint on first load */}
      <AnimatePresence>
        {active === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="pointer-events-none absolute bottom-16 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-brand-ivory/45 sm:bottom-20 sm:text-[11px]"
          >
            {isMobile ? "Swipe up or tap the dots" : "Swipe, scroll, or press →"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LogoMark() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-devin-gradient shadow-glow sm:h-9 sm:w-9">
      <span className="font-display text-sm font-semibold text-brand-ivory sm:text-base">D</span>
    </div>
  );
}

function KeyHint({ k }: { k: string }) {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-[4px] border border-brand-ivory/20 px-1 text-[10px] text-brand-ivory/70">
      {k}
    </span>
  );
}
