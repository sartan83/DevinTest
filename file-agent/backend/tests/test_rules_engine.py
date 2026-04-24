from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from fileagent.classifier import ClassifierInput, classify
from fileagent.models import OrganizationRule
from fileagent.rules_engine import RuleContext, apply_rules, DEFAULT_RULES


def _rules() -> list[OrganizationRule]:
    return [
        OrganizationRule(
            id=i + 1, key=r["key"], name=r["name"], description=r["description"],
            enabled=True, risk=r["risk"], mode=r["mode"],
            min_confidence=r["min_confidence"], priority=r["priority"],
        )
        for i, r in enumerate(DEFAULT_RULES)
    ]


def test_installer_routed_to_installers_dir(tmp_roots: dict[str, Path]) -> None:
    downloads = tmp_roots["downloads"]
    f = downloads / "setup.exe"
    f.write_bytes(b"MZ")
    clf = classify(ClassifierInput(path=f))
    ctx = RuleContext(now=datetime.now(timezone.utc), roots={k: str(v) for k, v in tmp_roots.items()})
    cands = apply_rules(f, clf, _rules(), ctx)
    assert any(c.rule_key == "downloads_installers" for c in cands)
    c = next(c for c in cands if c.rule_key == "downloads_installers")
    assert "Installers_And_Archives" in c.after_path


def test_screenshot_routed_by_month(tmp_roots: dict[str, Path]) -> None:
    pics = tmp_roots["pictures"]
    f = pics / "Screenshot 2025-01-03 at 10.12.png"
    f.write_bytes(b"\x89PNG")
    clf = classify(ClassifierInput(path=f))
    ctx = RuleContext(roots={k: str(v) for k, v in tmp_roots.items()})
    cands = apply_rules(f, clf, _rules(), ctx)
    c = next(c for c in cands if c.rule_key == "screenshots_by_month")
    assert "Screenshots" in c.after_path


def test_invoice_to_finance(tmp_roots: dict[str, Path]) -> None:
    docs = tmp_roots["documents"]
    f = docs / "fattura_2025_003.pdf"
    f.write_bytes(b"%PDF")
    clf = classify(ClassifierInput(path=f))
    ctx = RuleContext(roots={k: str(v) for k, v in tmp_roots.items()})
    cands = apply_rules(f, clf, _rules(), ctx)
    c = next(c for c in cands if c.rule_key == "finance_invoices")
    assert "Finance" in c.after_path


def test_low_confidence_forces_approval(tmp_roots: dict[str, Path]) -> None:
    downloads = tmp_roots["downloads"]
    # Plain PDF without any invoice keywords → falls to group_by_type with reduced confidence
    f = downloads / "random.pdf"
    f.write_bytes(b"%PDF")
    clf = classify(ClassifierInput(path=f))
    ctx = RuleContext(roots={k: str(v) for k, v in tmp_roots.items()})
    rules = _rules()
    cands = apply_rules(f, clf, rules, ctx)
    for c in cands:
        assert c.requires_approval or c.rule_key == "downloads_installers"


def test_dedup_per_file(tmp_roots: dict[str, Path]) -> None:
    # Both "finance" and "group_by_type" would fire on an invoice in Downloads;
    # dedupe keeps only the highest-confidence candidate per file.
    downloads = tmp_roots["downloads"]
    f = downloads / "invoice-001.pdf"
    f.write_bytes(b"%PDF")
    clf = classify(ClassifierInput(path=f))
    ctx = RuleContext(roots={k: str(v) for k, v in tmp_roots.items()})
    cands = apply_rules(f, clf, _rules(), ctx)
    assert len(cands) == 1
    assert cands[0].rule_key == "finance_invoices"
