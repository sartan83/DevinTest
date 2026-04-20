# ROI Dashboard — v1 fallback end-to-end test report

PR: https://github.com/sartan83/DevinTest/pull/2 · Branch `devin/1776671706-roi-dashboard`
Local stack: `web/` on :5173, `api/` on :8000
Key under test: the `apk_user_…` personal key you shared (legacy v1 API)

## Summary

One-sentence: ran the full stack locally and walked the Connect → Dashboard → ProjectDetail flow with the personal key. The app now detects v1 mode and degrades gracefully instead of 401'ing.

No escalations. No failures.

## Assertions

- **PASS** — Connect page lists both key types with correct capability descriptions.
- **PASS** — `/api/health` returns `mode:"v1"`, `cost_available:false`, `pause_available:false`, and the authenticated email — no 401/403 like before.
- **PASS** — Dashboard shows amber "v1 mode" banner linking to docs and explaining why.
- **PASS** — Dashboard KPI tiles (Total ACU, Devin cost, Saved vs Vanilla) render `—`; Running-now count still works (2 running).
- **PASS** — Project rows show sessions/status/tags but `—` for ACU/cost/vs-Vanilla/Cursor/Copilot columns.
- **PASS** — Dashboard Pause buttons are disabled and carry the tooltip `Pause requires a service-user key (cog_)`.
- **PASS** — ProjectDetail stat tiles render `—` for ACU / Devin cost / Saved vs Vanilla.
- **PASS** — ProjectDetail replaces the three baseline cards with a single amber notice: *"ROI comparison is unavailable in v1 mode — the legacy /v1 API doesn't return ACU usage…"*.
- **PASS** — ProjectDetail "Pause project" button is disabled with the same tooltip.
- **PASS** — Session list on ProjectDetail renders each session (status chips + `— ACU` + Open link to app.devin.ai).

## Evidence

### Connect page — two key types explained

![Connect page with both key type bullets](https://app.devin.ai/attachments/7985e692-6af6-4607-869c-ad7be39acd54/screenshot_ce68faf7675c419395a4c317ab6bd412.png)

### Dashboard — v1 banner, `—` cells, disabled Pause

![Dashboard in v1 mode](https://app.devin.ai/attachments/f4e5778f-7361-4fac-abc5-b071b5eec570/screenshot_93d3363f75194302be7bf0581a5e8843.png)

### ProjectDetail — amber notice replacing baseline cards, pause disabled

![ProjectDetail in v1 mode](https://app.devin.ai/attachments/cb4f946f-ad42-412e-a24f-3779e02af36c/screenshot_a090d2ad527e4ddfb2c6dddcee92aaf7.png)

### `/api/health` raw response

Fetched from the page's devtools console with the same stored key:

```json
{
  "ok": true,
  "devin_api": "reachable",
  "mode": "v1",
  "cost_available": false,
  "pause_available": false,
  "user": { "email": "simone.agazzi@gmail.com", "mode": "v1" }
}
```

## Scope notes / what's NOT proven

- **v3 `cog_…` key path** is not exercised in this recording — you don't have a service-user key yet. The v3 code path is unchanged since the previous green CI run and covered by unit tests, but an end-to-end walkthrough with a real `cog_…` key is still outstanding. Create one at https://app.devin.ai/settings/service-users and I'll rerun the full ROI + pause flow.
- **Pause 501 error path** is covered by the backend unit test `test_pause_rejects_v1_keys_with_501`; UI-side the button is disabled so the 501 is never reached in normal use.
- **Settings page** was not re-tested in this pass — no changes there since the previous green run.
