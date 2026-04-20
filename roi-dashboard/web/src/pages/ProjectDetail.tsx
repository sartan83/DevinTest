import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppState } from "../state";
import { ApiError, fetchProjects, pauseProject } from "../lib/api";
import type { ProjectSummary } from "../types";
import { fmtNum, fmtPct, fmtRelative, fmtUsd } from "../lib/format";
import clsx from "clsx";

export default function ProjectDetail() {
  const { tag = "" } = useParams();
  const decoded = decodeURIComponent(tag);
  const { apiKey, config } = useAppState();
  const nav = useNavigate();
  const [project, setProject] = useState<ProjectSummary | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pausing, setPausing] = useState(false);

  const load = useCallback(async () => {
    if (!apiKey) return;
    setLoading(true);
    try {
      const r = await fetchProjects(config);
      const p = r.projects.find((x) => x.tag === decoded) ?? null;
      setProject(p);
      setErr(p ? null : `No project "${decoded}" found.`);
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }, [apiKey, config, decoded]);

  useEffect(() => {
    if (!apiKey) {
      nav("/connect");
      return;
    }
    load();
    const id = window.setInterval(load, 8000);
    return () => window.clearInterval(id);
  }, [apiKey, load, nav]);

  async function onPause() {
    if (!confirm(`Pause all running sessions tagged "${decoded}"?`)) return;
    setPausing(true);
    try {
      const r = await pauseProject(decoded);
      await load();
      alert(
        `Paused ${r.paused_session_ids.length} session(s).${r.errors.length ? ` ${r.errors.length} error(s).` : ""}`
      );
    } catch (e) {
      alert(e instanceof ApiError ? e.message : "Pause failed.");
    } finally {
      setPausing(false);
    }
  }

  if (!apiKey) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <Link to="/" className="text-xs text-slate-400 hover:text-white">
            ← All projects
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight truncate">
            {decoded}
          </h1>
          {project && (
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              {project.running_count > 0 ? (
                <span className="pill bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  <span className="live-dot" />
                  {project.running_count} running now
                </span>
              ) : (
                <span className="pill bg-ink-800 text-slate-400 border border-ink-700">
                  idle
                </span>
              )}
              <span>last activity {fmtRelative(project.last_activity)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} className="btn-ghost" disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button
            className="btn-danger"
            disabled={!project || project.running_count === 0 || pausing}
            onClick={onPause}
          >
            {pausing ? "Pausing…" : "Pause project"}
          </button>
        </div>
      </div>

      {err && (
        <div className="card p-4 border-rose-500/30 bg-rose-500/5 text-sm text-rose-200">
          {err}
        </div>
      )}

      {project && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="Sessions" value={fmtNum(project.session_count, 0)} />
            <Stat label="ACU used" value={fmtNum(project.total_acu, 1)} />
            <Stat label="Devin cost" value={fmtUsd(project.devin_cost_usd)} />
            <Stat
              label="Saved vs vanilla"
              value={fmtUsd(
                Math.max(0, project.baselines.vanilla_usd - project.devin_cost_usd)
              )}
              highlight
            />
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <BaselineCard
              name="Vanilla dev"
              baseline={project.baselines.vanilla_usd}
              devin={project.devin_cost_usd}
              roiPct={project.roi.vs_vanilla_pct}
            />
            <BaselineCard
              name="Cursor-assisted"
              baseline={project.baselines.cursor_usd}
              devin={project.devin_cost_usd}
              roiPct={project.roi.vs_cursor_pct}
            />
            <BaselineCard
              name="Copilot-assisted"
              baseline={project.baselines.copilot_usd}
              devin={project.devin_cost_usd}
              roiPct={project.roi.vs_copilot_pct}
            />
          </div>

          <div className="card overflow-hidden">
            <div className="px-5 py-3 border-b border-ink-800/80 text-xs uppercase tracking-wider text-slate-500">
              Sessions ({project.sessions.length})
            </div>
            <div className="divide-y divide-ink-800/60">
              {project.sessions.map((s) => (
                <div
                  key={s.session_id}
                  className="px-5 py-3 flex items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={clsx(
                          "pill border text-xs",
                          s.is_running &&
                            "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
                          !s.is_running &&
                            s.status === "exit" &&
                            "bg-slate-500/10 text-slate-300 border-slate-500/20",
                          !s.is_running &&
                            s.status !== "exit" &&
                            "bg-ink-800 text-slate-400 border-ink-700"
                        )}
                      >
                        {s.is_running && <span className="live-dot" />}
                        {s.status}
                        {s.status_detail ? ` · ${s.status_detail}` : ""}
                      </span>
                      <div className="truncate text-slate-100">
                        {s.title ?? s.session_id}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 font-mono truncate">
                      {s.session_id}
                      {s.repo ? ` · ${s.repo}` : ""}
                      {s.updated_at ? ` · updated ${fmtRelative(s.updated_at)}` : ""}
                    </div>
                  </div>
                  <div className="text-right tabular-nums text-sm text-slate-300 w-24">
                    {s.acu != null ? fmtNum(s.acu, 2) : "—"} ACU
                  </div>
                  {s.url && (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost"
                    >
                      Open
                    </a>
                  )}
                </div>
              ))}
              {project.sessions.length === 0 && (
                <div className="p-6 text-center text-slate-500 text-sm">
                  No sessions in this project.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="card px-4 py-3">
      <div className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div
        className={clsx(
          "text-2xl font-semibold tabular-nums mt-1",
          highlight && "text-accent-soft"
        )}
      >
        {value}
      </div>
    </div>
  );
}

function BaselineCard({
  name,
  baseline,
  devin,
  roiPct,
}: {
  name: string;
  baseline: number;
  devin: number;
  roiPct: number;
}) {
  const savings = Math.max(0, baseline - devin);
  const good = roiPct > 0;
  return (
    <div className="card p-4 space-y-2">
      <div className="text-xs uppercase tracking-wider text-slate-500">{name}</div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-semibold tabular-nums">{fmtUsd(baseline)}</div>
        <div
          className={clsx(
            "text-sm font-medium tabular-nums",
            good ? "text-emerald-300" : roiPct < 0 ? "text-rose-300" : "text-slate-400"
          )}
        >
          {fmtPct(roiPct, 0)}
        </div>
      </div>
      <div className="text-xs text-slate-400">
        Devin: {fmtUsd(devin)} · saved {fmtUsd(savings)}
      </div>
    </div>
  );
}
