import { useState } from "react";
import { useAppState } from "../state";
import { DEFAULT_CONFIG } from "../types";
import type { RoiConfig } from "../types";

export default function Settings() {
  const { config, setConfig, resetConfig } = useAppState();
  const [draft, setDraft] = useState<RoiConfig>(config);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof RoiConfig>(k: K, v: RoiConfig[K]) {
    setDraft({ ...draft, [k]: v });
    setSaved(false);
  }

  function save() {
    setConfig(draft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-slate-400 text-sm">
          Tune ROI baselines. These are stored only in this browser.
        </p>
      </div>

      <section className="card p-5 space-y-4">
        <h2 className="font-medium">Cost model</h2>
        <Field
          label="ACU rate (USD per ACU)"
          hint="Your effective $ per Agent Compute Unit (check your Devin billing)."
          value={draft.acu_rate_usd}
          onChange={(v) => update("acu_rate_usd", v)}
        />
        <Field
          label="Developer hourly rate (USD)"
          hint="Used as the baseline for non-Devin development."
          value={draft.hourly_rate_usd}
          onChange={(v) => update("hourly_rate_usd", v)}
        />
        <Field
          label="Vanilla hours per ACU of work"
          hint="Estimate of human-developer hours a vanilla dev would spend to produce the same output as 1 ACU of Devin work."
          value={draft.hours_per_acu_vanilla}
          onChange={(v) => update("hours_per_acu_vanilla", v)}
        />
        <Field
          label="Working hours per day"
          hint="Used to convert saved developer hours into man-days (e.g. 8h/day)."
          value={draft.hours_per_day}
          onChange={(v) => update("hours_per_day", v)}
          step="0.5"
          min={1}
        />
      </section>

      <section className="card p-5 space-y-4">
        <h2 className="font-medium">Productivity multipliers</h2>
        <Field
          label="Cursor multiplier"
          hint="Fraction of vanilla time Cursor-assisted devs take (e.g. 0.5 = 2× faster)."
          value={draft.cursor_multiplier}
          onChange={(v) => update("cursor_multiplier", v)}
        />
        <Field
          label="Copilot multiplier"
          hint="Fraction of vanilla time Copilot-assisted devs take."
          value={draft.copilot_multiplier}
          onChange={(v) => update("copilot_multiplier", v)}
        />
      </section>

      <section className="card p-5 space-y-4">
        <h2 className="font-medium">Personal-key estimation</h2>
        <p className="text-xs text-slate-500">
          Only used when you're signed in with a personal <code className="font-mono">apk_user_…</code> key.
          The v1 API doesn't expose ACU usage, so cost / ROI are estimated from session wall-clock duration
          using this rate. Service-user <code className="font-mono">cog_…</code> keys use real ACU numbers
          and ignore this setting.
        </p>
        <Field
          label="Estimated ACUs per hour of Devin work"
          hint="Realistic default is ~4 ACU/hr for an actively working session. Lower if your sessions spend lots of time idle."
          value={draft.estimated_acus_per_hour}
          onChange={(v) => update("estimated_acus_per_hour", v)}
          step="0.1"
          min={0.1}
        />
      </section>

      <section className="card p-5 space-y-4">
        <h2 className="font-medium">Project grouping</h2>
        <label className="block text-sm">
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Tag prefix (optional)
          </span>
          <input
            className="input mt-1 font-mono"
            placeholder="e.g. project:"
            value={draft.tag_prefix ?? ""}
            onChange={(e) =>
              update("tag_prefix", e.target.value.trim() ? e.target.value : null)
            }
          />
          <span className="block text-xs text-slate-500 mt-1">
            If set, only session tags starting with this prefix become projects, and
            the prefix is stripped from the displayed name.
          </span>
        </label>
      </section>

      <div className="flex items-center justify-between">
        <button
          className="btn-ghost"
          onClick={() => {
            resetConfig();
            setDraft(DEFAULT_CONFIG);
          }}
        >
          Reset to defaults
        </button>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs text-emerald-300">Saved</span>
          )}
          <button className="btn-primary" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  step = "0.01",
  min = 0,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  step?: string;
  min?: number;
}) {
  return (
    <label className="block text-sm">
      <span className="text-xs uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <input
        className="input mt-1 font-mono"
        type="number"
        step={step}
        min={min}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {hint && (
        <span className="block text-xs text-slate-500 mt-1">{hint}</span>
      )}
    </label>
  );
}
