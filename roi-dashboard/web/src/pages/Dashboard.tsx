import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../state";
import { fetchProjects, ApiError, pauseProject } from "../lib/api";
import type { ProjectsResponse, SessionSummary } from "../types";
import { fmtNum, fmtPct, fmtRelative, fmtUsd } from "../lib/format";
import clsx from "clsx";

const POLL_MS = 8000;

type KpiColor = "acu" | "cost" | "saved" | "sessions";

export default function Dashboard() {
  const { apiKey, config, projectNames, renameProject } = useAppState();
  const nav = useNavigate();
  const [data, setData] = useState<ProjectsResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pausing, setPausing] = useState<string | null>(null);
  const [range, setRange] = useState<7 | 14 | 30>(7);
  const timerRef = useRef<number | null>(null);

  const load = useCallback(async () => {
    if (!apiKey) return;
    setLoading(true);
    try {
      const r = await fetchProjects(config);
      setData(r);
      setErr(null);
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, [apiKey, config]);

  useEffect(() => {
    if (!apiKey) {
      nav("/connect");
      return;
    }
    load();
    timerRef.current = window.setInterval(load, POLL_MS);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [apiKey, load, nav]);

  function onRename(tag: string, current: string, hasCustom: boolean) {
    const next = window.prompt(
      hasCustom
        ? "Update project name (leave empty to reset):"
        : "Rename this project (stored only in this browser):",
      current
    );
    if (next === null) return;
    renameProject(tag, next.trim() ? next : null);
  }

  async function onPause(tag: string) {
    const label =
      projectNames[tag] ??
      data?.projects.find((p) => p.tag === tag)?.display_name ??
      tag;
    if (!confirm(`Pause all running sessions in "${label}"?`)) return;
    setPausing(tag);
    try {
      const r = await pauseProject(tag);
      await load();
      alert(
        `Paused ${r.paused_session_ids.length} session(s).` +
          (r.errors.length ? ` ${r.errors.length} error(s).` : "")
      );
    } catch (e) {
      alert(e instanceof ApiError ? e.message : "Pause failed.");
    } finally {
      setPausing(null);
    }
  }

  const allSessions = useMemo<SessionSummary[]>(() => {
    if (!data) return [];
    const by: Record<string, SessionSummary> = {};
    for (const p of data.projects)
      for (const s of p.sessions) by[s.session_id] = s;
    return Object.values(by);
  }, [data]);

  if (!apiKey) return null;

  const t = data?.totals;
  const pauseAvail = data?.pause_available ?? true;
  const saved =
    t?.vanilla_usd != null && t?.devin_cost_usd != null
      ? Math.max(0, t.vanilla_usd - t.devin_cost_usd)
      : null;
  const updatedAt = data?.fetched_at
    ? new Date(data.fetched_at * 1000).toLocaleTimeString()
    : "—";

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
            <span>
              {t?.running ?? 0} running · {t?.sessions ?? 0} sessions · {t?.projects ?? 0} projects
            </span>
            <span className="text-slate-600">·</span>
            <span>updated {updatedAt}</span>
          </div>
        </div>
        <button onClick={load} className="btn-ghost" disabled={loading}>
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {data?.estimated && (
        <div className="card p-4 border-amber-500/30 bg-amber-500/5 text-sm text-amber-200 flex items-start gap-3">
          <span className="pill bg-amber-500/20 text-amber-200 border border-amber-500/30 shrink-0">
            estimated
          </span>
          <div className="space-y-1">
            <div className="font-medium text-amber-100">
              Cost and ROI are estimated from session duration, not real ACU usage.
            </div>
            <div className="text-amber-200/80">
              You're signed in with a personal key (<code className="font-mono">apk_user_…</code>).
              Cost = <code className="font-mono">
                duration × {data.estimated_acus_per_hour ?? config.estimated_acus_per_hour} ACU/hr × ${config.acu_rate_usd}/ACU
              </code>.
              Tune the ACU/hr in <Link className="underline hover:text-white" to="/settings">Settings</Link>,
              or use a service-user key (<code className="font-mono">cog_…</code>) for real numbers + pause.
            </div>
          </div>
        </div>
      )}

      {err && (
        <div className="card p-4 border-rose-500/30 bg-rose-500/5 text-sm text-rose-200">
          {err}
        </div>
      )}

      {/* KPI tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile
          color="acu"
          label="Total ACU used"
          value={t?.acu != null ? fmtNum(t.acu, 1) : "—"}
          note={
            data?.estimated ? "Estimated from duration" : "Real usage from Devin"
          }
        />
        <KpiTile
          color="cost"
          label="Devin cost"
          value={t?.devin_cost_usd != null ? fmtUsd(t.devin_cost_usd) : "—"}
          note={`@ $${config.acu_rate_usd}/ACU`}
        />
        <KpiTile
          color="saved"
          label="Saved vs vanilla"
          value={saved != null ? fmtUsd(saved) : "—"}
          note={
            t?.vanilla_usd && t?.devin_cost_usd
              ? `${fmtPct(
                  ((t.vanilla_usd - t.devin_cost_usd) / t.devin_cost_usd) * 100
                )} ROI`
              : "vs $" + config.hourly_rate_usd + "/hr baseline"
          }
        />
        <KpiTile
          color="sessions"
          label="Sessions"
          value={fmtNum(t?.sessions ?? 0, 0)}
          note={`${t?.running ?? 0} running · ${t?.projects ?? 0} projects`}
          live={(t?.running ?? 0) > 0}
        />
      </div>

      {/* Daily usage chart */}
      <div className="card p-5">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h3 className="font-semibold tracking-tight">Daily usage ({range}d)</h3>
            <div className="text-xs text-slate-500 mt-0.5">
              ACU per day · {data?.estimated ? "estimated" : "real"}
            </div>
          </div>
          <div className="flex gap-1">
            {([7, 14, 30] as const).map((r) => (
              <button
                key={r}
                className={clsx(
                  "rounded-md px-2.5 py-1 text-xs border",
                  range === r
                    ? "bg-ink-800 border-ink-600 text-white"
                    : "border-ink-700/60 text-slate-400 hover:text-white hover:bg-ink-800/60"
                )}
                onClick={() => setRange(r)}
              >
                {r}d
              </button>
            ))}
          </div>
        </div>
        <DailyUsageChart sessions={allSessions} days={range} />
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
          <Legend color="#a78bfa" label="ACU" />
          <Legend color="#4ade80" label="running day" dashed />
        </div>
      </div>

      {/* Projects table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-800/60">
          <div>
            <h3 className="font-semibold tracking-tight">Projects</h3>
            <div className="text-xs text-slate-500 mt-0.5">
              Grouped by session tag
              {config.tag_prefix ? ` (prefix: "${config.tag_prefix}")` : ""}
              {" · "}click ✎ to rename
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-slate-500 border-b border-ink-800/60">
          <div className="col-span-3">Project</div>
          <div className="col-span-1 text-right">Sessions</div>
          <div className="col-span-1 text-right">ACU</div>
          <div className="col-span-2 text-right">Devin cost</div>
          <div className="col-span-1 text-right">vs Vanilla</div>
          <div className="col-span-1 text-right">vs Cursor</div>
          <div className="col-span-1 text-right">vs Copilot</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {data?.projects.length === 0 && (
          <div className="p-10 text-center text-slate-400 text-sm">
            No sessions yet. Start one in the Devin app and it'll appear here.
          </div>
        )}

        {data?.projects.map((p) => {
          const label = projectNames[p.tag] ?? p.display_name;
          const isRenamed = projectNames[p.tag] != null;
          return (
            <div
              key={p.tag}
              className="grid grid-cols-12 gap-2 px-5 py-4 items-center border-b border-ink-800/40 last:border-b-0 hover:bg-ink-800/30"
            >
              <div className="col-span-3 min-w-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Link
                    to={`/p/${encodeURIComponent(p.tag)}`}
                    className="font-medium text-slate-100 hover:text-accent truncate"
                    title={label}
                  >
                    {label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => onRename(p.tag, label, isRenamed)}
                    className="shrink-0 text-slate-500 hover:text-slate-200 text-xs"
                    title={isRenamed ? "Edit custom name" : "Rename project"}
                    aria-label="Rename project"
                  >
                    ✎
                  </button>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                  {p.running_count > 0 ? (
                    <span className="pill bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      <span className="live-dot" />
                      {p.running_count} running
                    </span>
                  ) : (
                    <span className="pill bg-ink-800 text-slate-400 border border-ink-700/60">
                      idle
                    </span>
                  )}
                  <span>last {fmtRelative(p.last_activity)}</span>
                  {isRenamed && (
                    <span className="text-slate-600">· {p.display_name}</span>
                  )}
                </div>
              </div>
              <div className="col-span-1 text-right tabular-nums text-slate-300">
                {p.session_count}
              </div>
              <div className="col-span-1 text-right tabular-nums text-kpi-acu">
                {p.total_acu != null ? fmtNum(p.total_acu, 1) : "—"}
              </div>
              <div className="col-span-2 text-right tabular-nums text-kpi-cost">
                {p.devin_cost_usd != null ? fmtUsd(p.devin_cost_usd) : "—"}
              </div>
              <RoiCell pct={p.roi?.vs_vanilla_pct ?? null} />
              <RoiCell pct={p.roi?.vs_cursor_pct ?? null} />
              <RoiCell pct={p.roi?.vs_copilot_pct ?? null} />
              <div className="col-span-2 flex justify-end gap-2">
                <Link
                  to={`/p/${encodeURIComponent(p.tag)}`}
                  className="btn-ghost"
                >
                  Details
                </Link>
                <button
                  className="btn-danger"
                  disabled={
                    !pauseAvail || p.running_count === 0 || pausing === p.tag
                  }
                  title={
                    !pauseAvail
                      ? "Pause requires a service-user key (cog_)"
                      : undefined
                  }
                  onClick={() => onPause(p.tag)}
                >
                  {pausing === p.tag ? "Pausing…" : "Pause"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent sessions */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-800/60">
          <div>
            <h3 className="font-semibold tracking-tight">Recent sessions</h3>
            <div className="text-xs text-slate-500 mt-0.5">
              Last {Math.min(10, allSessions.length)} · sorted by activity
            </div>
          </div>
        </div>
        {allSessions.length === 0 && (
          <div className="p-10 text-center text-slate-400 text-sm">
            No sessions.
          </div>
        )}
        {allSessions.slice(0, 10).map((s) => (
          <div
            key={s.session_id}
            className="grid grid-cols-12 gap-3 items-center px-5 py-3 text-sm border-b border-ink-800/40 last:border-b-0 hover:bg-ink-800/30"
          >
            <div className="col-span-5 min-w-0">
              <a
                href={s.url ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="truncate block text-slate-100 hover:text-accent"
                title={s.title ?? s.session_id}
              >
                {s.title ?? "Untitled session"}
              </a>
              <div className="text-xs text-slate-500 font-mono truncate">
                {s.session_id}
              </div>
            </div>
            <div className="col-span-2">
              {s.is_running ? (
                <span className="pill bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  <span className="live-dot" /> running
                </span>
              ) : (
                <span className="pill bg-ink-800 text-slate-400 border border-ink-700/60">
                  {String(s.status_detail ?? s.status ?? "done")}
                </span>
              )}
            </div>
            <div className="col-span-2 text-right tabular-nums text-kpi-acu">
              {s.acu != null ? fmtNum(s.acu, 1) : "—"} ACU
            </div>
            <div className="col-span-3 text-right text-xs text-slate-500">
              {fmtRelative(s.updated_at ?? s.created_at)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── KPI tile ───────────────────────────────────────────────────────────── */

function KpiTile({
  color,
  label,
  value,
  note,
  live,
}: {
  color: KpiColor;
  label: string;
  value: string;
  note?: string;
  live?: boolean;
}) {
  const gradients: Record<KpiColor, string> = {
    acu: "from-violet-500/25 to-violet-500/0",
    cost: "from-cyan-400/20 to-cyan-400/0",
    saved: "from-green-400/25 to-green-400/0",
    sessions: "from-fuchsia-400/25 to-fuchsia-400/0",
  };
  const valueColors: Record<KpiColor, string> = {
    acu: "text-kpi-acu",
    cost: "text-kpi-cost",
    saved: "text-kpi-saved",
    sessions: "text-kpi-sessions",
  };
  return (
    <div className="kpi-tile">
      <div
        className={clsx(
          "absolute inset-0 bg-gradient-to-br opacity-80 pointer-events-none",
          gradients[color]
        )}
      />
      <div className="relative">
        <div className="kpi-label flex items-center gap-2">
          {live && <span className="live-dot" />}
          {label}
        </div>
        <div className={clsx("kpi-value", valueColors[color])}>{value}</div>
        {note && <div className="kpi-note">{note}</div>}
      </div>
    </div>
  );
}

/* ─── Daily usage bar chart (pure CSS/SVG) ───────────────────────────────── */

function DailyUsageChart({
  sessions,
  days,
}: {
  sessions: SessionSummary[];
  days: number;
}) {
  const buckets = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const result: { date: Date; acu: number; running: boolean }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      result.push({ date: d, acu: 0, running: false });
    }
    const startMs = result[0].date.getTime();
    for (const s of sessions) {
      if (s.acu == null) continue;
      const ts = parseTs(s.updated_at ?? s.created_at);
      if (ts == null) continue;
      const dayMs = new Date(ts).setHours(0, 0, 0, 0);
      if (dayMs < startMs) continue;
      const idx = Math.floor((dayMs - startMs) / (1000 * 60 * 60 * 24));
      if (idx < 0 || idx >= result.length) continue;
      result[idx].acu += s.acu;
      if (s.is_running) result[idx].running = true;
    }
    return result;
  }, [sessions, days]);

  const max = Math.max(1, ...buckets.map((b) => b.acu));
  const formatter = new Intl.DateTimeFormat(undefined, {
    month: "numeric",
    day: "numeric",
  });

  return (
    <div>
      <div className="flex items-end gap-1.5 h-40">
        {buckets.map((b, i) => {
          const h = (b.acu / max) * 100;
          const empty = b.acu === 0;
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-end group relative"
            >
              <div className="text-[10px] text-slate-500 tabular-nums mb-1 opacity-0 group-hover:opacity-100 transition">
                {fmtNum(b.acu, 1)}
              </div>
              <div
                className={clsx(
                  "w-full rounded-t-md transition-all",
                  empty ? "bg-ink-800/70" : "bg-gradient-to-t from-violet-600 to-violet-400",
                  b.running && "ring-1 ring-emerald-400/70"
                )}
                style={{
                  height: empty ? "4px" : `max(4px, ${h}%)`,
                  minHeight: "4px",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        {buckets.map((b, i) => (
          <div
            key={i}
            className="flex-1 text-[10px] text-slate-500 text-center tabular-nums"
          >
            {formatter.format(b.date)}
          </div>
        ))}
      </div>
    </div>
  );
}

function Legend({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={clsx("inline-block h-2 w-4 rounded-sm", dashed && "border border-dashed")}
        style={{
          backgroundColor: dashed ? "transparent" : color,
          borderColor: dashed ? color : undefined,
        }}
      />
      {label}
    </span>
  );
}

/* ─── ROI cell ───────────────────────────────────────────────────────────── */

function RoiCell({ pct }: { pct: number | null }) {
  if (pct == null)
    return <div className="col-span-1 text-right text-slate-500">—</div>;
  const pos = pct > 0;
  return (
    <div
      className={clsx(
        "col-span-1 text-right tabular-nums",
        pos ? "text-kpi-saved" : pct < 0 ? "text-rose-300" : "text-slate-300"
      )}
    >
      {pos ? "+" : ""}
      {fmtPct(pct)}
    </div>
  );
}

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function parseTs(v: number | string | null | undefined): number | null {
  if (v == null) return null;
  if (typeof v === "number") return v > 1e12 ? v : v * 1000;
  const d = new Date(v);
  const n = d.getTime();
  return Number.isFinite(n) ? n : null;
}
