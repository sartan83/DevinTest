import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { WatchedFolder } from "../types";

export default function FolderSelection() {
  const [folders, setFolders] = useState<WatchedFolder[]>([]);
  const [role, setRole] = useState<string>("user");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const refresh = async () => {
    setFolders(await api.listFolders());
  };

  useEffect(() => { void refresh(); }, []);

  const pickAndAdd = async () => {
    setMsg(null);
    const path = typeof window !== "undefined" && window.fileagent
      ? await window.fileagent.pickFolder()
      : prompt("Folder path:");
    if (!path) return;
    setLoading(true);
    try {
      await api.addFolder(path, role);
      await refresh();
    } catch (e) {
      setMsg(String(e));
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number) => {
    await api.removeFolder(id);
    await refresh();
  };

  return (
    <>
      <div className="header">
        <div>
          <h1>Watched folders</h1>
          <div className="subtitle">
            The agent will only operate inside these roots. Everything else is off-limits.
          </div>
        </div>
        <div className="row">
          <select value={role} onChange={(e) => setRole(e.target.value)}
                  style={{ background: "var(--bg-elev-2)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 6, padding: "8px 10px" }}>
            <option value="downloads">downloads</option>
            <option value="documents">documents</option>
            <option value="pictures">pictures</option>
            <option value="user">user (generic)</option>
          </select>
          <button className="btn" onClick={pickAndAdd} disabled={loading}>
            {loading ? "Adding…" : "Add folder…"}
          </button>
        </div>
      </div>

      {msg && <div className="card" style={{ borderColor: "var(--danger)" }}>{msg}</div>}

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr><th>Path</th><th>Role</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {folders.length === 0 && (
              <tr><td colSpan={4} className="empty">
                No folders yet. Add Downloads, Documents and Pictures to get started.
              </td></tr>
            )}
            {folders.map((f) => (
              <tr key={f.id}>
                <td className="path">{f.path}</td>
                <td><span className="tag">{f.role}</span></td>
                <td>{f.enabled ? "enabled" : "disabled"}</td>
                <td><button className="btn secondary" onClick={() => remove(f.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
