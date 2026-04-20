# Test Plan — PR #2 v1 fallback

## What changed (user-visible)
The dashboard now accepts both Devin API key types. With a personal `apk_user_…`
key (legacy v1 API), cost/ROI/pause are not available — the UI must explain
this clearly rather than silently breaking. With a service-user `cog_…` key,
the dashboard works as before (full ROI + pause).

## Primary flow — connect with `apk_user_` key (v1 mode)
Recording one continuous walkthrough that proves a personal key now produces
a working, honest UI instead of a 401 error.

### Steps & assertions

1. Open `http://localhost:5173/connect`.
   - **Expect:** Connect page shows "Two key types work:" with bullets for
     `cog_…` (full features) and `apk_user_…` (limited) — proves new copy
     shipped (`Connect.tsx:43-58`).
   - **Fail signal:** the old single-paragraph copy ("Paste your personal
     Devin API key. It's stored only in this browser's local storage…") with
     no mention of key types — would mean the Connect.tsx change didn't ship.

2. Paste the user's `apk_user_…` key, click **Connect**.
   - **Expect:** redirect to `/` (Dashboard) with no error toast. Health
     check at `/api/health` returns 200 with `mode: "v1"` (verify in
     network tab).
   - **Fail signal:** stuck on Connect page with red error
     "Devin API key rejected" — would mean v1 health-check fallback didn't
     kick in.

3. On Dashboard, observe top banner.
   - **Expect:** amber banner with `v1 mode` pill and headline
     "Cost, ROI, and pause are disabled for personal keys." Body explains
     the v1 API limitation and suggests `cog_…`.
   - **Fail signal:** no banner, OR banner appears but with cost numbers
     still populated — would mean cost_available flag isn't being honored.

4. Inspect any project row.
   - **Expect:** "ACU" cell = `—`, "Devin cost" cell = `—`, "vs Vanilla",
     "vs Cursor", "vs Copilot" cells all = `—`. Project tag, session count,
     and running indicator render normally.
   - **Fail signal:** ACU shows `0.0`, Devin cost shows `$0` — would mean
     null wasn't propagated through to the cell renderer.

5. Hover the Pause button on any row.
   - **Expect:** button is disabled (opacity reduced, no click handler
     fires). Tooltip on hover reads "Pause requires a service-user key
     (cog_)".
   - **Fail signal:** button enabled and clickable; or click triggers a
     500 error from the backend.

6. Click into a project (Details).
   - **Expect:** ProjectDetail page renders with stat tiles showing `—`
     for ACU/cost/saved. The three baseline cards (Vanilla/Cursor/Copilot)
     are NOT rendered; in their place is an amber notice
     "ROI comparison is unavailable in v1 mode…". The Pause project button
     in the header is disabled with the same tooltip.
   - **Fail signal:** baseline cards render with `$0` values, OR the page
     crashes because it tried to read `project.baselines.vanilla_usd` on
     null.

### Out of scope for this recording
- v3 mode (no `cog_` key available — covered by backend unit tests
  `tests/test_projects.py::test_key_mode_detects_service_user_prefix` and
  `tests/test_api.py::test_pause_rejects_v1_keys_with_501`).
- Settings page edits (no behavior change in this PR).
