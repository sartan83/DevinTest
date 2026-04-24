"""Deterministic-first file classifier.

Returns a :class:`Classification` with a category, optional topic and a
confidence score in ``[0, 1]``. No AI calls happen here; an ``AIProvider`` may
be layered on top by the rules engine for uncertain files.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

from .models import Category, Classification

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".tiff", ".heic"}
VIDEO_EXTS = {".mp4", ".mov", ".avi", ".mkv", ".webm", ".wmv", ".flv"}
AUDIO_EXTS = {".mp3", ".wav", ".flac", ".m4a", ".aac", ".ogg"}
INSTALLER_EXTS = {".exe", ".msi", ".dmg", ".pkg", ".appimage"}
ARCHIVE_EXTS = {".zip", ".rar", ".7z", ".tar", ".gz", ".bz2", ".xz", ".iso"}
OFFICE_EXTS = {".doc", ".docx", ".odt", ".rtf"}
SPREADSHEET_EXTS = {".xls", ".xlsx", ".ods", ".csv", ".tsv"}
PRESENTATION_EXTS = {".ppt", ".pptx", ".odp", ".key"}
CODE_EXTS = {
    ".py", ".js", ".ts", ".tsx", ".jsx", ".rs", ".go", ".java", ".c", ".cpp", ".h", ".hpp",
    ".cs", ".rb", ".php", ".swift", ".kt", ".sh", ".ps1", ".sql", ".html", ".css", ".scss",
}
TEMP_EXTS = {".tmp", ".part", ".crdownload", ".bak", ".old"}

SCREENSHOT_PATTERNS = [
    re.compile(r"^screenshot", re.I),
    re.compile(r"^screen shot", re.I),
    re.compile(r"^cattura", re.I),
    re.compile(r"^capture", re.I),
    re.compile(r"^screen_\d", re.I),
    re.compile(r"^scr[-_]\d{8}", re.I),
]

INVOICE_KEYWORDS = [
    "invoice", "fattura", "receipt", "ricevuta", "order", "ordine", "bill",
    "bolletta", "fatture", "preventivo", "quote",
]
CONTRACT_KEYWORDS = ["contract", "contratto", "nda", "agreement", "accordo", "terms"]
RESUME_KEYWORDS = ["cv", "resume", "curriculum", "curriculum vitae"]
IDENTITY_KEYWORDS = [
    "passport", "passaporto", "carta identita", "carta d'identita", "codice fiscale",
    "patente", "driver license", "social security", "ssn",
]
MANUAL_KEYWORDS = ["manual", "handbook", "guida", "istruzioni", "user guide"]


@dataclass
class ClassifierInput:
    path: Path
    extracted_text: str = ""


def _matches_any(text: str, keywords: list[str]) -> bool:
    t = text.lower()
    return any(k in t for k in keywords)


def _score_keyword_hit(name_hit: bool, text_hit: bool) -> float:
    if name_hit and text_hit:
        return 0.95
    if name_hit:
        return 0.88
    if text_hit:
        return 0.78
    return 0.0


def classify(inp: ClassifierInput) -> Classification:
    path = inp.path
    name = path.name
    stem = path.stem.lower()
    ext = path.suffix.lower()
    text = inp.extracted_text or ""

    # 1. Deterministic extension buckets.
    if any(p.match(name) for p in SCREENSHOT_PATTERNS) and ext in IMAGE_EXTS:
        return Classification(file_id=-1, category="screenshot", confidence=0.97)
    if ext in INSTALLER_EXTS:
        return Classification(file_id=-1, category="installer", confidence=0.99)
    if ext in ARCHIVE_EXTS:
        return Classification(file_id=-1, category="archive", confidence=0.99)
    if ext in VIDEO_EXTS:
        return Classification(file_id=-1, category="video", confidence=0.95)
    if ext in AUDIO_EXTS:
        return Classification(file_id=-1, category="audio", confidence=0.95)
    if ext in IMAGE_EXTS:
        return Classification(file_id=-1, category="image", confidence=0.9)
    if ext in TEMP_EXTS:
        return Classification(file_id=-1, category="temporary", confidence=0.95)
    if ext in CODE_EXTS:
        return Classification(file_id=-1, category="code", confidence=0.9)
    if ext in SPREADSHEET_EXTS:
        base = Classification(file_id=-1, category="spreadsheet", confidence=0.9)
    elif ext in PRESENTATION_EXTS:
        base = Classification(file_id=-1, category="presentation", confidence=0.9)
    elif ext in OFFICE_EXTS:
        base = Classification(file_id=-1, category="office", confidence=0.88)
    elif ext == ".pdf":
        base = Classification(file_id=-1, category="pdf", confidence=0.9)
    else:
        base = Classification(file_id=-1, category="unknown", confidence=0.3)

    # 2. Topic refinement for document-ish files.
    if base.category in {"pdf", "office", "spreadsheet", "unknown"}:
        topic, topic_conf = _refine_topic(stem, text)
        if topic is not None:
            category: Category
            if topic == "invoice":
                category = "invoice"
            elif topic == "contract":
                category = "contract"
            elif topic == "identity":
                category = "identity"
            elif topic == "manual":
                category = "manual"
            elif topic == "resume":
                category = "resume"
            else:
                category = base.category
            return Classification(
                file_id=-1,
                category=category,
                topic=topic,
                confidence=max(base.confidence, topic_conf),
            )

    return base


def _refine_topic(stem: str, text: str) -> tuple[str | None, float]:
    """Return (topic, confidence) or (None, 0) if nothing matches."""
    candidates: list[tuple[str, float]] = []
    mapping = [
        ("invoice", INVOICE_KEYWORDS),
        ("contract", CONTRACT_KEYWORDS),
        ("resume", RESUME_KEYWORDS),
        ("identity", IDENTITY_KEYWORDS),
        ("manual", MANUAL_KEYWORDS),
    ]
    for topic, kws in mapping:
        name_hit = _matches_any(stem, kws)
        text_hit = _matches_any(text, kws) if text else False
        score = _score_keyword_hit(name_hit, text_hit)
        if score > 0:
            candidates.append((topic, score))
    if not candidates:
        return None, 0.0
    candidates.sort(key=lambda x: x[1], reverse=True)
    return candidates[0]
