from __future__ import annotations

import hashlib
import sqlite3
from pathlib import Path

from fileagent.executor import apply as executor_apply, approve
from fileagent.models import ApplyRequest, RollbackRequest
from fileagent.planner import build_plan, summarize_plan
from fileagent.rollback import rollback
from fileagent.scanner import scan_all


def _make_file(p: Path, content: bytes = b"x") -> Path:
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_bytes(content)
    return p


def test_end_to_end_plan_and_apply(conn: sqlite3.Connection, tmp_roots: dict[str, Path]) -> None:
    downloads = tmp_roots["downloads"]
    pictures = tmp_roots["pictures"]
    _make_file(downloads / "setup.exe", b"MZ")
    _make_file(downloads / "bundle.zip", b"PK")
    _make_file(pictures / "Screenshot 2025-02-01.png", b"\x89PNG")
    _make_file(downloads / "invoice-2025-01.pdf", b"%PDF")

    counts = scan_all(conn, compute_hashes=True)
    assert sum(counts.values()) == 4

    plan_id, ids = build_plan(conn)
    assert len(ids) >= 3
    summary = summarize_plan(conn, plan_id)
    assert summary.total_actions == len(ids)

    # Approve the low-risk actions manually (invoice requires approval)
    approve(conn, ids)
    _, executed = executor_apply(conn, ApplyRequest(plan_id=plan_id, mode="manual"))
    successes = [e for e in executed if e.success]
    assert len(successes) >= 3
    # Installer should be moved under Installers_And_Archives
    assert any("Installers_And_Archives" in e.after_path for e in successes)
    # Screenshot grouped by month
    assert any("Screenshots" in e.after_path for e in successes)
    # Files actually moved on disk
    for e in successes:
        assert Path(e.after_path).exists()
        assert not Path(e.before_path).exists()


def test_rollback_restores_files(conn: sqlite3.Connection, tmp_roots: dict[str, Path]) -> None:
    downloads = tmp_roots["downloads"]
    f = _make_file(downloads / "installer.exe", b"MZ")
    scan_all(conn)
    plan_id, ids = build_plan(conn)
    approve(conn, ids)
    batch_id, executed = executor_apply(conn, ApplyRequest(plan_id=plan_id, mode="manual"))
    assert any(e.success for e in executed)
    assert not f.exists()

    results = rollback(conn, RollbackRequest(batch_id=batch_id))
    assert any(r["success"] for r in results)
    assert f.exists()


def test_duplicates_moved_to_review(conn: sqlite3.Connection, tmp_roots: dict[str, Path]) -> None:
    downloads = tmp_roots["downloads"]
    payload = b"same bytes"
    a = _make_file(downloads / "alpha.bin", payload)
    b = _make_file(downloads / "beta.bin", payload)
    # Reuse identical sha256 for both via scanner's compute_hashes
    scan_all(conn, compute_hashes=True)
    # Classifier doesn't know either, but duplicate detector operates on sha256
    plan_id, ids = build_plan(conn)
    rows = [
        dict(r) for r in conn.execute(
            "SELECT op_type, after_path FROM proposed_actions WHERE plan_id = ?",
            (plan_id,),
        ).fetchall()
    ]
    assert any(r["op_type"] == "quarantine" and "Duplicates_Review" in r["after_path"] for r in rows)


def test_safety_blocks_out_of_root(conn: sqlite3.Connection, tmp_roots: dict[str, Path], tmp_path: Path) -> None:
    # A file outside all watched roots should be ignored — not moved.
    outside = tmp_path / "outside" / "foo.exe"
    outside.parent.mkdir()
    outside.write_bytes(b"MZ")
    # Don't scan it; even if someone manually inserts it, planner won't produce a proposal
    # because its path isn't under any allowed root.
    conn.execute(
        "INSERT INTO files_index(path, folder_id, name, extension, size_bytes) VALUES (?, NULL, ?, '.exe', 2)",
        (str(outside), "foo.exe"),
    )
    conn.commit()
    plan_id, ids = build_plan(conn)
    # The only proposal (if any) should not touch this file
    rows = conn.execute(
        "SELECT before_path FROM proposed_actions WHERE plan_id = ?", (plan_id,),
    ).fetchall()
    assert all(r["before_path"] != str(outside) for r in rows)
