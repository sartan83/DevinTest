from __future__ import annotations

import pytest
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


@pytest.mark.asyncio
async def test_pause_rejects_v1_keys_with_501():
    """v1 (personal) keys must not attempt a v3 archive call — surface 501 instead."""
    from devin_roi_api.projects import pause_project

    class _UnreachableClient:
        async def get(self, *a, **kw):  # pragma: no cover
            raise AssertionError("no HTTP call should be made in v1 pause path")

        async def post(self, *a, **kw):  # pragma: no cover
            raise AssertionError("no HTTP call should be made in v1 pause path")

    from fastapi import HTTPException

    with pytest.raises(HTTPException) as exc:
        await pause_project(_UnreachableClient(), "apk_user_fake", "alpha", None)
    assert exc.value.status_code == 501
    assert "Pause" in str(exc.value.detail)
