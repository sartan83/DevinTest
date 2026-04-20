"""Legacy v1 Devin API client.

Used when the caller supplies a personal API key (non-`cog_` prefix). The v1 API
only exposes session metadata (no ACU/cost, no archive/pause). The dashboard falls
back to this surface in read-only mode when a service-user key isn't available.
"""
from __future__ import annotations

from typing import Any

import httpx
from fastapi import HTTPException

from .config import DEVIN_API_BASE

TIMEOUT = httpx.Timeout(20.0, connect=10.0)


def _auth(api_key: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {api_key}", "accept": "application/json"}


async def _raise_for_status(resp: httpx.Response, context: str) -> None:
    if resp.is_success:
        return
    try:
        detail: Any = resp.json()
    except Exception:
        detail = resp.text[:500]
    raise HTTPException(
        status_code=resp.status_code,
        detail=f"Devin API error ({context}): {detail}",
    )


async def verify_key_v1(client: httpx.AsyncClient, api_key: str) -> dict[str, Any]:
    """Verify a v1 key by listing a single session. Returns a minimal identity echo."""
    url = f"{DEVIN_API_BASE}/v1/sessions"
    resp = await client.get(
        url, headers=_auth(api_key), params={"limit": 1}, timeout=TIMEOUT
    )
    if resp.status_code in (401, 403):
        raise HTTPException(status_code=401, detail="Devin API key rejected.")
    await _raise_for_status(resp, "v1 verify")
    data = resp.json()
    sessions = data.get("sessions") or []
    email: str | None = None
    if sessions and isinstance(sessions, list):
        email = sessions[0].get("requesting_user_email")
    return {"email": email, "mode": "v1"}


async def list_sessions_v1(
    client: httpx.AsyncClient, api_key: str, *, page_size: int = 100, max_pages: int = 5
) -> list[dict[str, Any]]:
    """List sessions via legacy v1 API, paginating via limit/offset."""
    items: list[dict[str, Any]] = []
    offset = 0
    for _ in range(max_pages):
        url = f"{DEVIN_API_BASE}/v1/sessions"
        resp = await client.get(
            url,
            headers=_auth(api_key),
            params={"limit": page_size, "offset": offset},
            timeout=TIMEOUT,
        )
        await _raise_for_status(resp, "v1 list_sessions")
        data = resp.json()
        batch = data.get("sessions") or []
        if not isinstance(batch, list) or not batch:
            break
        items.extend(batch)
        if len(batch) < page_size:
            break
        offset += page_size
    return items
