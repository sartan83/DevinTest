"""Audit log helpers. Actions themselves are logged by the executor / rollback.
This module provides convenient queries for the UI's "Activity log" tab.
"""

from __future__ import annotations

import sqlite3
from typing import Any


def list_executed(conn: sqlite3.Connection, limit: int = 200) -> list[dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT e.id, e.batch_id, e.op_type, e.before_path, e.after_path,
               e.success, e.error_message, e.reversible, e.executed_at,
               r.key AS rule_key, r.name AS rule_name
        FROM executed_actions e
        LEFT JOIN organization_rules r ON r.id = e.rule_id
        ORDER BY e.executed_at DESC
        LIMIT ?
        """,
        (limit,),
    ).fetchall()
    return [dict(r) for r in rows]


def list_rollback(conn: sqlite3.Connection, limit: int = 200) -> list[dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT id, batch_id, executed_id, op_type, before_path, after_path,
               success, error_message, executed_at
        FROM rollback_history
        ORDER BY executed_at DESC
        LIMIT ?
        """,
        (limit,),
    ).fetchall()
    return [dict(r) for r in rows]
