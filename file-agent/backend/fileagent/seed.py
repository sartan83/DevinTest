"""Seed default organization rules and common folder roles."""

from __future__ import annotations

import json
import os
import sqlite3
from pathlib import Path

from .rules_engine import DEFAULT_RULES


def seed_rules(conn: sqlite3.Connection) -> int:
    inserted = 0
    for rule in DEFAULT_RULES:
        cur = conn.execute(
            """
            INSERT OR IGNORE INTO organization_rules
                (key, name, description, enabled, risk, mode, min_confidence, config_json, priority)
            VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?)
            """,
            (
                rule["key"], rule["name"], rule["description"],
                rule["risk"], rule["mode"], rule["min_confidence"],
                json.dumps({}), rule["priority"],
            ),
        )
        inserted += cur.rowcount
    conn.commit()
    return inserted


def seed_settings(conn: sqlite3.Connection) -> None:
    defaults = {
        "archive_days": "180",
        "default_mode": "preview",
        "min_confidence_global": "0.85",
        "allow_ai": "0",
    }
    for k, v in defaults.items():
        conn.execute(
            "INSERT OR IGNORE INTO app_settings(key, value) VALUES (?, ?)",
            (k, v),
        )
    conn.commit()


def _detect_default_folders() -> list[dict]:
    out: list[dict] = []
    home = Path.home()
    candidates = [
        ("downloads", os.environ.get("USERPROFILE", str(home)) + os.sep + "Downloads" if os.name == "nt" else str(home / "Downloads")),
        ("documents", os.environ.get("USERPROFILE", str(home)) + os.sep + "Documents" if os.name == "nt" else str(home / "Documents")),
        ("pictures",  os.environ.get("USERPROFILE", str(home)) + os.sep + "Pictures"  if os.name == "nt" else str(home / "Pictures")),
    ]
    for role, path in candidates:
        if Path(path).exists():
            out.append({"role": role, "path": path})
    return out


def seed_watched_folders(conn: sqlite3.Connection, detect: bool = True) -> int:
    if not detect:
        return 0
    inserted = 0
    for f in _detect_default_folders():
        cur = conn.execute(
            "INSERT OR IGNORE INTO watched_folders(path, role, enabled) VALUES (?, ?, 1)",
            (f["path"], f["role"]),
        )
        inserted += cur.rowcount
    conn.commit()
    return inserted


def seed_all(conn: sqlite3.Connection, *, detect_folders: bool = True) -> dict:
    return {
        "rules": seed_rules(conn),
        "settings": (seed_settings(conn) or "ok"),
        "folders": seed_watched_folders(conn, detect=detect_folders),
    }
