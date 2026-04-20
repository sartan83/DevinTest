from __future__ import annotations

import asyncio
import time
from collections import defaultdict
from datetime import UTC, datetime
from typing import Any

import httpx
from fastapi import HTTPException

from .config import RoiConfig, key_mode
from .devin_client import archive_session, list_sessions, resolve_org_id
from .devin_client_v1 import list_sessions_v1

# Cap per-session duration used in v1 estimation so long-idle sessions don't dominate.
MAX_ESTIMATED_HOURS_PER_SESSION = 12.0

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


# Tags Devin auto-adds to every session. When the user hasn't set a tag_prefix
# we skip these so they don't show up as bogus "projects" that double-count
# every session.
SYSTEM_TAG_PREFIXES: tuple[str, ...] = ("agent:", "agent-preview:")

# Synthetic bucket name for sessions that, after filtering out system tags
# (and applying any tag_prefix), don't match any user-defined project.
UNTAGGED_BUCKET = "(untagged)"


def _project_tags(session_tags: list[str], prefix: str | None) -> list[str]:
    if not session_tags:
        return []
    if prefix:
        return [t[len(prefix):] for t in session_tags if t.startswith(prefix)]
    return [
        t for t in session_tags
        if not any(t.startswith(sp) for sp in SYSTEM_TAG_PREFIXES)
    ]


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


def _parse_ts(value: Any) -> float | None:
    """Parse an ISO-8601 string or numeric epoch (s or ms) into epoch seconds."""
    if value is None:
        return None
    if isinstance(value, (int, float)):
        v = float(value)
        return v / 1000.0 if v > 1e12 else v
    if isinstance(value, str):
        s = value.strip()
        if not s:
            return None
        if s.endswith("Z"):
            s = s[:-1] + "+00:00"
        try:
            dt = datetime.fromisoformat(s)
        except ValueError:
            return None
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=UTC)
        return dt.timestamp()
    return None


def _estimate_acu_for_session(summary: dict[str, Any], cfg: RoiConfig) -> float:
    """Estimate ACU for a v1 session using duration × estimated_acus_per_hour.

    For running sessions we use now as the end time; otherwise we use updated_at.
    Duration is capped by MAX_ESTIMATED_HOURS_PER_SESSION so a long-idle session
    doesn't distort the ROI numbers.
    """
    start = _parse_ts(summary.get("created_at"))
    if start is None:
        return 0.0
    if summary.get("is_running"):
        end = time.time()
    else:
        end = _parse_ts(summary.get("updated_at")) or start
    hours = max(0.0, (end - start) / 3600.0)
    hours = min(hours, MAX_ESTIMATED_HOURS_PER_SESSION)
    rate = max(0.0, float(cfg.estimated_acus_per_hour))
    return hours * rate


async def build_projects_response(
    client: httpx.AsyncClient, api_key: str, cfg: RoiConfig
) -> dict[str, Any]:
    mode = key_mode(api_key)
    raw_sessions = await _raw_sessions(client, api_key)
    summaries = [_session_summary(s) for s in raw_sessions]
    estimated = mode == "v1"

    # v1 keys don't expose real ACU usage — estimate per-session from wall-clock duration.
    if estimated:
        for s in summaries:
            s["acu"] = _estimate_acu_for_session(s, cfg)
    cost_available = True

    buckets: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for s in summaries:
        tags = _project_tags(s["tags"], cfg.tag_prefix)
        if not tags:
            buckets[UNTAGGED_BUCKET].append(s)
        else:
            for tag in tags:
                buckets[tag].append(s)

    projects: list[dict[str, Any]] = []
    for tag, sessions in buckets.items():
        acu_values = [s["acu"] for s in sessions if s["acu"] is not None]
        total_acu: float = sum(acu_values) if acu_values else 0.0
        devin_cost = total_acu * cfg.acu_rate_usd
        baselines = _baselines(total_acu, cfg)
        roi = _roi(devin_cost, baselines)
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

    # Totals must come from unique sessions (a session with multiple tags
    # appears in multiple buckets — summing per-bucket totals would double-count).
    unique_sessions: dict[str, dict[str, Any]] = {
        s["session_id"]: s for s in summaries
    }
    totals_acu = sum(
        (s["acu"] or 0.0) for s in unique_sessions.values()
    )
    devin_cost_total = totals_acu * cfg.acu_rate_usd
    totals_baselines = _baselines(totals_acu, cfg)
    totals = {
        "projects": len(projects),
        "sessions": len(unique_sessions),
        "running": sum(1 for s in unique_sessions.values() if s["is_running"]),
        "acu": totals_acu,
        "devin_cost_usd": devin_cost_total,
        "vanilla_usd": totals_baselines["vanilla_usd"],
        "cursor_usd": totals_baselines["cursor_usd"],
        "copilot_usd": totals_baselines["copilot_usd"],
    }

    return {
        "mode": mode,
        "cost_available": cost_available,
        "pause_available": mode == "v3",
        "estimated": estimated,
        "estimated_acus_per_hour": cfg.estimated_acus_per_hour if estimated else None,
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
