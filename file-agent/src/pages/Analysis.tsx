import { useState } from "react";
import { api } from "../api/client";
import type { PlanSummary, ProposedAction } from "../types";
import ConfidenceBadge from "../components/ConfidenceBadge";
import PathPair from "../components/PathPair";

interface Props {
  planId: string | null;
  onPlanId: (id: string | null) => void;
}

export default function Analysis({ planId, onPlanId }: Props) {
  const [summary, setSummary] = useState<PlanSummary | null>(null);
  const [actions, setActions] = useState<ProposedAction[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");

  const runAnalyze = async (compute_hashes = true) => {
    setLoading(true);
    setStatus("Scanning…");
    try {
      const scan = await api.scan({ compute_hashes });
      setStatus(`Scanned ${scan.total_files} files. Planning…`);
      const plan = await api.createPlan({});
      onPlanId(plan.plan_id);
      const full = await api.getPlan(plan.plan_id);
      setSummary(full.summary);
      setActions(full.actions);
      setSelected(new Set(full.actions.filter(a => !a.requires_approval).map(a => a.id)));
      setStatus(`Plan ready: ${full.actions.length} proposed actions.`);
    } catch (e) {
      setStatus(String(e));
    } finally {
      setLoading(false);
    }
  };

  const toggle = (id: number) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const approveSelected = async () => {
    if (!planId) return;
    const ids = [...selected];
    await api.approve(planId, ids);
    setStatus(`Approved ${ids.length} actions.`);
  };

  const applySelected = async (mode: "manual" | "auto") => {
    if (!planId) return;
    const ids = [...selected];
    await api.approve(planId, ids);
    const res = await api.apply(planId, mode, ids);
    const ok = res.executed.filter(e => e.success).length;
    setStatus(`Batch ${res.batch_id.slice(0, 8)}…: ${ok}/${res.executed.length} applied.`);
    const updated = await api.getPlan(planId);
    setActions(updated.actions);
    setSelected(new Set());
  };

  return (
    <>
      <div className="header">
        <div>
          <h1>Analysis</h1>
          <div className="subtitle">Scan, classify, and review proposed actions before applying.</div>
        </div>
        <div className="row">
          <button className="btn secondary" disabled={loading} onClick={() => runAnalyze(false)}>
            Quick scan
          </button>
          <button className="btn" disabled={loading} onClick={() => runAnalyze(true)}>
            {loading ? "Working…" : "Analyze now"}
          </button>
        </div>
      </div>

      {status && <div className="card muted">{status}</div>}

      {summary && (
        <div className="grid-3">
          <div className="card stat"><div className="num">{summary.total_actions}</div><div className="label">Total proposed</div></div>
          <div className="card stat"><div className="num">{summary.auto_eligible}</div><div className="label">Auto-eligible</div></div>
          <div className="card stat"><div className="num">{summary.requires_approval}</div><div className="label">Need approval</div></div>
        </div>
      )}

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th><input type="checkbox"
                         checked={actions.length > 0 && selected.size === actions.length}
                         onChange={(e) => setSelected(e.target.checked ? new Set(actions.map(a => a.id)) : new Set())} /></th>
              <th>Rule</th>
              <th>Operation</th>
              <th>Change</th>
              <th>Confidence</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {actions.length === 0 && (
              <tr><td colSpan={6} className="empty">No analysis yet — click <em>Analyze now</em> to scan your folders.</td></tr>
            )}
            {actions.map((a) => (
              <tr key={a.id}>
                <td>
                  <input type="checkbox"
                         disabled={a.status === "executed" || a.status === "rejected"}
                         checked={selected.has(a.id)}
                         onChange={() => toggle(a.id)} />
                </td>
                <td>
                  <div>{a.rule_name ?? a.rule_key ?? "duplicate"}</div>
                  {a.rule_risk && <span className={`badge risk-${a.rule_risk}`}>{a.rule_risk}</span>}
                  <div className="muted" style={{ marginTop: 4, fontSize: 12 }}>{a.reason}</div>
                </td>
                <td><span className="badge op">{a.op_type}</span></td>
                <td><PathPair before={a.before_path} after={a.after_path} /></td>
                <td><ConfidenceBadge value={a.confidence} /></td>
                <td><span className="tag">{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {actions.length > 0 && (
        <div className="row" style={{ marginTop: 16, gap: 10 }}>
          <button className="btn secondary" onClick={approveSelected}>Approve selected</button>
          <button className="btn ok" onClick={() => applySelected("manual")}>
            Apply selected ({selected.size})
          </button>
          <button className="btn" onClick={() => applySelected("auto")}>
            Run auto-eligible only
          </button>
          <span className="muted">
            Every applied change is logged and reversible from the Undo tab.
          </span>
        </div>
      )}
    </>
  );
}
