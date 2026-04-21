import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import type { ExecutedAction } from "../types";

export default function Quarantine() {
  const [executed, setExecuted] = useState<ExecutedAction[]>([]);

  useEffect(() => {
    (async () => {
      const d = await api.activity();
      setExecuted(d.executed);
    })();
  }, []);

  const quarantined = useMemo(
    () => executed.filter((e) => e.success && (e.op_type === "quarantine" ||
                                                /Duplicates_Review|Review/i.test(e.after_path))),
    [executed],
  );

  return (
    <>
      <div className="header">
        <div>
          <h1>Quarantine / Review</h1>
          <div className="subtitle">
            Files the agent moved aside pending your review. Nothing has been deleted.
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr><th>Staged at</th><th>Reason</th><th>Path</th></tr>
          </thead>
          <tbody>
            {quarantined.length === 0 && <tr><td colSpan={3} className="empty">Quarantine is empty.</td></tr>}
            {quarantined.map((e) => (
              <tr key={e.id}>
                <td className="muted">{new Date(e.executed_at).toLocaleString()}</td>
                <td>{e.rule_name ?? e.op_type}</td>
                <td className="path">{e.after_path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
