"""Planner: turns candidates into safe :class:`ProposedAction` rows.

Responsibilities:
  * Run rules against the latest classification for each file.
  * Enforce safety (allowed roots, no system paths, no overwrites).
  * Detect duplicate-hash collisions and emit quarantine candidates.
  * Resolve filename conflicts at the destination with suffix disambiguation.
  * Persist proposals to ``proposed_actions`` and return a summary.
"""

from __future__ import annotations

import os
import sqlite3
import uuid
from collections import defaultdict
from collections.abc import Iterable
from datetime import UTC, datetime
from pathlib import Path

from .classifier import Classification, ClassifierInput, classify
from .content_extractor import extract_text
from .models import OrganizationRule, PlanSummary
from .rules_engine import Candidate, RuleContext, apply_rules
from .safety import SafetyError, check_operation


def _row_to_rule(row: sqlite3.Row) -> OrganizationRule:
    return OrganizationRule(
        id=row["id"], key=row["key"], name=row["name"], description=row["description"] or "",
        enabled=bool(row["enabled"]), risk=row["risk"], mode=row["mode"],
        min_confidence=float(row["min_confidence"]), config_json=row["config_json"],
        priority=int(row["priority"]),
    )


def _load_rules(conn: sqlite3.Connection) -> list[OrganizationRule]:
    rows = conn.execute(
        "SELECT id, key, name, description, enabled, risk, mode, min_confidence, config_json, priority "
        "FROM organization_rules ORDER BY priority ASC"
    ).fetchall()
    return [_row_to_rule(r) for r in rows]


def _load_folders(conn: sqlite3.Connection) -> dict[str, str]:
    rows = conn.execute(
        "SELECT role, path FROM watched_folders WHERE enabled = 1"
    ).fetchall()
    roots: dict[str, str] = {}
    for r in rows:
        role = (r["role"] or "user").lower()
        # Last-writer-wins for a given role; "user" role path is kept under a composite key.
        if role == "user":
            roots.setdefault("user", r["path"])
        else:
            roots[role] = r["path"]
    return roots


def _allowed_roots(conn: sqlite3.Connection) -> list[str]:
    rows = conn.execute("SELECT path FROM watched_folders WHERE enabled = 1").fetchall()
    return [r["path"] for r in rows]


def _uniquify(dest: str, used: set[str]) -> str:
    """If *dest* is already planned or already exists on disk, append (1), (2), ..."""
    p = Path(dest)
    parent, stem, suffix = p.parent, p.stem, p.suffix
    candidate = dest
    i = 1
    while candidate in used or Path(candidate).exists():
        candidate = str(parent / f"{stem} ({i}){suffix}")
        i += 1
    return candidate


def _duplicate_candidates(conn: sqlite3.Connection, roots: dict[str, str]) -> list[Candidate]:
    """Emit quarantine candidates for files sharing a sha256 within Downloads."""
    downloads = roots.get("downloads")
    if not downloads:
        return []
    rows = conn.execute(
        """
        SELECT id, path, sha256, COALESCE(modified_at, created_at) AS ts
        FROM files_index
        WHERE sha256 IS NOT NULL AND sha256 != ''
        ORDER BY sha256, ts ASC
        """
    ).fetchall()
    buckets: dict[str, list[sqlite3.Row]] = defaultdict(list)
    for r in rows:
        try:
            Path(r["path"]).resolve().relative_to(Path(downloads).resolve())
        except (ValueError, OSError):
            continue
        buckets[r["sha256"]].append(r)
    out: list[Candidate] = []
    for sha, group in buckets.items():
        if len(group) < 2:
            continue
        # keep the oldest, quarantine the rest
        for r in group[1:]:
            src = r["path"]
            name = Path(src).name
            dest = str(Path(downloads) / "Duplicates_Review" / name)
            out.append(Candidate(
                rule_key="duplicate_downloads",
                op_type="quarantine",
                before_path=src,
                after_path=dest,
                reason=f"Exact duplicate (sha256 {sha[:10]}…)",
                confidence=0.99,
                requires_approval=True,
            ))
    return out


def build_plan(
    conn: sqlite3.Connection,
    *,
    folder_ids: Iterable[int] | None = None,
    rule_keys: Iterable[str] | None = None,
    extract_content: bool = False,
    now: datetime | None = None,
) -> tuple[str, list[int]]:
    """Compute proposals and persist them. Returns ``(plan_id, proposal_ids)``."""
    plan_id = str(uuid.uuid4())
    ctx_now = now or datetime.now(UTC)

    rules = _load_rules(conn)
    if rule_keys is not None:
        wanted = set(rule_keys)
        rules = [r for r in rules if r.key in wanted]
    roots = _load_folders(conn)
    # Archive-age passthrough via roots dict hack (kept internal to the engine)
    roots_for_rules = dict(roots)
    setting = conn.execute("SELECT value FROM app_settings WHERE key = 'archive_days'").fetchone()
    if setting:
        roots_for_rules["__archive_days__"] = str(setting["value"])

    allowed = _allowed_roots(conn)

    # Select candidate files. Explicit empty ``folder_ids=[]`` means "plan nothing" —
    # must not silently fall through to "plan everything" (same footgun guard as
    # executor.apply / rollback._select_executed).
    if folder_ids is not None:
        ids = list(folder_ids)
        if not ids:
            file_rows = []
        else:
            placeholders = ",".join(["?"] * len(ids))
            file_rows = conn.execute(
                f"SELECT id, path FROM files_index WHERE folder_id IN ({placeholders})",
                ids,
            ).fetchall()
    else:
        file_rows = conn.execute("SELECT id, path FROM files_index").fetchall()

    all_candidates: list[tuple[int, Candidate, OrganizationRule | None]] = []
    rules_ctx = RuleContext(now=ctx_now, roots=roots_for_rules, has_text=extract_content)

    rule_by_key = {r.key: r for r in rules}

    for row in file_rows:
        p = Path(row["path"])
        if not p.exists():
            continue
        text = extract_text(p) if extract_content else ""
        clf = classify(ClassifierInput(path=p, extracted_text=text))
        clf.file_id = int(row["id"])
        _store_classification(conn, clf)
        cands = apply_rules(p, clf, rules, rules_ctx)
        for c in cands:
            all_candidates.append((clf.file_id, c, rule_by_key.get(c.rule_key)))

    # Duplicate detection (cross-file, needs the whole index)
    if rule_keys is None or "duplicate_downloads" in set(rule_keys):
        for dup in _duplicate_candidates(conn, roots):
            frow = conn.execute("SELECT id FROM files_index WHERE path = ?", (dup.before_path,)).fetchone()
            if frow is None:
                continue
            all_candidates.append((int(frow["id"]), dup, None))

    # Persist safely, with conflict resolution
    used_destinations: set[str] = set()
    proposal_ids: list[int] = []
    for file_id, cand, rule in all_candidates:
        final_dest = _uniquify(cand.after_path, used_destinations)
        # Skip no-op (source already at destination)
        if os.path.normcase(cand.before_path) == os.path.normcase(final_dest):
            continue
        try:
            check_operation(cand.before_path, final_dest, allowed)
        except SafetyError:
            # Silently drop unsafe proposals; they'll never be shown to the user.
            continue
        used_destinations.add(final_dest)
        cur = conn.execute(
            """
            INSERT INTO proposed_actions(plan_id, file_id, rule_id, op_type, before_path,
                                         after_path, reason, confidence, requires_approval, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
            RETURNING id
            """,
            (
                plan_id, file_id, rule.id if rule else None, cand.op_type, cand.before_path,
                final_dest, cand.reason, cand.confidence, 1 if cand.requires_approval else 0,
            ),
        )
        proposal_ids.append(int(cur.fetchone()[0]))
    conn.commit()
    return plan_id, proposal_ids


def _store_classification(conn: sqlite3.Connection, c: Classification) -> None:
    conn.execute(
        """
        INSERT INTO classification_results(file_id, category, topic, confidence, source)
        VALUES (?, ?, ?, ?, ?)
        """,
        (c.file_id, c.category, c.topic, c.confidence, c.source),
    )


def summarize_plan(conn: sqlite3.Connection, plan_id: str) -> PlanSummary:
    rows = conn.execute(
        """
        SELECT pa.requires_approval, r.key AS rule_key
        FROM proposed_actions pa
        LEFT JOIN organization_rules r ON r.id = pa.rule_id
        WHERE pa.plan_id = ?
        """,
        (plan_id,),
    ).fetchall()
    total = len(rows)
    approval = sum(1 for r in rows if r["requires_approval"])
    counts: dict[str, int] = defaultdict(int)
    for r in rows:
        key = r["rule_key"] or "duplicate_downloads"
        counts[key] += 1
    return PlanSummary(
        plan_id=plan_id,
        total_actions=total,
        auto_eligible=total - approval,
        requires_approval=approval,
        counts_by_rule=dict(counts),
    )
