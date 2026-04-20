import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../state";
import { fetchProjects, ApiError, pauseProject } from "../lib/api";
import type { ProjectsResponse } from "../types";
import { fmtNum, fmtPct, fmtRelative, fmtUsd } from "../lib/format";
import clsx from "clsx";

const POLL_MS = 8000;

export default function Dashboard() {
  const { apiKey, config } = useAppState();
  const nav = useNavigate();
  const [data, setData] = useState<ProjectsResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pausing, setPausing] = useState<string | null>(null);
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

  async function onPause(tag: string) {
    if (!confirm(`Pause all running sessions tagged "${tag}"?`)) return;
    setPausing(tag);
    try {
      const r = await pauseProject(tag);
      await load();
      const msg =
        `Paused ${r.paused_session_ids.length} session(s).` +
        (r.errors.length ? ` ${r.errors.length} error(s).` : "");
      alert(msg);
    } catch (e) {
      alert(e instanceof ApiError ? e.message : "Pause failed.");
    } finally {
      setPausing(null);
    }
  }

  if (!apiKey) return null;

  const t = data?.totals;
  const costAvail = data?.cost_available ?? true;
  const pauseAvail = data?.pause_available ?? true;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-slate-400 text-sm">
            Grouped by session tag{config.tag_prefix ? ` (prefix: "${config.tag_prefix}")` : ""}.
            Polling every {POLL_MS / 1000}s.
          </p>
        </div>
        <button
          onClick={load}
          className="btn-ghost"
          disabled={loading}
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {data && !costAvail && (
        <div className="card p-4 border-amber-500/30 bg-amber-500/5 text-sm text-amber-200 flex items-start gap-3">
          <span className="pill bg-amber-500/20 text-amber-200 border border-amber-500/30 shrink-0">
            v1 mode
          </span>
          <div className="space-y-1">
            <div className="font-medium text-amber-100">
              Cost, ROI, and pause are disabled for personal keys.
            </div>
            <div className="text-amber-200/80">
              You're signed in with a legacy personal key (<code className="font-mono">apk_user_…</code>).
              The v1 API doesn't expose ACU usage or an archive endpoint — switch to a service-user key
              (<code className="font-mono">cog_…</code>) on <a
                className="underline hover:text-white"
                href="https://docs.devin.ai/api-reference/overview"
                target="_blank" rel="noreferrer"
              >docs.devin.ai</a> to unlock ROI + pause.
            </div>
          </div>
        </div>
      )}

      {err && (
        <div className="card p-4 border-rose-500/30 bg-rose-500/5 text-sm text-rose-200">
          {err}
        </div>
      )}

      {t && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Kpi label="Projects" value={fmtNum(t.projects, 0)} />
          <Kpi
            label="Running now"
            value={fmtNum(t.running, 0)}
            accent={t.running > 0 ? "emerald" : "slate"}
            live={t.running > 0}
          />
          <Kpi label="Total ACU" value={t.acu != null ? fmtNum(t.acu, 1) : "—"} />
          <Kpi
            label="Devin cost"
            value={t.devin_cost_usd != null ? fmtUsd(t.devin_cost_usd) : "—"}
          />
          <Kpi
            label="Saved vs vanilla"
            value={
              t.vanilla_usd != null && t.devin_cost_usd != null
                ? fmtUsd(Math.max(0, t.vanilla_usd - t.devin_cost_usd))
                : "—"
            }
            accent="accent"
          />
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-5 py-3 text-xs uppercase tracking-wider text-slate-500 border-b border-ink-800/80">
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
            No sessions found yet. Tag your Devin sessions to group them as projects here.
          </div>
        )}
        {data?.projects.map((p) => (
          <div
            key={p.tag}
            className="grid grid-cols-12 gap-2 px-5 py-4 items-center border-b border-ink-800/60 last:border-b-0 hover:bg-ink-800/30"
          >
            <div className="col-span-3 min-w-0">
              <Link
                to={`/p/${encodeURIComponent(p.tag)}`}
                className="font-medium text-slate-100 hover:text-accent truncate block"
              >
                {p.tag}
              </Link>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                {p.running_count > 0 ? (
                  <span className="pill bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <span className="live-dot" />
                    {p.running_count} running
                  </span>
                ) : (
                  <span className="pill bg-ink-800 text-slate-400 border border-ink-700">
                    idle
                  </span>
                )}
                <span>last {fmtRelative(p.last_activity)}</span>
              </div>
            </div>
            <div className="col-span-1 text-right tabular-nums">{p.session_count}</div>
            <div className="col-span-1 text-right tabular-nums">
              {p.total_acu != null ? fmtNum(p.total_acu, 1) : "—"}
            </div>
            <div className="col-span-2 text-right tabular-nums">
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
                disabled={!pauseAvail || p.running_count === 0 || pausing === p.tag}
                title={!pauseAvail ? "Pause requires a service-user key (cog_)" : undefined}
                onClick={() => onPause(p.tag)}
              >
                {pausing === p.tag ? "Pausing…" : "Pause"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  accent = "slate",
  live = false,
}: {
  label: string;
  value: string;
  accent?: "slate" | "emerald" | "accent";
  live?: boolean;
}) {
  return (
    <div className="card px-4 py-3">
      <div className="text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
        {live && <span className="live-dot" />}
        {label}
      </div>
      <div
        className={clsx(
          "text-2xl font-semibold tabular-nums mt-1",
          accent === "emerald" && "text-emerald-300",
          accent === "accent" && "text-accent-soft"
        )}
      >
        {value}
      </div>
    </div>
  );
}

function RoiCell({ pct }: { pct: number | null }) {
  if (pct == null)
    return (
      <div className="col-span-1 text-right tabular-nums text-sm text-slate-500">
        —
      </div>
    );
  const good = pct > 0;
  return (
    <div
      className={clsx(
        "col-span-1 text-right tabular-nums text-sm",
        good ? "text-emerald-300" : pct < 0 ? "text-rose-300" : "text-slate-400"
      )}
    >
      {fmtPct(pct, 0)}
    </div>
  );
}
