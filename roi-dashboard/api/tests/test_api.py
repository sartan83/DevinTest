from __future__ import annotations

from fastapi.testclient import TestClient

from devin_roi_api.main import app


def test_root_endpoint():
    with TestClient(app) as client:
        r = client.get("/")
        assert r.status_code == 200
        assert r.json()["service"] == "devin-roi-api"


def test_health_requires_api_key():
    with TestClient(app) as client:
        r = client.get("/api/health")
        assert r.status_code == 401


def test_projects_requires_api_key():
    with TestClient(app) as client:
        r = client.get("/api/projects")
        assert r.status_code == 401


def test_pause_requires_api_key():
    with TestClient(app) as client:
        r = client.post("/api/projects/alpha/pause")
        assert r.status_code == 401
