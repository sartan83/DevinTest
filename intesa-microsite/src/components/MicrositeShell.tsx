"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { intesa } from "../data/intesa";
import { ExecutiveCounter } from "./ExecutiveCounter";
import { ProgressBar } from "./ProgressBar";
import { Panel0Welcome } from "./panels/Panel0Welcome";
import { Panel1Opening } from "./panels/Panel1Opening";
import { Panel1bAgenda } from "./panels/Panel1bAgenda";
import { Panel2ExecutionGap } from "./panels/Panel2ExecutionGap";
import { Panel3CurrentState } from "./panels/Panel3CurrentState";
import { Panel35SdlcMap } from "./panels/Panel35SdlcMap";
import { Panel4ExecutiveDiscovery } from "./panels/Panel4ExecutiveDiscovery";
import { Panel5BusinessImpact } from "./panels/Panel5BusinessImpact";
import { Panel6EnterpriseTrust } from "./panels/Panel6EnterpriseTrust";
import { Panel8RoiSignal } from "./panels/Panel8RoiSignal";
import { Panel9ItauReference } from "./panels/Panel9ItauReference";
import { Panel10Pilot } from "./panels/Panel10Pilot";
import { Panel12FinalAsk } from "./panels/Panel12FinalAsk";
import { AppendixDiscoveryFramework } from "./panels/AppendixDiscoveryFramework";

// 12 main panels (index 0–11) + 1 appendix panel (index 12) reachable only
// via the discrete "Appendix" toggle in the header. Idx 0 is the
// pre-session executive opening screen. Hero idx 1, agenda idx 2, Why
// Now · 2029 idx 3, governed modernization workflow idx 6. The
// standalone Capacity Redeployment panel and the standalone
// Enterprise-Ready Execution panel were both removed during the
// Cognition-style reduction passes — capacity content lives in the
// ROI signal panel; governance/safeguard signals are now the third
// block of the 4-week pilot. Final panel (idx 11) is the Decision
// Point closer (scale-out criteria), replacing the earlier
// "Proposed next step" recap.
const MAIN_PANELS = 13;
const APPENDIX_INDEX = 13;
const TOTAL_PANELS = MAIN_PANELS + 1;
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
    (idx: number, opts: { allowAppendix?: boolean } = {}) => {
      const el = scrollerRef.current;
      if (!el) return;
      const max = opts.allowAppendix ? TOTAL_PANELS - 1 : MAIN_PANELS - 1;
      const clamped = Math.max(0, Math.min(max, idx));
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

  // Keyboard navigation. We listen on both the scroller element and the window
  // so keys work whether focus is on a CTA button, on the scroller itself, or
  // on the document body (including embedded / iframe contexts).
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTextInput =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (isTextInput) {
        return;
      }
      // Space and Enter natively activate BUTTON / A (role=button) elements; if
      // focus is on one we must not swallow them for panel navigation.
      const isActivatable =
        !!target && (target.tagName === "BUTTON" || target.tagName === "A");
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          if (active === APPENDIX_INDEX) {
            // No forward nav from the appendix; bounce back to last main panel.
            goTo(MAIN_PANELS - 1);
          } else {
            goTo(active + 1);
          }
          break;
        case " ":
          if (isActivatable) return;
          e.preventDefault();
          if (active === APPENDIX_INDEX) {
            goTo(MAIN_PANELS - 1);
          } else {
            goTo(active + 1);
          }
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          if (active === APPENDIX_INDEX) {
            goTo(MAIN_PANELS - 1);
          } else {
            goTo(active - 1);
          }
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(MAIN_PANELS - 1);
          break;
        case "Escape":
          if (active === APPENDIX_INDEX) {
            e.preventDefault();
            goTo(MAIN_PANELS - 1);
          }
          break;
        case "a":
        case "A":
          if (isActivatable) return;
          e.preventDefault();
          if (active === APPENDIX_INDEX) {
            goTo(MAIN_PANELS - 1);
          } else {
            goTo(APPENDIX_INDEX, { allowAppendix: true });
          }
          break;
      }
    };
    window.addEventListener("keydown", handler);
    // Make the scroller focusable on mount so keys "just work" without clicking.
    const el = scrollerRef.current;
    if (el && document.activeElement === document.body) {
      el.focus({ preventScroll: true });
    }
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [active, goTo]);

  // Keep latest active / goTo accessible from the wheel handler without
  // re-registering the listener on every state change.
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  const goToRef = useRef(goTo);
  useEffect(() => {
    goToRef.current = goTo;
  }, [goTo]);

  // On desktop, translate vertical wheel intent into horizontal panel advance.
  // We can't just do `scrollLeft += deltaY` because `scroll-snap-type: x mandatory`
  // will snap the container back to the starting panel whenever the scroll position
  // sits before the midpoint — a normal mouse-wheel tick (~100px) or a trackpad
  // nudge (~30px) therefore appeared to do nothing. Instead, accumulate wheel
  // intent and advance a whole panel at a time via goTo().
  useEffect(() => {
    if (isMobile) return;
    const el = scrollerRef.current;
    if (!el) return;

    const WHEEL_THRESHOLD = 30;
    const COOLDOWN_MS = 550;
    let accum = 0;
    let cooldownUntil = 0;
    let resetTimer: number | null = null;

    const onWheel = (e: WheelEvent) => {
      // Allow native scroll inside explicitly-marked nested scrollables.
      const path = e.composedPath() as HTMLElement[];
      for (const node of path) {
        if (node === el) break;
        if (!(node instanceof HTMLElement)) continue;
        if (node.dataset?.allowNativeScroll === "true") return;
      }
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      e.preventDefault();
      const now = performance.now();
      if (now < cooldownUntil) return;

      accum += e.deltaY;
      if (resetTimer !== null) window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        accum = 0;
        resetTimer = null;
      }, 200);

      if (Math.abs(accum) >= WHEEL_THRESHOLD) {
        const dir = accum > 0 ? 1 : -1;
        accum = 0;
        cooldownUntil = now + COOLDOWN_MS;
        goToRef.current(activeRef.current + dir);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (resetTimer !== null) window.clearTimeout(resetTimer);
    };
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
    // Per-panel additions are time-weighted to the 60-minute role-play
    // cadence (see counter.steps comments in intesa.ts). The counter
    // accumulates as the executive walks the panels and clamps at the
    // headline envelope.
    const finalMax = intesa.counter.finalRange.max;
    if (max > finalMax) max = finalMax;
    return { min, max };
  }, [visited]);

  const isAppendix = active === APPENDIX_INDEX;

  const toggleAppendix = useCallback(() => {
    if (isAppendix) {
      goTo(MAIN_PANELS - 1);
    } else {
      goTo(APPENDIX_INDEX, { allowAppendix: true });
    }
  }, [isAppendix, goTo]);

  return (
    <div className="relative h-[100svh] w-screen overflow-hidden bg-brand-green text-brand-ivory">
      {/* Top bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 px-4 pt-3 sm:gap-6 sm:px-8 sm:pt-6 md:px-12">
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <span className="text-xs font-medium text-brand-ivory sm:text-sm">
            {intesa.brand.client} · {intesa.brand.sessionLabel}
          </span>
        </div>

        <div className="pointer-events-auto flex items-start gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleAppendix}
            aria-pressed={isAppendix}
            className={[
              "hidden h-8 items-center gap-1.5 rounded-full border px-3 text-[10px] uppercase tracking-[0.24em] transition-colors sm:inline-flex sm:text-[11px]",
              isAppendix
                ? "border-brand-orange/45 bg-brand-orange/10 text-brand-ivory"
                : "border-brand-ivory/15 bg-brand-green-deep/40 text-brand-ivory/55 hover:border-brand-ivory/30 hover:text-brand-ivory/85",
            ].join(" ")}
            title={isAppendix ? "Return to main flow (Esc)" : "Open appendix (A)"}
          >
            <span aria-hidden className={isAppendix ? "text-brand-orange" : "text-brand-ivory/40"}>
              {isAppendix ? "←" : "¶"}
            </span>
            <span>{isAppendix ? "Back to flow" : "Appendix"}</span>
          </button>

          <ExecutiveCounter
            min={counterValue.min}
            max={counterValue.max}
          />
        </div>
      </header>

      {/* Snap scroller: horizontal on desktop, vertical on mobile */}
      <div
        ref={scrollerRef}
        tabIndex={0}
        onClick={() => scrollerRef.current?.focus({ preventScroll: true })}
        className={[
          "no-scrollbar h-full w-full outline-none",
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
          <Panel0Welcome onBegin={(idx) => goTo(idx)} />
          <Panel1Opening />
          <Panel1bAgenda />
          <Panel2ExecutionGap />
          {/* SDLC Execution Map comes BEFORE Validation: first show the
              quantitative SDLC effort distribution, then pause and ask
              whether the 70% execution zone is the right place to start. */}
          <Panel35SdlcMap />
          <Panel3CurrentState />
          <Panel4ExecutiveDiscovery />
          <Panel5BusinessImpact />
          <Panel6EnterpriseTrust />
          {/* Banking Proof comes BEFORE ROI: give the buyer banking-scale
              evidence first, then walk into the ROI / upside model. */}
          <Panel9ItauReference />
          <Panel8RoiSignal />
          <Panel10Pilot />
          <Panel12FinalAsk onCta={(target) => goTo(target - 1)} />
          <AppendixDiscoveryFramework />
        </div>
      </div>

      {/* Bottom progress + nav */}
      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-3 px-4 pb-3 sm:gap-6 sm:px-8 sm:pb-6 md:px-12">
        <ProgressBar active={active} onSelect={goTo} isMobile={isMobile} />
        <div className="pointer-events-auto hidden flex-col items-end gap-2 md:flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="logos/cognition-wordmark.svg"
            alt="Cognition"
            className="h-7 w-auto text-brand-ivory opacity-65 transition-opacity hover:opacity-90 sm:h-8 lg:h-9"
          />
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-brand-ivory/50">
            <KeyHint k="←" />
            <KeyHint k="→" />
            <span>navigate</span>
          </div>
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

function KeyHint({ k }: { k: string }) {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-[4px] border border-brand-ivory/20 px-1 text-[10px] text-brand-ivory/70">
      {k}
    </span>
  );
}
