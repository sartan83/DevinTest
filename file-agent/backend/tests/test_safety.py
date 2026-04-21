from __future__ import annotations

from pathlib import Path

import pytest

from fileagent.safety import (
    SafetyError, check_operation, is_protected_extension, is_system_path, is_within,
)


def test_is_within_true(tmp_path: Path) -> None:
    child = tmp_path / "a" / "b.txt"
    child.parent.mkdir(parents=True)
    child.write_text("x")
    assert is_within(child, tmp_path)


def test_is_within_false(tmp_path: Path) -> None:
    assert not is_within("/does/not/exist", tmp_path)


def test_system_paths() -> None:
    assert is_system_path(r"C:\Windows\System32\kernel32.dll")
    assert is_system_path("/etc/passwd")
    assert not is_system_path("/home/user/Downloads/a.pdf")


def test_protected_ext() -> None:
    assert is_protected_extension("foo.dll")
    assert not is_protected_extension("foo.pdf")


def test_check_operation_rejects_outside_roots(tmp_path: Path) -> None:
    allowed = [str(tmp_path / "root")]
    (tmp_path / "root").mkdir()
    (tmp_path / "root" / "a.pdf").write_text("x")
    with pytest.raises(SafetyError):
        check_operation(str(tmp_path / "root" / "a.pdf"), "/tmp/bad.pdf", allowed)


def test_check_operation_rejects_system_dest(tmp_path: Path) -> None:
    allowed = [str(tmp_path)]
    (tmp_path / "a.pdf").write_text("x")
    with pytest.raises(SafetyError):
        check_operation(str(tmp_path / "a.pdf"), "/etc/a.pdf", allowed)


def test_check_operation_rejects_protected_ext(tmp_path: Path) -> None:
    allowed = [str(tmp_path)]
    (tmp_path / "a.dll").write_text("x")
    with pytest.raises(SafetyError):
        check_operation(str(tmp_path / "a.dll"), str(tmp_path / "sub" / "a.dll"), allowed)


def test_check_operation_accepts_valid(tmp_path: Path) -> None:
    allowed = [str(tmp_path)]
    src = tmp_path / "a.pdf"
    src.write_text("x")
    dst = tmp_path / "sub" / "a.pdf"
    # No exception
    check_operation(str(src), str(dst), allowed)
