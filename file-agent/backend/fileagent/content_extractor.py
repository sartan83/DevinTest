"""Best-effort text extraction for classification hints.

All extractors are bounded (we never read more than ``MAX_CHARS`` of content)
and silently return ``""`` on failure — this is a hint layer, not a document
processor.
"""

from __future__ import annotations

from pathlib import Path

MAX_CHARS = 4000
PDF_MAX_PAGES = 3


def _safe(extractor):
    def wrapped(path: Path) -> str:
        try:
            return extractor(path)[:MAX_CHARS]
        except Exception:
            return ""

    return wrapped


@_safe
def _extract_pdf(path: Path) -> str:
    from pypdf import PdfReader  # lazy import; optional dep at runtime

    reader = PdfReader(str(path))
    parts: list[str] = []
    for _i, page in enumerate(reader.pages[:PDF_MAX_PAGES]):
        parts.append(page.extract_text() or "")
        if sum(len(x) for x in parts) >= MAX_CHARS:
            break
    return "\n".join(parts)


@_safe
def _extract_docx(path: Path) -> str:
    from docx import Document  # lazy import

    doc = Document(str(path))
    text = "\n".join(p.text for p in doc.paragraphs)
    return text


@_safe
def _extract_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")


def extract_text(path: Path) -> str:
    """Return up to ``MAX_CHARS`` of text from the file, or ``""``."""
    ext = path.suffix.lower()
    if ext == ".pdf":
        return _extract_pdf(path)
    if ext == ".docx":
        return _extract_docx(path)
    if ext in {".txt", ".md", ".csv", ".log", ".json", ".yaml", ".yml", ".ini", ".cfg"}:
        return _extract_text(path)
    return ""
