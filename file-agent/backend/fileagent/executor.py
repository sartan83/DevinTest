"""Executor: applies approved :class:`ProposedAction` rows to the filesystem.

Every operation is re-checked against the safety model immediately before it
runs. Successful actions are recorded with a ``rollback_token`` that the
rollback manager uses to reverse them.
"""

from __future__ import annotations

import os
import shutil
import sqlite3
import uuid
from collections.abc import Iterable, Sequence
from pathlib import Path

from .models import ApplyRequest, ExecutedAction
from .safety import SafetyError, check_operation


def _allowed_roots(conn: sqlite3.Connection) -> list[str]:
    rows = conn.execute("SELECT path FROM watched_folders WHERE enabled = 1").fetchall()
    return [r["path"] for r in rows]


def _load_proposals(
    conn: sqlite3.Connection,
    plan_id: str,
    action_ids: Sequence[int] | None,
    mode: str,
) -> list[sqlite3.Row]:
    params: list[object] = [plan_id]
    where = ["plan_id = ?", "status IN ('pending', 'approved')"]
    if action_ids is not None:
        # Explicit empty list means "apply nothing" — do not silently fall through
        # to "apply all", which would be a dangerous footgun from the UI.
        if len(action_ids) == 0:
            return []
        placeholders = ",".join(["?"] * len(action_ids))
        where.append(f"id IN ({placeholders})")
        params.extend(action_ids)
    if mode == "auto":
        # Only non-approval-required items are eligible in auto mode.
        where.append("requires_approval = 0")
    elif mode == "semi_auto":
        # Only explicitly approved items run in semi-auto; anything still pending stays pending.
        where = [w for w in where if w != "status IN ('pending', 'approved')"]
        where.append("status = 'approved'")
    return conn.execute(
        f"""
        SELECT id, plan_id, file_id, rule_id, op_type, before_path, after_path,
               reason, confidence, requires_approval, status
        FROM proposed_actions
        WHERE {' AND '.join(where)}
        ORDER BY id
        """,
        params,
    ).fetchall()


def _ensure_parent(dest: str) -> None:
    Path(dest).parent.mkdir(parents=True, exist_ok=True)


def _execute_one(op_type: str, before: str, after: str) -> None:
    if os.path.normcase(before) == os.path.normcase(after):
        return
    _ensure_parent(after)
    if Path(after).exists():
        raise FileExistsError(f"Destination already exists: {after}")
    if op_type in {"move", "rename", "archive"} or op_type == "quarantine":
        shutil.move(before, after)
    elif op_type == "create_folder":
        Path(after).mkdir(parents=True, exist_ok=True)
    else:
        raise ValueError(f"Unknown op_type: {op_type}")


def apply(conn: sqlite3.Connection, req: ApplyRequest) -> tuple[str, list[ExecutedAction]]:
    """Execute eligible proposals for *plan_id*. Returns ``(batch_id, executed)``."""
    batch_id = str(uuid.uuid4())
    allowed = _allowed_roots(conn)
    proposals = _load_proposals(conn, req.plan_id, req.action_ids, req.mode)

    executed: list[ExecutedAction] = []
    for row in proposals:
        pid = int(row["id"])
        before = row["before_path"]
        after = row["after_path"]
        op_type = row["op_type"]
        rule_id = row["rule_id"]
        token = uuid.uuid4().hex

        # Revalidate safety at execution time (defense in depth).
        try:
            check_operation(before, after, allowed)
        except SafetyError as e:
            conn.execute(
                "UPDATE proposed_actions SET status = 'rejected' WHERE id = ?",
                (pid,),
            )
            conn.execute(
                """
                INSERT INTO executed_actions(batch_id, proposed_id, rule_id, op_type,
                                             before_path, after_path, success,
                                             error_message, reversible, rollback_token)
                VALUES (?, ?, ?, ?, ?, ?, 0, ?, 0, NULL)
                """,
                (batch_id, pid, rule_id, op_type, before, after, f"safety: {e}"),
            )
            continue

        try:
            _execute_one(op_type, before, after)
            success = True
            err = None
        except Exception as e:
            success = False
            err = str(e)

        reversible = op_type in {"move", "rename", "quarantine", "archive"} and success
        cur = conn.execute(
            """
            INSERT INTO executed_actions(batch_id, proposed_id, rule_id, op_type,
                                         before_path, after_path, success, error_message,
                                         reversible, rollback_token)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            RETURNING id, executed_at
            """,
            (
                batch_id, pid, rule_id, op_type, before, after,
                1 if success else 0, err, 1 if reversible else 0,
                token if reversible else None,
            ),
        )
        exec_row = cur.fetchone()

        new_status = "executed" if success else "rejected"
        conn.execute("UPDATE proposed_actions SET status = ? WHERE id = ?", (new_status, pid))

        executed.append(ExecutedAction(
            id=int(exec_row["id"]),
            batch_id=batch_id,
            proposed_id=pid,
            rule_id=rule_id,
            op_type=op_type,
            before_path=before,
            after_path=after,
            success=success,
            error_message=err,
            reversible=reversible,
            rollback_token=token if reversible else None,
        ))

        # Keep files_index consistent.
        if success and op_type != "create_folder":
            conn.execute("UPDATE files_index SET path = ? WHERE path = ?", (after, before))

    conn.commit()
    return batch_id, executed


def approve(conn: sqlite3.Connection, action_ids: Iterable[int]) -> int:
    ids = list(action_ids)
    if not ids:
        return 0
    placeholders = ",".join(["?"] * len(ids))
    cur = conn.execute(
        f"UPDATE proposed_actions SET status = 'approved' WHERE id IN ({placeholders})",
        ids,
    )
    conn.commit()
    return cur.rowcount


def reject(conn: sqlite3.Connection, action_ids: Iterable[int]) -> int:
    ids = list(action_ids)
    if not ids:
        return 0
    placeholders = ",".join(["?"] * len(ids))
    cur = conn.execute(
        f"UPDATE proposed_actions SET status = 'rejected' WHERE id IN ({placeholders})",
        ids,
    )
    conn.commit()
    return cur.rowcount
