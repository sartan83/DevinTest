from __future__ import annotations

import os
from contextlib import asynccontextmanager
from typing import Any

import httpx
from fastapi import FastAPI, Header, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from .config import RoiConfig
from .devin_client import fetch_self
from .projects import build_projects_response, pause_project


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.http = httpx.AsyncClient()
    try:
        yield
    finally:
        await app.state.http.aclose()


app = FastAPI(title="Devin ROI Dashboard API", version="0.1.0", lifespan=lifespan)

_origins_env = os.environ.get("CORS_ORIGINS", "*")
_origins = [o.strip() for o in _origins_env.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


def _require_key(x_devin_api_key: str | None) -> str:
    if not x_devin_api_key or not x_devin_api_key.strip():
        raise HTTPException(status_code=401, detail="Missing x-devin-api-key header.")
    return x_devin_api_key.strip()


@app.get("/api/health")
async def health(
    x_devin_api_key: str | None = Header(default=None),
) -> dict[str, Any]:
    key = _require_key(x_devin_api_key)
    try:
        me = await fetch_self(app.state.http, key)
    except HTTPException:
        raise
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"Cannot reach Devin API: {e}") from e
    return {"ok": True, "devin_api": "reachable", "user": me}


@app.get("/api/projects")
async def projects(
    x_devin_api_key: str | None = Header(default=None),
    x_roi_config: str | None = Header(default=None),
    tag_prefix: str | None = Query(default=None),
) -> dict[str, Any]:
    key = _require_key(x_devin_api_key)
    cfg = RoiConfig.from_header(x_roi_config)
    if tag_prefix is not None:
        cfg = RoiConfig(
            acu_rate_usd=cfg.acu_rate_usd,
            hourly_rate_usd=cfg.hourly_rate_usd,
            hours_per_acu_vanilla=cfg.hours_per_acu_vanilla,
            cursor_multiplier=cfg.cursor_multiplier,
            copilot_multiplier=cfg.copilot_multiplier,
            tag_prefix=tag_prefix or None,
        )
    try:
        return await build_projects_response(app.state.http, key, cfg)
    except HTTPException:
        raise
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"Devin API unreachable: {e}") from e


@app.post("/api/projects/{tag}/pause")
async def pause(
    tag: str,
    x_devin_api_key: str | None = Header(default=None),
    x_roi_config: str | None = Header(default=None),
) -> dict[str, Any]:
    key = _require_key(x_devin_api_key)
    cfg = RoiConfig.from_header(x_roi_config)
    try:
        return await pause_project(app.state.http, key, tag, cfg.tag_prefix)
    except HTTPException:
        raise
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"Devin API unreachable: {e}") from e


@app.get("/")
async def root() -> dict[str, str]:
    return {"service": "devin-roi-api", "status": "ok"}
