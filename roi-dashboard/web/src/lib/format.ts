export function fmtUsd(n: number): string {
  if (!isFinite(n)) return "—";
  if (Math.abs(n) >= 1000)
    return n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

export function fmtNum(n: number, digits = 1): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export function fmtPct(n: number, digits = 0): string {
  if (!isFinite(n)) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toLocaleString("en-US", { maximumFractionDigits: digits })}%`;
}

export function fmtRelative(ts: number | string | null): string {
  if (!ts) return "never";
  let epochSec: number;
  if (typeof ts === "string") {
    const ms = Date.parse(ts);
    if (!isFinite(ms)) return "never";
    epochSec = ms / 1000;
  } else {
    // numeric timestamps may be seconds or milliseconds — auto-detect
    epochSec = ts > 1e12 ? ts / 1000 : ts;
  }
  const diff = Date.now() / 1000 - epochSec;
  if (diff < 0) return "just now";
  if (diff < 60) return `${Math.round(diff)}s ago`;
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
  return `${Math.round(diff / 86400)}d ago`;
}
