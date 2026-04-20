import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state";
import { checkHealth, ApiError } from "../lib/api";
import { setApiKey as persistApiKey } from "../lib/storage";

export default function Connect() {
  const { setApiKey } = useAppState();
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!value.trim()) {
      setErr("Paste your Devin API key first.");
      return;
    }
    setBusy(true);
    try {
      // Persist immediately so the api client picks it up for the health call.
      persistApiKey(value);
      await checkHealth();
      setApiKey(value);
      nav("/");
    } catch (e) {
      persistApiKey(null);
      setErr(
        e instanceof ApiError
          ? `Key rejected (${e.status}): ${e.message}`
          : "Could not verify the key."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Connect Devin</h1>
      <p className="text-slate-400 text-sm mb-6">
        Paste your personal Devin API key. It's stored only in this browser's
        local storage and sent to our backend per request — never persisted
        server-side.
      </p>
      <form onSubmit={onSubmit} className="card p-5 space-y-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Devin API key
          </span>
          <input
            className="input mt-1 font-mono"
            type="password"
            autoFocus
            placeholder="dsk_..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        {err && (
          <div className="text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-md px-3 py-2">
            {err}
          </div>
        )}
        <div className="flex items-center justify-between">
          <a
            href="https://app.devin.ai/settings/api-keys"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-accent hover:underline"
          >
            Get a key →
          </a>
          <button className="btn-primary" disabled={busy}>
            {busy ? "Verifying…" : "Connect"}
          </button>
        </div>
      </form>
      <div className="mt-6 card p-5 text-sm text-slate-300 space-y-2">
        <div className="font-medium text-slate-100">How sharing works</div>
        <p className="text-slate-400">
          Share this dashboard's URL with any Devin user. When they open it,
          they'll be prompted for their own API key — the dashboard then shows
          <em> their </em> projects, costs, and running sessions. Nothing is
          shared across accounts.
        </p>
      </div>
    </div>
  );
}
