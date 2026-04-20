import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppState } from "../state";
import { ApiError, fetchProjects, pauseProject } from "../lib/api";
import type { ProjectSummary, ProjectsResponse } from "../types";
import { fmtNum, fmtPct, fmtRelative, fmtUsd } from "../lib/format";
import clsx from "clsx";

export default function ProjectDetail() {
  const { tag = "" } = useParams();
  const decoded = decodeURIComponent(tag);
  const { apiKey, config, projectNames, renameProject } = useAppState();
  const nav = useNavigate();
  const [response, setResponse] = useState<ProjectsResponse | null>(null);
  const [project, setProject] = useState<ProjectSummary | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pausing, setPausing] = useState(false);

  const load = useCallback(async () => {
    if (!apiKey) return;
    setLoading(true);
    try {
      const r = await fetchProjects(config);
      setResponse(r);
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

  function onRename() {
    if (!project) return;
    const current = projectNames[decoded] ?? project.display_name;
    const next = window.prompt(
      projectNames[decoded] != null
        ? "Update project name (leave empty to reset):"
        : "Rename this project (stored only in this browser):",
      current
    );
    if (next === null) return;
    renameProject(decoded, next.trim() ? next : null);
  }

  async function onPause() {
    const label = project
      ? projectNames[decoded] ?? project.display_name
      : decoded;
    if (!confirm(`Pause all running sessions in "${label}"?`)) return;
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
  const pauseAvail = response?.pause_available ?? true;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <Link to="/" className="text-xs text-slate-400 hover:text-white">
            ← All projects
          </Link>
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight truncate">
              {project ? (projectNames[decoded] ?? project.display_name) : decoded}
            </h1>
            {project && (
              <button
                type="button"
                onClick={onRename}
                className="text-slate-500 hover:text-slate-200 text-sm shrink-0"
                title={projectNames[decoded] != null ? "Edit custom name" : "Rename project"}
                aria-label="Rename project"
              >
                ✎
              </button>
            )}
          </div>
          {project && projectNames[decoded] != null && (
            <div className="text-xs text-slate-500/80 mt-0.5">
              original: {project.display_name}
            </div>
          )}
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
            disabled={!project || project.running_count === 0 || pausing || !pauseAvail}
            title={!pauseAvail ? "Pause requires a service-user key (cog_)" : undefined}
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Tile
              color="sessions"
              label="Sessions"
              value={fmtNum(project.session_count, 0)}
              note={`${project.running_count} running`}
              live={project.running_count > 0}
            />
            <Tile
              color="acu"
              label="ACU used"
              value={project.total_acu != null ? fmtNum(project.total_acu, 1) : "—"}
              note={response?.estimated ? "Estimated from duration" : "Real usage"}
            />
            <Tile
              color="cost"
              label="Devin cost"
              value={project.devin_cost_usd != null ? fmtUsd(project.devin_cost_usd) : "—"}
              note={`@ $${config.acu_rate_usd}/ACU`}
            />
            <Tile
              color="saved"
              label="Saved vs vanilla"
              value={
                project.baselines && project.devin_cost_usd != null
                  ? fmtUsd(
                      Math.max(
                        0,
                        project.baselines.vanilla_usd - project.devin_cost_usd
                      )
                    )
                  : "—"
              }
              note={
                project.roi
                  ? `${fmtPct(project.roi.vs_vanilla_pct, 0)} ROI`
                  : undefined
              }
            />
          </div>

          {response?.estimated && (
            <div className="card p-4 border-amber-500/30 bg-amber-500/5 text-sm text-amber-200">
              <span className="font-medium text-amber-100">Estimated.</span>{" "}
              ACU and cost are approximated from session wall-clock duration at{" "}
              <code className="font-mono">{response.estimated_acus_per_hour} ACU/hr</code>
              {" "}(tunable in <Link className="underline hover:text-white" to="/settings">Settings</Link>).
              For billed numbers, use a service-user key (<code className="font-mono">cog_…</code>).
            </div>
          )}
          {project.baselines && project.roi && project.devin_cost_usd != null && (
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
          )}

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
                        {s.status_detail && s.status_detail !== s.status
                          ? ` · ${s.status_detail}`
                          : ""}
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

type TileColor = "acu" | "cost" | "saved" | "sessions";

function Tile({
  color,
  label,
  value,
  note,
  live,
}: {
  color: TileColor;
  label: string;
  value: string;
  note?: string;
  live?: boolean;
}) {
  const gradients: Record<TileColor, string> = {
    acu: "from-violet-500/25 to-violet-500/0",
    cost: "from-cyan-400/20 to-cyan-400/0",
    saved: "from-green-400/25 to-green-400/0",
    sessions: "from-fuchsia-400/25 to-fuchsia-400/0",
  };
  const valueColors: Record<TileColor, string> = {
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
  const ratio = baseline > 0 ? Math.min(1, devin / baseline) : 0;
  return (
    <div className="card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
          {name}
        </div>
        <div
          className={clsx(
            "text-sm font-semibold tabular-nums",
            good ? "text-kpi-saved" : roiPct < 0 ? "text-rose-300" : "text-slate-400"
          )}
        >
          {good ? "+" : ""}
          {fmtPct(roiPct, 0)}
        </div>
      </div>
      <div>
        <div className="text-3xl font-semibold tabular-nums tracking-tight">
          {fmtUsd(baseline)}
        </div>
        <div className="text-xs text-slate-500 mt-1">
          Devin: {fmtUsd(devin)} · saved {fmtUsd(savings)}
        </div>
      </div>
      <div className="h-1.5 w-full rounded-full bg-ink-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-kpi-acu to-fuchsia-400"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}
