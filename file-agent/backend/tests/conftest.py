from __future__ import annotations

import sqlite3
from pathlib import Path

import pytest

from fileagent.db import init_db
from fileagent.seed import seed_rules, seed_settings


@pytest.fixture
def tmp_roots(tmp_path: Path) -> dict[str, Path]:
    """Build a Downloads/Documents/Pictures layout under tmp_path."""
    downloads = tmp_path / "Downloads"
    documents = tmp_path / "Documents"
    pictures = tmp_path / "Pictures"
    for d in (downloads, documents, pictures):
        d.mkdir(parents=True, exist_ok=True)
    return {"downloads": downloads, "documents": documents, "pictures": pictures, "home": tmp_path}


@pytest.fixture
def conn(tmp_path: Path, tmp_roots: dict[str, Path]) -> sqlite3.Connection:
    db = tmp_path / "agent.db"
    c = init_db(db)
    # Seed rules + settings; folders are added explicitly per-test so we know the roots.
    seed_rules(c)
    seed_settings(c)
    for role in ("downloads", "documents", "pictures"):
        c.execute(
            "INSERT OR IGNORE INTO watched_folders(path, role, enabled) VALUES (?, ?, 1)",
            (str(tmp_roots[role]), role),
        )
    c.commit()
    yield c
    c.close()
