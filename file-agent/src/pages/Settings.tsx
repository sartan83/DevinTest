import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Settings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => { (async () => setSettings(await api.settings()))(); }, []);

  const bind = (k: string, fallback = ""): string =>
    dirty[k] ?? settings[k] ?? fallback;

  const save = async () => {
    if (Object.keys(dirty).length === 0) return;
    await api.updateSettings(dirty);
    setSettings({ ...settings, ...dirty });
    setDirty({});
    setMsg("Saved.");
  };

  const set = (k: string, v: string) => setDirty({ ...dirty, [k]: v });

  return (
    <>
      <div className="header">
        <div>
          <h1>Settings</h1>
          <div className="subtitle">Global thresholds and AI provider config.</div>
        </div>
        <button className="btn" onClick={save} disabled={Object.keys(dirty).length === 0}>Save</button>
      </div>

      {msg && <div className="card muted">{msg}</div>}

      <div className="card">
        <div className="row between">
          <div>
            <strong>Archive age</strong>
            <div className="muted">Files untouched for this many days can be archived.</div>
          </div>
          <input type="number" min={30} max={3650}
                 value={bind("archive_days", "180")}
                 onChange={(e) => set("archive_days", e.target.value)}
                 style={{ width: 100, padding: "6px 10px", background: "var(--bg-elev-2)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 6 }}/>
        </div>
      </div>

      <div className="card">
        <div className="row between">
          <div>
            <strong>Global minimum confidence</strong>
            <div className="muted">Proposals below this threshold always require approval.</div>
          </div>
          <input type="number" step="0.05" min={0.5} max={1}
                 value={bind("min_confidence_global", "0.85")}
                 onChange={(e) => set("min_confidence_global", e.target.value)}
                 style={{ width: 100, padding: "6px 10px", background: "var(--bg-elev-2)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 6 }}/>
        </div>
      </div>

      <div className="card">
        <div className="row between">
          <div>
            <strong>Default run mode</strong>
            <div className="muted">
              <code>preview</code> never touches files. <code>approval</code> requires manual approval.
              <code>auto</code> only applies safe rules above confidence threshold.
            </div>
          </div>
          <select value={bind("default_mode", "preview")}
                  onChange={(e) => set("default_mode", e.target.value)}
                  style={{ padding: "6px 10px", background: "var(--bg-elev-2)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 6 }}>
            <option value="preview">preview</option>
            <option value="approval">approval</option>
            <option value="auto">auto (safe only)</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="row between">
          <div>
            <strong>AI provider</strong>
            <div className="muted">
              Off by default. The app works without AI. When on, only filename + short excerpts
              are sent to the model.
            </div>
          </div>
          <select value={bind("allow_ai", "0")}
                  onChange={(e) => set("allow_ai", e.target.value)}
                  style={{ padding: "6px 10px", background: "var(--bg-elev-2)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 6 }}>
            <option value="0">disabled</option>
            <option value="1">enabled (OpenAI API)</option>
          </select>
        </div>
      </div>
    </>
  );
}
