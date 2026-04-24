import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Batch } from "../types";

export default function Undo() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  const refresh = async () => setBatches(await api.listBatches());
  useEffect(() => { void refresh(); }, []);

  const undoBatch = async (batchId: string) => {
    setMsg(null);
    const res = await api.rollback({ batch_id: batchId });
    const ok = res.results.filter((r) => r.success).length;
    setMsg(`Rolled back ${ok}/${res.results.length} actions in ${batchId.slice(0, 8)}…`);
    await refresh();
  };

  return (
    <>
      <div className="header">
        <div>
          <h1>Undo / Rollback</h1>
          <div className="subtitle">
            Each apply-run is grouped as a batch. Rolling back reverses every eligible action.
          </div>
        </div>
      </div>

      {msg && <div className="card muted">{msg}</div>}

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr><th>Started</th><th>Batch ID</th><th>Actions</th><th>Reversible</th><th></th></tr>
          </thead>
          <tbody>
            {batches.length === 0 && <tr><td colSpan={5} className="empty">No batches yet.</td></tr>}
            {batches.map((b) => (
              <tr key={b.batch_id}>
                <td className="muted">{new Date(b.started_at).toLocaleString()}</td>
                <td className="tag">{b.batch_id.slice(0, 8)}…</td>
                <td>{b.success_count}/{b.action_count}</td>
                <td>{b.reversible_count}</td>
                <td>
                  <button className="btn secondary"
                          disabled={b.reversible_count === 0}
                          onClick={() => undoBatch(b.batch_id)}>
                    Undo batch
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
