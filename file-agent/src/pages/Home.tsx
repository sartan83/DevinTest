import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Batch, WatchedFolder } from "../types";

interface Props { onStart: () => void; }

export default function Home({ onStart }: Props) {
  const [folders, setFolders] = useState<WatchedFolder[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [health, setHealth] = useState<{ ok: boolean; version: string } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [h, f, b] = await Promise.all([api.health(), api.listFolders(), api.listBatches()]);
        setHealth(h);
        setFolders(f);
        setBatches(b);
      } catch (e) {
        setErr(String(e));
      }
    })();
  }, []);

  return (
    <>
      <div className="header">
        <div>
          <h1>Home</h1>
          <div className="subtitle">
            Local-first file organization agent. Safe by default — preview every change.
          </div>
        </div>
        <button className="btn" onClick={onStart}>Configure folders</button>
      </div>

      {err && <div className="card" style={{ borderColor: "var(--danger)" }}>
        <strong>Backend unreachable.</strong> {err}
      </div>}

      <div className="grid-3">
        <div className="card stat">
          <div className="num">{health?.ok ? "online" : "…"}</div>
          <div className="label">Sidecar {health?.version ? `v${health.version}` : ""}</div>
        </div>
        <div className="card stat">
          <div className="num">{folders.filter(f => f.enabled).length}</div>
          <div className="label">Watched folders</div>
        </div>
        <div className="card stat">
          <div className="num">{batches.length}</div>
          <div className="label">Action batches (history)</div>
        </div>
      </div>

      <div className="card">
        <div className="row between">
          <div>
            <strong>How it works</strong>
            <div className="muted" style={{ marginTop: 6 }}>
              1. Pick folders (defaults: Downloads, Documents, Pictures).
              2. Run <em>Analyze</em> to scan and classify.
              3. Review proposed actions and approve, then <em>Apply</em>.
              Every change is logged and reversible.
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <strong>Safety model</strong>
        <ul style={{ marginTop: 8, color: "var(--text-dim)" }}>
          <li>No file outside your watched folders is ever touched.</li>
          <li>System paths and protected extensions are hard-denied.</li>
          <li>No permanent deletes — "delete" means move to a quarantine folder.</li>
          <li>Sensitive / low-confidence actions always require explicit approval.</li>
          <li>Every action is audited and can be rolled back.</li>
        </ul>
      </div>
    </>
  );
}
