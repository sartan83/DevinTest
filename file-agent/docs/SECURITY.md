# Security model

## What the agent can touch

Only files whose **source** and **destination** paths resolve (after symlink
resolution) inside an enabled row of `watched_folders`. That's the entire
allowlist; there's no other source of authority.

## What the agent can never touch

| Category           | Examples                                            | Enforcement                    |
| ------------------ | --------------------------------------------------- | ------------------------------ |
| Windows system     | `C:\Windows`, `C:\Program Files*`, `C:\ProgramData` | `safety.is_system_path`        |
| Per-user system    | `AppData\Local\Microsoft`, `AppData\Local\Packages` | substring match on normalized path |
| POSIX system       | `/bin`, `/sbin`, `/usr/bin`, `/etc`, `/boot`        | `safety.is_system_path`        |
| Protected ext      | `.sys .dll .drv .ini .lnk .msc .cpl`                | `safety.is_protected_extension`|
| Outside allowlist  | anything not under a watched folder                 | `safety.is_within`             |

Checks run in **both** the planner (so unsafe actions never reach the user) and
the executor (defense in depth — even if a proposal is tampered with in the DB,
the executor will re-check before running it).

## What "delete" means

Never permanent deletion. "Delete" always resolves to a move into a
`Duplicates_Review` / `Review` subfolder under the source root (or, for aged
files, into an `Archive/YYYY-MM` bucket). The user can restore from there
manually, via the Quarantine tab, or via Undo.

## Approval gates

Every rule row has:

- `risk`: `safe` | `review` | `sensitive`.
- `mode`: `off` | `preview` | `approval` | `auto`.
- `min_confidence`: float in `[0, 1]`.

Rules of thumb:

- `sensitive` rules (e.g. identity documents) are hard-capped: the Rules tab
  disables the `auto` option for them.
- Any proposal below its rule's `min_confidence` is marked `requires_approval`
  regardless of global mode.
- Any proposal from a rule in `preview` or `approval` mode requires approval,
  full stop.

## Network

The core system makes **zero outbound HTTP calls**. The optional OpenAI
provider is off by default; enabling it requires setting `allow_ai=1` in
Settings plus providing an API key.

## Logging

Everything goes to SQLite with provenance:

- `proposed_actions` — what the agent wanted to do and why.
- `executed_actions` — what actually ran, including failures and error text.
- `rollback_history` — every undo/redo, success or failure.

Nothing is silently suppressed; failed ops remain queryable from the UI's
Activity log.
