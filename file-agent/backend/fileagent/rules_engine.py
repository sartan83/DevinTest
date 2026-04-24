"""Rules engine.

A rule takes a (file, classification, context) triple and emits zero or more
:class:`Candidate` actions. The planner turns candidates into concrete
:class:`ProposedAction` rows. Each rule is self-contained and addressable by a
stable ``key`` so user-edited DB settings (``enabled``, ``mode``, ``min_confidence``)
can be respected at runtime.
"""

from __future__ import annotations

from collections.abc import Callable, Iterable
from dataclasses import dataclass, field
from datetime import UTC, datetime
from pathlib import Path

from .classifier import Classification
from .models import OrganizationRule


@dataclass
class RuleContext:
    """Per-run context shared across rules."""
    now: datetime = field(default_factory=lambda: datetime.now(UTC))
    # Known roots for each role (e.g. {"downloads": "C:/Users/x/Downloads"}).
    roots: dict[str, str] = field(default_factory=dict)
    # When True, text extraction was performed; rules that need content can gate on this.
    has_text: bool = False


@dataclass
class Candidate:
    rule_key: str
    op_type: str  # 'move' | 'rename' | 'quarantine' | 'archive'
    before_path: str
    after_path: str
    reason: str
    confidence: float
    requires_approval: bool = True


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #

def _dest(root: str | None, *parts: str) -> str | None:
    if not root:
        return None
    return str(Path(root).joinpath(*parts))


def _safe_month_bucket(dt: datetime) -> str:
    return dt.strftime("%Y-%m")


def _safe_year(dt: datetime) -> str:
    return dt.strftime("%Y")


# --------------------------------------------------------------------------- #
# Individual rule implementations. Each returns Optional[Candidate].
# --------------------------------------------------------------------------- #

def _rule_downloads_installers(file: Path, c: Classification, ctx: RuleContext) -> Candidate | None:
    if c.category not in {"installer", "archive"}:
        return None
    downloads = ctx.roots.get("downloads")
    if not downloads or not _under(file, downloads):
        return None
    dest = _dest(downloads, "Installers_And_Archives", file.name)
    if dest is None:
        return None
    return Candidate(
        rule_key="downloads_installers",
        op_type="move",
        before_path=str(file),
        after_path=dest,
        reason=f"{c.category.capitalize()} in Downloads",
        confidence=c.confidence,
        requires_approval=False,
    )


def _rule_screenshots(file: Path, c: Classification, ctx: RuleContext) -> Candidate | None:
    if c.category != "screenshot":
        return None
    pictures = ctx.roots.get("pictures")
    if not pictures:
        return None
    bucket = _safe_month_bucket(_mtime(file, ctx.now))
    dest = _dest(pictures, "Screenshots", bucket, file.name)
    if dest is None:
        return None
    return Candidate(
        rule_key="screenshots_by_month",
        op_type="move",
        before_path=str(file),
        after_path=dest,
        reason="Screenshot grouped by month",
        confidence=c.confidence,
        requires_approval=False,
    )


def _rule_finance(file: Path, c: Classification, ctx: RuleContext) -> Candidate | None:
    if c.topic != "invoice" and c.category != "invoice":
        return None
    documents = ctx.roots.get("documents")
    if not documents:
        return None
    year = _safe_year(_mtime(file, ctx.now))
    dest = _dest(documents, "Finance", year, file.name)
    if dest is None:
        return None
    return Candidate(
        rule_key="finance_invoices",
        op_type="move",
        before_path=str(file),
        after_path=dest,
        reason="Invoice / receipt heuristic",
        confidence=c.confidence,
    )


def _rule_career(file: Path, c: Classification, ctx: RuleContext) -> Candidate | None:
    if c.topic != "resume" and c.category != "resume":
        return None
    documents = ctx.roots.get("documents")
    if not documents:
        return None
    dest = _dest(documents, "Career", file.name)
    if dest is None:
        return None
    return Candidate(
        rule_key="career_resume",
        op_type="move",
        before_path=str(file),
        after_path=dest,
        reason="Resume / CV heuristic",
        confidence=c.confidence,
    )


def _rule_contracts(file: Path, c: Classification, ctx: RuleContext) -> Candidate | None:
    if c.topic != "contract" and c.category != "contract":
        return None
    documents = ctx.roots.get("documents")
    if not documents:
        return None
    dest = _dest(documents, "Contracts", file.name)
    if dest is None:
        return None
    return Candidate(
        rule_key="contracts",
        op_type="move",
        before_path=str(file),
        after_path=dest,
        reason="Contract / NDA heuristic",
        confidence=c.confidence,
    )


def _rule_identity(file: Path, c: Classification, ctx: RuleContext) -> Candidate | None:
    if c.topic != "identity" and c.category != "identity":
        return None
    documents = ctx.roots.get("documents")
    if not documents:
        return None
    dest = _dest(documents, "Personal", "ID", file.name)
    if dest is None:
        return None
    return Candidate(
        rule_key="identity_docs",
        op_type="move",
        before_path=str(file),
        after_path=dest,
        reason="Sensitive identity document (requires review)",
        confidence=c.confidence,
        requires_approval=True,
    )


def _rule_manuals(file: Path, c: Classification, ctx: RuleContext) -> Candidate | None:
    if c.topic != "manual" and c.category != "manual":
        return None
    documents = ctx.roots.get("documents")
    if not documents:
        return None
    dest = _dest(documents, "Manuals", file.name)
    if dest is None:
        return None
    return Candidate(
        rule_key="manuals",
        op_type="move",
        before_path=str(file),
        after_path=dest,
        reason="Manual / guide heuristic",
        confidence=c.confidence,
    )


def _rule_group_by_type(file: Path, c: Classification, ctx: RuleContext) -> Candidate | None:
    # Fallback grouping for obvious Downloads clutter that didn't match a topical rule.
    downloads = ctx.roots.get("downloads")
    if not downloads or not _under(file, downloads):
        return None
    bucket_map = {
        "pdf": "PDFs",
        "image": "Images",
        "video": "Videos",
        "audio": "Audio",
        "office": "Documents",
        "spreadsheet": "Spreadsheets",
        "presentation": "Presentations",
    }
    bucket = bucket_map.get(c.category)
    if bucket is None:
        return None
    dest = _dest(downloads, "By_Type", bucket, file.name)
    if dest is None:
        return None
    return Candidate(
        rule_key="downloads_group_by_type",
        op_type="move",
        before_path=str(file),
        after_path=dest,
        reason=f"Downloads clutter: group {c.category}",
        confidence=max(0.6, c.confidence - 0.1),
    )


def _rule_temp_cleanup(file: Path, c: Classification, ctx: RuleContext) -> Candidate | None:
    if c.category != "temporary":
        return None
    downloads = ctx.roots.get("downloads")
    if not downloads or not _under(file, downloads):
        return None
    age = (ctx.now - _mtime(file, ctx.now)).days
    if age < 7:
        return None
    dest = _dest(downloads, "Review", file.name)
    if dest is None:
        return None
    return Candidate(
        rule_key="downloads_temp_cleanup",
        op_type="move",
        before_path=str(file),
        after_path=dest,
        reason=f"Temporary leftover older than 7 days (age: {age}d)",
        confidence=0.9,
        requires_approval=True,
    )


def _rule_archive_old(file: Path, c: Classification, ctx: RuleContext) -> Candidate | None:
    age_days = int(ctx.roots.get("__archive_days__", "180"))
    m = _mtime(file, ctx.now)
    age = (ctx.now - m).days
    if age < age_days:
        return None
    for role in ("downloads", "documents"):
        root = ctx.roots.get(role)
        if root and _under(file, root):
            dest = _dest(root, "Archive", _safe_month_bucket(m), file.name)
            if dest is None:
                return None
            return Candidate(
                rule_key="archive_old",
                op_type="archive",
                before_path=str(file),
                after_path=dest,
                reason=f"Older than {age_days} days (age: {age}d)",
                confidence=0.95,
                requires_approval=True,
            )
    return None


# --------------------------------------------------------------------------- #
# Rule registry
# --------------------------------------------------------------------------- #

RuleFn = Callable[[Path, Classification, RuleContext], Candidate | None]

REGISTRY: dict[str, RuleFn] = {
    "downloads_installers":    _rule_downloads_installers,
    "screenshots_by_month":    _rule_screenshots,
    "finance_invoices":        _rule_finance,
    "career_resume":           _rule_career,
    "contracts":               _rule_contracts,
    "identity_docs":           _rule_identity,
    "manuals":                 _rule_manuals,
    "downloads_group_by_type": _rule_group_by_type,
    "downloads_temp_cleanup":  _rule_temp_cleanup,
    "archive_old":             _rule_archive_old,
}


def apply_rules(
    file: Path,
    classification: Classification,
    rules: Iterable[OrganizationRule],
    ctx: RuleContext,
) -> list[Candidate]:
    """Run enabled rules against a file and return candidate actions."""
    out: list[Candidate] = []
    for rule in rules:
        if not rule.enabled or rule.mode == "off":
            continue
        fn = REGISTRY.get(rule.key)
        if fn is None:
            continue
        cand = fn(file, classification, ctx)
        if cand is None:
            continue
        # Enforce per-rule min_confidence: below threshold we still propose the
        # action, but force requires_approval=True (never auto-apply uncertain
        # choices).
        if cand.confidence < rule.min_confidence:
            cand.requires_approval = True
        # A rule in 'approval' mode always requires approval.
        if rule.mode in {"preview", "approval"}:
            cand.requires_approval = True
        out.append(cand)
    return _dedupe_by_file(out)


def _dedupe_by_file(cands: list[Candidate]) -> list[Candidate]:
    """Keep at most one candidate per source file: highest confidence wins."""
    best: dict[str, Candidate] = {}
    for c in cands:
        cur = best.get(c.before_path)
        if cur is None or c.confidence > cur.confidence:
            best[c.before_path] = c
    return list(best.values())


# --------------------------------------------------------------------------- #
# Low-level helpers
# --------------------------------------------------------------------------- #

def _under(path: Path, root: str) -> bool:
    try:
        Path(path).resolve().relative_to(Path(root).resolve())
        return True
    except (ValueError, OSError):
        return False


def _mtime(path: Path, fallback: datetime) -> datetime:
    try:
        return datetime.fromtimestamp(path.stat().st_mtime, tz=UTC)
    except OSError:
        return fallback


# Simple re-export used by seed.py to generate default rule rows.
DEFAULT_RULES: list[dict] = [
    {"key": "downloads_installers", "name": "Move installers & archives",
         "description": "Move .exe/.msi/.zip/.rar/.7z/.iso out of Downloads root into Installers_And_Archives",
         "risk": "safe", "mode": "auto", "min_confidence": 0.9, "priority": 10},
    {"key": "screenshots_by_month", "name": "Group screenshots by month",
         "description": "Move Screenshot*/Cattura*/Capture* images into Pictures/Screenshots/YYYY-MM",
         "risk": "safe", "mode": "auto", "min_confidence": 0.9, "priority": 20},
    {"key": "finance_invoices", "name": "Finance: invoices & receipts",
         "description": "PDFs matching invoice/fattura/receipt/order into Documents/Finance/YYYY",
         "risk": "review", "mode": "approval", "min_confidence": 0.8, "priority": 30},
    {"key": "career_resume", "name": "Career: CVs and resumes",
         "description": "Files matching cv/resume/curriculum into Documents/Career",
         "risk": "review", "mode": "approval", "min_confidence": 0.85, "priority": 40},
    {"key": "contracts", "name": "Contracts & NDAs",
         "description": "Files matching contract/NDA/agreement into Documents/Contracts",
         "risk": "review", "mode": "approval", "min_confidence": 0.85, "priority": 50},
    {"key": "identity_docs", "name": "Identity documents (sensitive)",
         "description": "Files matching passport/ID/codice fiscale/patente into Documents/Personal/ID",
         "risk": "sensitive", "mode": "approval", "min_confidence": 0.9, "priority": 60},
    {"key": "manuals", "name": "Manuals & guides",
         "description": "Manual/handbook PDFs into Documents/Manuals",
         "risk": "safe", "mode": "approval", "min_confidence": 0.8, "priority": 70},
    {"key": "downloads_group_by_type", "name": "Downloads: group by type",
         "description": "Fallback grouping of leftover Downloads clutter by extension bucket",
         "risk": "safe", "mode": "preview", "min_confidence": 0.6, "priority": 80},
    {"key": "downloads_temp_cleanup", "name": "Downloads: old temporary files",
         "description": "Move .tmp/.part/.crdownload older than 7 days into Downloads/Review",
         "risk": "review", "mode": "approval", "min_confidence": 0.9, "priority": 90},
    {"key": "archive_old", "name": "Archive old files",
         "description": "Archive files older than N days (default 180) into Archive/YYYY-MM",
         "risk": "review", "mode": "approval", "min_confidence": 0.9, "priority": 100},
]
