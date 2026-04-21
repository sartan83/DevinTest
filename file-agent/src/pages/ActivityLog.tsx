import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { ExecutedAction } from "../types";
import PathPair from "../components/PathPair";

export default function ActivityLog() {
  const [executed, setExecuted] = useState<ExecutedAction[]>([]);
  const [rollback, setRollback] = useState<ExecutedAction[]>([]);

  useEffect(() => {
    (async () => {
      const d = await api.activity();
      setExecuted(d.executed);
      setRollback(d.rollback);
    })();
  }, []);

  return (
    <>
      <div className="header">
        <div>
          <h1>Activity log</h1>
          <div className="subtitle">Every executed action, plus every rollback. Newest first.</div>
        </div>
      </div>

      <div className="card">
        <strong>Executed actions</strong>
        <div style={{ marginTop: 10 }}>
          <table className="table">
            <thead>
              <tr><th>When</th><th>Rule</th><th>Op</th><th>Change</th><th>Status</th></tr>
            </thead>
            <tbody>
              {executed.length === 0 && <tr><td colSpan={5} className="empty">No activity yet.</td></tr>}
              {executed.map((e) => (
                <tr key={e.id}>
                  <td className="muted">{new Date(e.executed_at).toLocaleString()}</td>
                  <td>{e.rule_name ?? e.rule_key ?? "—"}</td>
                  <td><span className="badge op">{e.op_type}</span></td>
                  <td><PathPair before={e.before_path} after={e.after_path} /></td>
                  <td>
                    {e.success ? <span className="badge risk-safe">ok</span> : <span className="badge risk-sensitive">failed</span>}
                    {e.error_message && <div className="muted" style={{ fontSize: 11 }}>{e.error_message}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <strong>Rollback history</strong>
        <div style={{ marginTop: 10 }}>
          <table className="table">
            <thead>
              <tr><th>When</th><th>Op</th><th>Change</th><th>Status</th></tr>
            </thead>
            <tbody>
              {rollback.length === 0 && <tr><td colSpan={4} className="empty">No rollbacks yet.</td></tr>}
              {rollback.map((r) => (
                <tr key={r.id}>
                  <td className="muted">{new Date(r.executed_at).toLocaleString()}</td>
                  <td><span className="badge op">{r.op_type}</span></td>
                  <td><PathPair before={r.before_path} after={r.after_path} /></td>
                  <td>{r.success ? <span className="badge risk-safe">ok</span> : <span className="badge risk-sensitive">failed</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
