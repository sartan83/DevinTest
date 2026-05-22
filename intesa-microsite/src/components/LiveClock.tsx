"use client";

import { useEffect, useState } from "react";

/**
 * Live UK clock for the top-left header slot. Replaces the static
 * session label per user direction — the header now reads as a
 * subtle live timestamp anchoring the executive context.
 *
 * Format: HH:MM (24h), Europe/London timezone.
 * Updates every 30s — granular enough to feel live without forcing
 * a re-render every second during a presentation.
 */
function formatUkTime(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  }).format(d);
}

export function LiveClock({ className }: { className?: string }) {
  // Render an empty string on the server / first paint so the
  // server-rendered HTML matches the client. The real time fills
  // in on mount; avoids hydration mismatches.
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => setTime(formatUkTime(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className={
        className ??
        "font-mono text-xs font-medium tabular-nums text-brand-ivory sm:text-sm"
      }
      aria-label="Current UK time"
      suppressHydrationWarning
    >
      {time}
    </span>
  );
}
