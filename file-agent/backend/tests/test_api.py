from __future__ import annotations

import os
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from fileagent.api import create_app
from fileagent.config import load_settings


@pytest.fixture
def client(tmp_path: Path, monkeypatch):
    monkeypatch.setenv("FILEAGENT_DATA_DIR", str(tmp_path / "data"))
    monkeypatch.setenv("FILEAGENT_DB_PATH", str(tmp_path / "data" / "agent.db"))
    monkeypatch.setenv("FILEAGENT_API_TOKEN", "")
    # Reset cached singleton
    import fileagent.api as api_mod
    api_mod._settings = None
    app = create_app(load_settings())
    with TestClient(app) as c:
        yield c


def test_health(client) -> None:
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["ok"] is True


def test_add_and_list_folder(client, tmp_path: Path) -> None:
    folder = tmp_path / "Downloads"
    folder.mkdir()
    r = client.post("/api/folders", json={"path": str(folder), "role": "downloads"})
    assert r.status_code == 200
    folders = client.get("/api/folders").json()
    assert any(f["path"] == str(folder) for f in folders)


def test_rules_seeded(client) -> None:
    rules = client.get("/api/rules").json()
    keys = {r["key"] for r in rules}
    assert "downloads_installers" in keys
    assert "screenshots_by_month" in keys
    assert "finance_invoices" in keys


def test_plan_and_apply_via_api(client, tmp_path: Path) -> None:
    downloads = tmp_path / "Downloads"
    downloads.mkdir()
    (downloads / "setup.exe").write_bytes(b"MZ")
    client.post("/api/folders", json={"path": str(downloads), "role": "downloads"})
    client.post("/api/scan", json={"compute_hashes": False})
    plan = client.post("/api/plan", json={}).json()
    plan_id = plan["plan_id"]
    actions = client.get(f"/api/plan/{plan_id}").json()["actions"]
    action_ids = [a["id"] for a in actions]
    client.post(f"/api/plan/{plan_id}/approve", json={"action_ids": action_ids})
    r = client.post("/api/apply", json={"plan_id": plan_id, "mode": "manual"})
    body = r.json()
    assert r.status_code == 200
    assert body["batch_id"]
    assert any(e["success"] for e in body["executed"])
