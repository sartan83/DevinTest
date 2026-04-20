from __future__ import annotations

import asyncio
import time
from collections import defaultdict
from typing import Any

import httpx
from fastapi import HTTPException

from .config import RoiConfig, key_mode
from .devin_client import archive_session, list_sessions, resolve_org_id
from .devin_client_v1 import list_sessions_v1

RUNNING_STATUSES = {"running", "blocked", "new", "working"}
RUNNING_DETAILS_NOT_ACTIVE = {
    "finished",
    "waiting_for_user",
    "waiting_for_approval",
    "suspended",
}


def _is_running(status: str | None, status_detail: str | None, is_archived: bool) -> bool:
    if is_archived:
        return False
    if not status:
        return False
    if status.lower() not in RUNNING_STATUSES:
        return False
    if status_detail and status_detail.lower() in RUNNING_DETAILS_NOT_ACTIVE:
        return False
    return True


def _session_summary(raw: dict[str, Any]) -> dict[str, Any]:
    status = (raw.get("status") or raw.get("status_enum") or "").lower() or "unknown"
    status_detail = raw.get("status_detail") or raw.get("status_enum")
    if isinstance(status_detail, str):
        status_detail = status_detail.lower()
    is_archived = bool(raw.get("is_archived"))
    tags = raw.get("tags") or []
    if not isinstance(tags, list):
        tags = []
    acu_raw = raw.get("acus_consumed")
    acu: float | None
    if acu_raw is None:
        acu = None
    else:
        try:
            acu = float(acu_raw)
        except (TypeError, ValueError):
            acu = None
    repo = None
    for key in ("repo", "repository"):
        v = raw.get(key)
        if isinstance(v, str):
            repo = v
            break
    url = raw.get("url")
    if not url and raw.get("session_id"):
        url = f"https://app.devin.ai/sessions/{raw['session_id'].removeprefix('devin-')}"
    return {
        "session_id": raw.get("session_id") or raw.get("devin_id") or "",
        "title": raw.get("title"),
        "status": status,
        "status_detail": status_detail,
        "tags": [str(t) for t in tags],
        "created_at": raw.get("created_at"),
        "updated_at": raw.get("updated_at"),
        "acu": acu,
        "repo": repo,
        "url": url,
        "is_running": _is_running(status, status_detail, is_archived),
    }


def _project_tags(session_tags: list[str], prefix: str | None) -> list[str]:
    if not session_tags:
        return []
    if prefix:
        return [t[len(prefix):] for t in session_tags if t.startswith(prefix)]
    return list(session_tags)


def _baselines(total_acu: float, cfg: RoiConfig) -> dict[str, float]:
    vanilla_hours = total_acu * cfg.hours_per_acu_vanilla
    vanilla = vanilla_hours * cfg.hourly_rate_usd
    cursor = vanilla * cfg.cursor_multiplier
    copilot = vanilla * cfg.copilot_multiplier
    return {"vanilla_usd": vanilla, "cursor_usd": cursor, "copilot_usd": copilot}


def _roi(devin_cost: float, baselines: dict[str, float]) -> dict[str, float]:
    def pct(baseline: float) -> float:
        if devin_cost <= 0:
            return 100.0 if baseline > 0 else 0.0
        return (baseline - devin_cost) / devin_cost * 100.0

    return {
        "vs_vanilla_pct": pct(baselines["vanilla_usd"]),
        "vs_cursor_pct": pct(baselines["cursor_usd"]),
        "vs_copilot_pct": pct(baselines["copilot_usd"]),
    }


async def _raw_sessions(client: httpx.AsyncClient, api_key: str) -> list[dict[str, Any]]:
    if key_mode(api_key) == "v3":
        org_id = await resolve_org_id(client, api_key)
        return await list_sessions(client, api_key, org_id)
    return await list_sessions_v1(client, api_key)


async def build_projects_response(
    client: httpx.AsyncClient, api_key: str, cfg: RoiConfig
) -> dict[str, Any]:
    mode = key_mode(api_key)
    raw_sessions = await _raw_sessions(client, api_key)
    summaries = [_session_summary(s) for s in raw_sessions]
    cost_available = mode == "v3"

    buckets: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for s in summaries:
        for tag in _project_tags(s["tags"], cfg.tag_prefix):
            buckets[tag].append(s)

    projects: list[dict[str, Any]] = []
    for tag, sessions in buckets.items():
        acu_values = [s["acu"] for s in sessions if s["acu"] is not None]
        total_acu: float | None = sum(acu_values) if (cost_available and acu_values) else (
            0.0 if cost_available else None
        )
        devin_cost: float | None
        baselines: dict[str, float] | None
        roi: dict[str, float] | None
        if cost_available and total_acu is not None:
            devin_cost = total_acu * cfg.acu_rate_usd
            baselines = _baselines(total_acu, cfg)
            roi = _roi(devin_cost, baselines)
        else:
            devin_cost = None
            baselines = None
            roi = None
        running = sum(1 for s in sessions if s["is_running"])
        last_activity = max(
            (s["updated_at"] or s["created_at"] or 0 for s in sessions), default=None
        ) or None
        projects.append(
            {
                "tag": tag,
                "session_count": len(sessions),
                "running_count": running,
                "total_acu": total_acu,
                "devin_cost_usd": devin_cost,
                "baselines": baselines,
                "roi": roi,
                "last_activity": last_activity,
                "sessions": sorted(
                    sessions,
                    key=lambda x: (x["updated_at"] or x["created_at"] or 0),
                    reverse=True,
                ),
            }
        )

    projects.sort(
        key=lambda p: (
            -p["running_count"],
            -(p["total_acu"] or 0.0),
            p["tag"].lower(),
        )
    )

    totals_acu: float | None = (
        sum(p["total_acu"] or 0.0 for p in projects) if cost_available else None
    )
    if cost_available:
        devin_cost_total: float | None = (
            totals_acu * cfg.acu_rate_usd if totals_acu is not None else None
        )
        vanilla_total: float | None = sum(
            p["baselines"]["vanilla_usd"] for p in projects if p["baselines"]
        )
        cursor_total: float | None = sum(
            p["baselines"]["cursor_usd"] for p in projects if p["baselines"]
        )
        copilot_total: float | None = sum(
            p["baselines"]["copilot_usd"] for p in projects if p["baselines"]
        )
    else:
        devin_cost_total = vanilla_total = cursor_total = copilot_total = None
    totals = {
        "projects": len(projects),
        "sessions": sum(p["session_count"] for p in projects),
        "running": sum(p["running_count"] for p in projects),
        "acu": totals_acu,
        "devin_cost_usd": devin_cost_total,
        "vanilla_usd": vanilla_total,
        "cursor_usd": cursor_total,
        "copilot_usd": copilot_total,
    }

    return {
        "mode": mode,
        "cost_available": cost_available,
        "pause_available": cost_available,
        "projects": projects,
        "totals": totals,
        "fetched_at": int(time.time()),
    }


async def pause_project(
    client: httpx.AsyncClient, api_key: str, tag: str, tag_prefix: str | None
) -> dict[str, Any]:
    mode = key_mode(api_key)
    if mode != "v3":
        raise HTTPException(
            status_code=501,
            detail=(
                "Pause is unavailable in v1 mode. The legacy /v1 API has no archive/sleep "
                "endpoint. Use a service-user key (prefix cog_) to enable pause."
            ),
        )
    org_id = await resolve_org_id(client, api_key)
    raw_sessions = await list_sessions(client, api_key, org_id)
    matching: list[str] = []
    full_tag_with_prefix = f"{tag_prefix}{tag}" if tag_prefix else tag
    for raw in raw_sessions:
        s = _session_summary(raw)
        if not s["is_running"]:
            continue
        tags = s["tags"]
        if tag_prefix:
            if full_tag_with_prefix in tags:
                matching.append(s["session_id"])
        else:
            if tag in tags:
                matching.append(s["session_id"])
    if not matching:
        return {"paused_session_ids": [], "errors": []}

    results = await asyncio.gather(
        *(archive_session(client, api_key, org_id, sid) for sid in matching),
        return_exceptions=True,
    )
    paused: list[str] = []
    errors: list[dict[str, str]] = []
    for sid, res in zip(matching, results, strict=False):
        if isinstance(res, Exception):
            msg = str(res)
            if isinstance(res, HTTPException):
                msg = f"{res.status_code}: {res.detail}"
            errors.append({"session_id": sid, "error": msg})
        else:
            paused.append(sid)
    return {"paused_session_ids": paused, "errors": errors}
