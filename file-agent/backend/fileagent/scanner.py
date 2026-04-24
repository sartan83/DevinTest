"""Folder scanner: walks allowlisted folders and upserts metadata into SQLite."""

from __future__ import annotations

import hashlib
import os
import sqlite3
from collections.abc import Iterable, Iterator
from datetime import UTC, datetime
from pathlib import Path

from .models import FileRecord
from .safety import is_system_path

HASH_CHUNK = 1 << 20  # 1 MiB


def _iso(ts: float) -> str:
    return datetime.fromtimestamp(ts, tz=UTC).isoformat()


def iter_files(root: Path, *, follow_symlinks: bool = False) -> Iterator[Path]:
    """Yield regular files under *root*, skipping hidden dirs and system paths."""
    root = Path(root)
    if not root.exists():
        return
    for dirpath, dirnames, filenames in os.walk(root, followlinks=follow_symlinks):
        # Prune hidden and system dirs in-place for efficiency.
        dirnames[:] = [d for d in dirnames if not d.startswith(".") and not is_system_path(Path(dirpath) / d)]
        for name in filenames:
            p = Path(dirpath) / name
            if name.startswith("."):
                continue
            if is_system_path(p):
                continue
            try:
                if p.is_file() and not p.is_symlink():
                    yield p
            except OSError:
                continue


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while chunk := f.read(HASH_CHUNK):
            h.update(chunk)
    return h.hexdigest()


def file_record(path: Path, *, folder_id: int | None, compute_hash: bool = False) -> FileRecord:
    st = path.stat()
    sha = sha256_file(path) if compute_hash else None
    return FileRecord(
        path=str(path),
        folder_id=folder_id,
        name=path.name,
        extension=path.suffix.lower() or None,
        size_bytes=st.st_size,
        created_at=datetime.fromtimestamp(st.st_ctime, tz=UTC),
        modified_at=datetime.fromtimestamp(st.st_mtime, tz=UTC),
        sha256=sha,
    )


def upsert_file(conn: sqlite3.Connection, rec: FileRecord) -> int:
    cur = conn.execute(
        """
        INSERT INTO files_index(path, folder_id, name, extension, size_bytes,
                                created_at, modified_at, sha256, last_scanned_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        ON CONFLICT(path) DO UPDATE SET
            folder_id = excluded.folder_id,
            name = excluded.name,
            extension = excluded.extension,
            size_bytes = excluded.size_bytes,
            created_at = excluded.created_at,
            modified_at = excluded.modified_at,
            sha256 = COALESCE(excluded.sha256, files_index.sha256),
            last_scanned_at = datetime('now')
        RETURNING id
        """,
        (
            rec.path, rec.folder_id, rec.name, rec.extension, rec.size_bytes,
            rec.created_at.isoformat() if rec.created_at else None,
            rec.modified_at.isoformat() if rec.modified_at else None,
            rec.sha256,
        ),
    )
    row = cur.fetchone()
    return int(row[0])


def scan_folder(
    conn: sqlite3.Connection,
    folder_id: int,
    root: Path,
    *,
    compute_hashes: bool = False,
) -> int:
    """Scan *root*, upsert file records, return number of files seen."""
    count = 0
    for p in iter_files(root):
        try:
            rec = file_record(p, folder_id=folder_id, compute_hash=compute_hashes)
        except OSError:
            continue
        upsert_file(conn, rec)
        count += 1
    conn.commit()
    return count


def scan_all(conn: sqlite3.Connection, folder_ids: Iterable[int] | None = None, *, compute_hashes: bool = False) -> dict[int, int]:
    if folder_ids is None:
        rows = conn.execute("SELECT id, path FROM watched_folders WHERE enabled = 1").fetchall()
    else:
        ids = list(folder_ids)
        if not ids:
            return {}
        placeholders = ",".join(["?"] * len(ids))
        rows = conn.execute(
            f"SELECT id, path FROM watched_folders WHERE enabled = 1 AND id IN ({placeholders})",
            ids,
        ).fetchall()
    out: dict[int, int] = {}
    for row in rows:
        out[int(row["id"])] = scan_folder(conn, int(row["id"]), Path(row["path"]), compute_hashes=compute_hashes)
    return out
