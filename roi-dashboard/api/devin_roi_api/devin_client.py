from __future__ import annotations

from typing import Any

import httpx
from fastapi import HTTPException

from .config import DEVIN_API_BASE, org_cache

TIMEOUT = httpx.Timeout(20.0, connect=10.0)


def _auth(api_key: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {api_key}", "accept": "application/json"}


async def _raise_for_status(resp: httpx.Response, context: str) -> None:
    if resp.is_success:
        return
    detail: Any
    try:
        detail = resp.json()
    except Exception:
        detail = resp.text[:500]
    raise HTTPException(
        status_code=resp.status_code,
        detail=f"Devin API error ({context}): {detail}",
    )


async def fetch_self(client: httpx.AsyncClient, api_key: str) -> dict[str, Any]:
    """Return SelfResponse. Tries v3beta1 enterprise self first, falls back to v1 /v1/session?."""
    url = f"{DEVIN_API_BASE}/v3beta1/enterprise/self"
    resp = await client.get(url, headers=_auth(api_key), timeout=TIMEOUT)
    if resp.status_code in (401, 403):
        raise HTTPException(
            status_code=401,
            detail="Devin API key rejected. Double-check the key and that it has "
            "ReadAccountMeta permission.",
        )
    await _raise_for_status(resp, "self")
    return resp.json()


async def resolve_org_id(client: httpx.AsyncClient, api_key: str) -> str:
    cached = org_cache.get(api_key)
    if cached:
        return cached
    me = await fetch_self(client, api_key)
    org_id = me.get("org_id")
    if not org_id:
        raise HTTPException(
            status_code=400,
            detail="Could not resolve org_id from API key. Is this a service-user key?",
        )
    org_cache.set(api_key, org_id)
    return org_id


async def list_sessions(
    client: httpx.AsyncClient, api_key: str, org_id: str, *, max_pages: int = 5
) -> list[dict[str, Any]]:
    """List sessions for an org, following cursor pagination up to max_pages."""
    items: list[dict[str, Any]] = []
    cursor: str | None = None
    for _ in range(max_pages):
        params: dict[str, Any] = {"first": 100}
        if cursor:
            params["after"] = cursor
        url = f"{DEVIN_API_BASE}/v3/organizations/{org_id}/sessions"
        resp = await client.get(url, headers=_auth(api_key), params=params, timeout=TIMEOUT)
        await _raise_for_status(resp, "list_sessions")
        data = resp.json()
        batch = data.get("items") or []
        items.extend(batch)
        if not data.get("has_next_page"):
            break
        cursor = data.get("end_cursor")
        if not cursor:
            break
    return items


async def archive_session(
    client: httpx.AsyncClient, api_key: str, org_id: str, session_id: str
) -> dict[str, Any]:
    url = f"{DEVIN_API_BASE}/v3/organizations/{org_id}/sessions/{session_id}/archive"
    resp = await client.post(url, headers=_auth(api_key), timeout=TIMEOUT)
    await _raise_for_status(resp, f"archive {session_id}")
    return resp.json()
