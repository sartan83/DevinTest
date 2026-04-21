"""Safety guards for every file operation.

Enforces the root allowlist, hard-denied system locations, and protected
extensions. Used by both the planner (to prevent illegal plans) and the
executor (defense in depth).
"""

from __future__ import annotations

import os
from pathlib import Path

# Hard-denied system roots. Matched case-insensitively on Windows.
HARD_DENIED_ROOTS_WIN = [
    r"C:\Windows",
    r"C:\Program Files",
    r"C:\Program Files (x86)",
    r"C:\ProgramData",
]
# Any path whose normalized form contains one of these fragments is denied.
HARD_DENIED_FRAGMENTS_WIN = [
    r"\AppData\Local\Microsoft",
    r"\AppData\Local\Packages",
    r"\System32",
    r"\SysWOW64",
]

# Extensions we refuse to touch by default (can be overridden in settings).
PROTECTED_EXTENSIONS = {".sys", ".dll", ".drv", ".ini", ".lnk", ".msc", ".cpl"}


def _norm(p: str | os.PathLike[str]) -> str:
    return os.path.normcase(os.path.abspath(str(p)))


def is_within(path: str | os.PathLike[str], root: str | os.PathLike[str]) -> bool:
    """Return True iff *path* resolves inside *root* (no symlink escape)."""
    try:
        p = Path(path).resolve(strict=False)
        r = Path(root).resolve(strict=False)
    except OSError:
        return False
    try:
        p.relative_to(r)
        return True
    except ValueError:
        return False


def _contains_any(p: str, fragments: list[str]) -> bool:
    np = os.path.normcase(p)
    return any(os.path.normcase(f) in np for f in fragments)


def is_system_path(path: str | os.PathLike[str]) -> bool:
    raw = str(path)
    # Windows-style checks work cross-platform (matched on raw string) so a Linux
    # test rig can still validate Windows-path guards.
    lowered = raw.lower().replace("/", "\\")
    if len(lowered) > 1 and lowered[1] == ":" or lowered.startswith(("c:\\", "d:\\")):
        for root in HARD_DENIED_ROOTS_WIN:
            r = root.lower()
            if lowered == r or lowered.startswith(r + "\\"):
                return True
        for frag in HARD_DENIED_FRAGMENTS_WIN:
            if frag.lower() in lowered:
                return True
    # POSIX (use the absolute normalized form)
    np = _norm(path)
    for root in ("/bin", "/sbin", "/usr/bin", "/usr/sbin", "/etc", "/boot", "/proc", "/sys"):
        if np == os.path.normcase(root) or np.startswith(os.path.normcase(root) + os.sep):
            return True
    return False


def is_protected_extension(path: str | os.PathLike[str]) -> bool:
    ext = Path(path).suffix.lower()
    return ext in PROTECTED_EXTENSIONS


class SafetyError(RuntimeError):
    """Raised when a proposed or executed action violates the safety model."""


def check_operation(
    before_path: str,
    after_path: str,
    allowed_roots: list[str],
    *,
    allow_protected_ext: bool = False,
) -> None:
    """Validate a single operation.

    Rules:
      1. Source must exist inside one of ``allowed_roots``.
      2. Destination must also be inside an allowed root.
      3. Neither path may be a system path.
      4. Protected extensions require ``allow_protected_ext=True``.
    """
    if not allowed_roots:
        raise SafetyError("No allowed roots configured")

    if is_system_path(before_path) or is_system_path(after_path):
        raise SafetyError(f"Refusing to touch system path: {before_path} -> {after_path}")

    if not allow_protected_ext and (is_protected_extension(before_path) or is_protected_extension(after_path)):
        raise SafetyError(f"Refusing to touch protected extension: {before_path}")

    if not any(is_within(before_path, r) for r in allowed_roots):
        raise SafetyError(f"Source path is outside allowed roots: {before_path}")
    if not any(is_within(after_path, r) for r in allowed_roots):
        raise SafetyError(f"Destination path is outside allowed roots: {after_path}")
