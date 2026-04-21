import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { OrganizationRule } from "../types";

export default function Rules() {
  const [rules, setRules] = useState<OrganizationRule[]>([]);

  const refresh = async () => setRules(await api.listRules());
  useEffect(() => { void refresh(); }, []);

  const update = async (id: number, patch: Partial<OrganizationRule>) => {
    await api.updateRule(id, patch);
    await refresh();
  };

  return (
    <>
      <div className="header">
        <div>
          <h1>Organization rules</h1>
          <div className="subtitle">
            Each rule has a risk tier, a default mode and a minimum confidence threshold.
            Only <em>safe</em> rules in <em>auto</em> mode apply changes without asking.
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Enabled</th>
              <th>Rule</th>
              <th>Risk</th>
              <th>Mode</th>
              <th>Min confidence</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((r) => (
              <tr key={r.id}>
                <td>
                  <input type="checkbox" checked={!!r.enabled}
                         onChange={(e) => update(r.id, { enabled: e.target.checked ? 1 : 0 })} />
                </td>
                <td>
                  <div><strong>{r.name}</strong></div>
                  <div className="muted" style={{ fontSize: 12 }}>{r.description}</div>
                  <div className="tag" style={{ marginTop: 4 }}>{r.key}</div>
                </td>
                <td><span className={`badge risk-${r.risk}`}>{r.risk}</span></td>
                <td>
                  <select value={r.mode}
                          onChange={(e) => update(r.id, { mode: e.target.value as OrganizationRule["mode"] })}
                          style={{ background: "var(--bg-elev-2)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 8px" }}>
                    <option value="off">off</option>
                    <option value="preview">preview</option>
                    <option value="approval">approval</option>
                    <option value="auto" disabled={r.risk === "sensitive"}>auto</option>
                  </select>
                </td>
                <td>
                  <input type="range" min={0.5} max={1} step={0.05}
                         value={r.min_confidence}
                         onChange={(e) => update(r.id, { min_confidence: Number(e.target.value) })} />
                  <span className="muted" style={{ marginLeft: 8 }}>
                    {Math.round(r.min_confidence * 100)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
