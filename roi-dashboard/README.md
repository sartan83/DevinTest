# Devin ROI Dashboard

Real-time ROI viewer for [Devin](https://devin.ai) projects. Drop-in web page for governing all
Devin activity across your org: total spend, cost vs. vanilla / Cursor / Copilot baselines,
which sessions are running right now, and a one-click way to pause a whole project.

**Design intent**

- Send the public URL to any other Devin user — they connect with their own API key, and the
  dashboard shows *their* org's projects.
- Nothing is persisted server-side. The API key lives only in the visitor's `localStorage`
  and is forwarded per request to the backend, which proxies the Devin v3 API.
- "Project" = a session tag. Optionally, configure a tag prefix (e.g. `project:`) so only
  intentional tags become projects.
- ROI baselines (hourly rate, Cursor/Copilot multipliers, ACU price) are editable on
  `/settings` and stored locally.

## Repo layout

```
web/   Vite + React + TS + Tailwind — the dashboard UI
api/   FastAPI proxy that forwards the user's API key to api.devin.ai
```

## Running locally

Backend (Python 3.11+):

```bash
cd api
python -m venv .venv && source .venv/bin/activate
pip install -e '.[dev]'
uvicorn devin_roi_api.main:app --reload --port 8000
```

Frontend (Node 20+):

```bash
cd web
npm install
npm run dev   # http://localhost:5173 — Vite proxies /api → http://127.0.0.1:8000
```

Then open http://localhost:5173, click **Connect Devin**, paste your Devin API key, and go.

## API key types

The dashboard accepts both Devin API key formats, but they unlock different features:

| Prefix            | Source                                             | What works                                        | What's disabled                         |
| ----------------- | -------------------------------------------------- | ------------------------------------------------- | --------------------------------------- |
| `cog_…`           | [Service user](https://app.devin.ai/settings/service-users) (v3 API) | Everything: project list, running status, ACU cost, ROI vs Vanilla/Cursor/Copilot, pause project | —                                       |
| `apk_user_…`      | [Personal API key](https://app.devin.ai/settings/api-keys) (legacy v1) | Project list, running status, basic session info  | Cost, ROI, and pause (v1 API exposes none of these) |

When a personal key is detected the dashboard switches to "v1 mode": cost / ROI fields render as "—",
the pause button is disabled with a tooltip, and a banner on the dashboard explains why. Swap in a
service-user key to unlock the full experience — no restart needed, just paste a new key on
**Connect**.

## Pause semantics

"Pause project" calls the [Archive Session](https://docs.devin.ai/api-reference/v3/sessions/post-organizations-sessions-archive)
endpoint on every session tagged with that project that is currently running. Per Devin's
docs, archiving puts the session to sleep and preserves it for viewing. Archived sessions
cannot be resumed; this is the only non-destructive "stop" primitive the public v3 API
exposes today. Pause is only available when connected with a service-user (`cog_…`) key —
the legacy v1 API has no archive endpoint, so the button is disabled for personal keys.

## ROI math

For a project with total ACU consumption `A`:

- Devin cost  = `A × acu_rate_usd`
- Vanilla dev = `A × hours_per_acu_vanilla × hourly_rate_usd`
- Cursor dev  = Vanilla × `cursor_multiplier`
- Copilot dev = Vanilla × `copilot_multiplier`
- ROI vs X    = `(X - DevinCost) / DevinCost × 100%`

Tune every constant on `/settings`.

## Tests

```bash
cd api && pytest
cd web && npm run lint && npm run build
```
