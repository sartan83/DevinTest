# Architecture

## Process topology

```
Electron (main process, Node.js)
  ├─ spawns: python -m fileagent.main (sidecar, loopback-only)
  └─ loads:  dist/index.html (React)
              └─ fetch → http://127.0.0.1:53117/api/*
                          Bearer <token generated per launch>
```

The **main process** owns: window lifecycle, sidecar lifecycle, the OS-level
folder picker, and the shared bearer token. The **renderer** is the React UI and
only knows how to make HTTP calls; it never imports Node APIs.

The **sidecar** is FastAPI + Uvicorn. On startup the `lifespan` hook seeds the
default rules, seeds `app_settings`, and auto-detects Downloads / Documents /
Pictures if they exist.

## Request flow: "Analyze now"

```
UI ─► POST /api/scan            ─► scanner.scan_all   ─► files_index upsert
UI ─► POST /api/plan            ─► planner.build_plan ─► classifier.classify
                                                        rules_engine.apply_rules
                                                        safety.check_operation
                                                        _duplicate_candidates
                                                        proposed_actions insert
UI ─► GET  /api/plan/<id>       ─► list proposed actions + summary
UI ─► POST /api/plan/<id>/approve
UI ─► POST /api/apply           ─► executor.apply     ─► safety.check_operation
                                                        shutil.move
                                                        executed_actions insert
                                                        files_index path update
```

## Threading model

The sidecar is single-process, and FastAPI endpoints are synchronous — every
handler opens a short-lived SQLite connection. This is simple to reason about
and plenty fast for a local desktop agent. The optional in-process
`Scheduler` runs a daemon thread that fires due jobs once per tick.

## Error boundaries

- The executor wraps every action in its own try/except. A single failure never
  aborts the rest of the batch; failures are recorded with `success=0` and
  surface in the UI's Activity log with the error message.
- The planner silently drops unsafe proposals (`SafetyError`) rather than
  raising — unsafe plans should never be shown to the user.
- The rollback manager refuses to overwrite an existing file at the original
  location; the user gets a clear error and can resolve the conflict manually.

## Extension points

- **New rule.** Add a function in `rules_engine.py`, register it in `REGISTRY`,
  and append an entry to `DEFAULT_RULES`. No other code changes needed.
- **New category.** Extend the `Category` `Literal` in `models.py` and add the
  classifier branch. Rules that key off the new category pick it up
  automatically.
- **Better AI.** Implement the `AIProvider` Protocol. The hook is intentionally
  scoped to returning a topic hint; the provider can't cause file operations
  directly.
