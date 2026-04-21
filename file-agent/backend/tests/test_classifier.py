from __future__ import annotations

from pathlib import Path

from fileagent.classifier import ClassifierInput, classify


def test_installer(tmp_path: Path) -> None:
    f = tmp_path / "setup.exe"
    f.write_bytes(b"MZ")
    c = classify(ClassifierInput(path=f))
    assert c.category == "installer"
    assert c.confidence > 0.9


def test_archive(tmp_path: Path) -> None:
    f = tmp_path / "bundle.zip"
    f.write_bytes(b"PK")
    c = classify(ClassifierInput(path=f))
    assert c.category == "archive"


def test_screenshot(tmp_path: Path) -> None:
    f = tmp_path / "Screenshot 2025-02-10 at 10.20.png"
    f.write_bytes(b"\x89PNG")
    c = classify(ClassifierInput(path=f))
    assert c.category == "screenshot"


def test_image_not_screenshot(tmp_path: Path) -> None:
    f = tmp_path / "vacation.png"
    f.write_bytes(b"\x89PNG")
    c = classify(ClassifierInput(path=f))
    assert c.category == "image"


def test_invoice_by_name(tmp_path: Path) -> None:
    f = tmp_path / "Invoice-2025-0012.pdf"
    f.write_bytes(b"%PDF-1.4")
    c = classify(ClassifierInput(path=f))
    assert c.category == "invoice"
    assert c.topic == "invoice"
    assert c.confidence >= 0.88


def test_resume_by_name(tmp_path: Path) -> None:
    f = tmp_path / "Jane_Doe_CV.docx"
    f.write_bytes(b"PK")
    c = classify(ClassifierInput(path=f))
    assert c.category == "resume"


def test_contract_by_text(tmp_path: Path) -> None:
    f = tmp_path / "agreement_2024.pdf"
    f.write_bytes(b"%PDF")
    c = classify(ClassifierInput(
        path=f,
        extracted_text="This NDA (Non-Disclosure Agreement) between parties...",
    ))
    assert c.category == "contract"


def test_identity_sensitive(tmp_path: Path) -> None:
    f = tmp_path / "passaporto_scansione.pdf"
    f.write_bytes(b"%PDF")
    c = classify(ClassifierInput(path=f))
    assert c.category == "identity"


def test_temp(tmp_path: Path) -> None:
    f = tmp_path / "something.crdownload"
    f.write_bytes(b"x")
    c = classify(ClassifierInput(path=f))
    assert c.category == "temporary"


def test_unknown(tmp_path: Path) -> None:
    f = tmp_path / "mystery.xyz"
    f.write_bytes(b"x")
    c = classify(ClassifierInput(path=f))
    assert c.category == "unknown"
