"""Rollback manager: reverses executed actions in a safe, auditable way."""

from __future__ import annotations

import os
import shutil
import sqlite3
import uuid
from pathlib import Path

from .models import RollbackRequest
from .safety import SafetyError, check_operation


def _allowed_roots(conn: sqlite3.Connection) -> list[str]:
    rows = conn.execute("SELECT path FROM watched_folders WHERE enabled = 1").fetchall()
    return [r["path"] for r in rows]


def _select_executed(conn: sqlite3.Connection, req: RollbackRequest) -> list[sqlite3.Row]:
    if req.executed_ids:
        placeholders = ",".join(["?"] * len(req.executed_ids))
        return conn.execute(
            f"""
            SELECT id, batch_id, op_type, before_path, after_path, reversible, rollback_token
            FROM executed_actions
            WHERE success = 1 AND reversible = 1 AND id IN ({placeholders})
            ORDER BY id DESC
            """,
            list(req.executed_ids),
        ).fetchall()
    if req.batch_id:
        return conn.execute(
            """
            SELECT id, batch_id, op_type, before_path, after_path, reversible, rollback_token
            FROM executed_actions
            WHERE success = 1 AND reversible = 1 AND batch_id = ?
            ORDER BY id DESC
            """,
            (req.batch_id,),
        ).fetchall()
    return []


def _revert_one(op_type: str, before: str, after: str) -> None:
    """Reverse a previously applied action: move ``after`` back to ``before``."""
    if os.path.normcase(before) == os.path.normcase(after):
        return
    if not Path(after).exists():
        raise FileNotFoundError(f"Cannot rollback — file no longer at {after}")
    if Path(before).exists():
        raise FileExistsError(f"Cannot rollback — original path occupied: {before}")
    Path(before).parent.mkdir(parents=True, exist_ok=True)
    if op_type in {"move", "rename", "archive", "quarantine"}:
        shutil.move(after, before)
    else:
        raise ValueError(f"Cannot rollback op_type: {op_type}")


def rollback(conn: sqlite3.Connection, req: RollbackRequest) -> list[dict]:
    rows = _select_executed(conn, req)
    allowed = _allowed_roots(conn)
    results: list[dict] = []
    rb_batch = str(uuid.uuid4())
    for row in rows:
        eid = int(row["id"])
        before = row["before_path"]
        after = row["after_path"]
        op_type = row["op_type"]
        try:
            # Safety check the *reverse* operation.
            check_operation(after, before, allowed)
            _revert_one(op_type, before, after)
            success = True
            err = None
        except (SafetyError, OSError, FileExistsError, FileNotFoundError, ValueError) as e:
            success = False
            err = str(e)
        conn.execute(
            """
            INSERT INTO rollback_history(batch_id, executed_id, op_type, before_path,
                                         after_path, success, error_message)
            VALUES (?, ?, 'undo', ?, ?, ?, ?)
            """,
            (rb_batch, eid, before, after, 1 if success else 0, err),
        )
        if success:
            conn.execute(
                "UPDATE executed_actions SET reversible = 0 WHERE id = ?",
                (eid,),
            )
            conn.execute("UPDATE files_index SET path = ? WHERE path = ?", (before, after))
        results.append({
            "executed_id": eid,
            "success": success,
            "error": err,
            "before_path": before,
            "after_path": after,
        })
    conn.commit()
    return results


def list_batches(conn: sqlite3.Connection, limit: int = 50) -> list[dict]:
    rows = conn.execute(
        """
        SELECT batch_id, MIN(executed_at) AS started_at,
               COUNT(*) AS action_count,
               SUM(success) AS success_count,
               SUM(reversible) AS reversible_count
        FROM executed_actions
        GROUP BY batch_id
        ORDER BY started_at DESC
        LIMIT ?
        """,
        (limit,),
    ).fetchall()
    return [dict(r) for r in rows]
