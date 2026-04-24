"""FastAPI app exposed on 127.0.0.1 to the Electron frontend.

Bearer-token protected if ``FILEAGENT_API_TOKEN`` is set; unauthenticated on
loopback otherwise (MVP convenience — the shipped Electron app always sets one).
"""

from __future__ import annotations

import sqlite3
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from . import audit, rollback, scanner
from .config import Settings, load_settings
from .db import init_db
from .executor import apply as executor_apply
from .executor import approve as executor_approve
from .executor import reject as executor_reject
from .models import ApplyRequest, PlanRequest, RollbackRequest, ScanRequest
from .planner import build_plan, summarize_plan
from .seed import seed_all

_settings: Settings | None = None


def get_settings() -> Settings:
    global _settings
    if _settings is None:
        _settings = load_settings()
    return _settings


def get_conn() -> sqlite3.Connection:
    s = get_settings()
    return init_db(s.db_path)


async def _auth(authorization: str | None = Header(default=None)) -> None:
    s = get_settings()
    if not s.api_token:
        return
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="missing token")
    if authorization.removeprefix("Bearer ").strip() != s.api_token:
        raise HTTPException(status_code=401, detail="invalid token")


def create_app(settings: Settings | None = None) -> FastAPI:
    global _settings
    if settings is not None:
        _settings = settings

    @asynccontextmanager
    async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
        conn = get_conn()
        try:
            seed_all(conn, detect_folders=True)
        finally:
            conn.close()
        yield

    app = FastAPI(title="fileagent", version="0.1.0", lifespan=lifespan)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "app://-", "*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health")
    def health() -> dict[str, Any]:
        return {"ok": True, "version": "0.1.0"}

    # -------- folders --------
    @app.get("/api/folders", dependencies=[Depends(_auth)])
    def list_folders() -> list[dict]:
        conn = get_conn()
        try:
            rows = conn.execute(
                "SELECT id, path, role, enabled, created_at FROM watched_folders ORDER BY id"
            ).fetchall()
            return [dict(r) for r in rows]
        finally:
            conn.close()

    @app.post("/api/folders", dependencies=[Depends(_auth)])
    def add_folder(payload: dict) -> dict:
        path = str(payload.get("path", ""))
        role = str(payload.get("role", "user"))
        if not path or not Path(path).exists():
            raise HTTPException(status_code=400, detail="path missing or does not exist")
        conn = get_conn()
        try:
            cur = conn.execute(
                "INSERT OR IGNORE INTO watched_folders(path, role, enabled) VALUES (?, ?, 1) RETURNING id, role",
                (path, role),
            )
            row = cur.fetchone()
            conn.commit()
            if row is None:
                # Path already registered — return the role actually stored in the DB,
                # not the (possibly different) role from the request payload.
                row = conn.execute(
                    "SELECT id, role FROM watched_folders WHERE path = ?", (path,)
                ).fetchone()
            return {"id": int(row["id"]), "path": path, "role": row["role"]}
        finally:
            conn.close()

    @app.delete("/api/folders/{folder_id}", dependencies=[Depends(_auth)])
    def remove_folder(folder_id: int) -> dict:
        conn = get_conn()
        try:
            conn.execute("DELETE FROM watched_folders WHERE id = ?", (folder_id,))
            conn.commit()
            return {"ok": True}
        finally:
            conn.close()

    # -------- scan --------
    @app.post("/api/scan", dependencies=[Depends(_auth)])
    def scan(req: ScanRequest) -> dict:
        conn = get_conn()
        try:
            counts = scanner.scan_all(conn, req.folder_ids, compute_hashes=req.compute_hashes)
            return {"scanned": counts, "total_files": sum(counts.values())}
        finally:
            conn.close()

    # -------- rules --------
    @app.get("/api/rules", dependencies=[Depends(_auth)])
    def list_rules() -> list[dict]:
        conn = get_conn()
        try:
            rows = conn.execute(
                "SELECT id, key, name, description, enabled, risk, mode, min_confidence, priority "
                "FROM organization_rules ORDER BY priority"
            ).fetchall()
            return [dict(r) for r in rows]
        finally:
            conn.close()

    @app.patch("/api/rules/{rule_id}", dependencies=[Depends(_auth)])
    def update_rule(rule_id: int, payload: dict) -> dict:
        allowed = {"enabled", "mode", "min_confidence"}
        sets = []
        params: list[Any] = []
        for k, v in payload.items():
            if k in allowed:
                if k == "enabled":
                    v = 1 if v else 0
                sets.append(f"{k} = ?")
                params.append(v)
        if not sets:
            raise HTTPException(status_code=400, detail="nothing to update")
        params.append(rule_id)
        conn = get_conn()
        try:
            conn.execute(f"UPDATE organization_rules SET {', '.join(sets)} WHERE id = ?", params)
            conn.commit()
            return {"ok": True}
        finally:
            conn.close()

    # -------- plan --------
    @app.post("/api/plan", dependencies=[Depends(_auth)])
    def create_plan(req: PlanRequest) -> dict:
        conn = get_conn()
        try:
            plan_id, ids = build_plan(
                conn,
                folder_ids=req.folder_ids,
                rule_keys=req.rule_keys,
                extract_content=False,
            )
            summary = summarize_plan(conn, plan_id)
            return {"plan_id": plan_id, "proposal_ids": ids, "summary": summary.model_dump()}
        finally:
            conn.close()

    @app.get("/api/plan/{plan_id}", dependencies=[Depends(_auth)])
    def get_plan(plan_id: str) -> dict:
        conn = get_conn()
        try:
            rows = conn.execute(
                """
                SELECT pa.id, pa.file_id, pa.op_type, pa.before_path, pa.after_path,
                       pa.reason, pa.confidence, pa.requires_approval, pa.status,
                       r.key AS rule_key, r.name AS rule_name, r.risk AS rule_risk
                FROM proposed_actions pa
                LEFT JOIN organization_rules r ON r.id = pa.rule_id
                WHERE pa.plan_id = ?
                ORDER BY pa.id
                """,
                (plan_id,),
            ).fetchall()
            summary = summarize_plan(conn, plan_id)
            return {"summary": summary.model_dump(), "actions": [dict(r) for r in rows]}
        finally:
            conn.close()

    @app.post("/api/plan/{plan_id}/approve", dependencies=[Depends(_auth)])
    def approve_actions(plan_id: str, payload: dict) -> dict:  # noqa: ARG001
        conn = get_conn()
        try:
            return {"updated": executor_approve(conn, payload.get("action_ids", []))}
        finally:
            conn.close()

    @app.post("/api/plan/{plan_id}/reject", dependencies=[Depends(_auth)])
    def reject_actions(plan_id: str, payload: dict) -> dict:  # noqa: ARG001
        conn = get_conn()
        try:
            return {"updated": executor_reject(conn, payload.get("action_ids", []))}
        finally:
            conn.close()

    # -------- apply --------
    @app.post("/api/apply", dependencies=[Depends(_auth)])
    def apply_plan(req: ApplyRequest) -> dict:
        conn = get_conn()
        try:
            batch_id, executed = executor_apply(conn, req)
            return {"batch_id": batch_id, "executed": [e.model_dump() for e in executed]}
        finally:
            conn.close()

    # -------- rollback --------
    @app.get("/api/batches", dependencies=[Depends(_auth)])
    def batches() -> list[dict]:
        conn = get_conn()
        try:
            return rollback.list_batches(conn)
        finally:
            conn.close()

    @app.post("/api/rollback", dependencies=[Depends(_auth)])
    def do_rollback(req: RollbackRequest) -> dict:
        conn = get_conn()
        try:
            return {"results": rollback.rollback(conn, req)}
        finally:
            conn.close()

    # -------- audit --------
    @app.get("/api/activity", dependencies=[Depends(_auth)])
    def activity(limit: int = 200) -> dict:
        conn = get_conn()
        try:
            return {
                "executed": audit.list_executed(conn, limit=limit),
                "rollback": audit.list_rollback(conn, limit=limit),
            }
        finally:
            conn.close()

    # -------- settings --------
    @app.get("/api/settings", dependencies=[Depends(_auth)])
    def get_app_settings() -> dict:
        conn = get_conn()
        try:
            rows = conn.execute("SELECT key, value FROM app_settings").fetchall()
            return {r["key"]: r["value"] for r in rows}
        finally:
            conn.close()

    @app.patch("/api/settings", dependencies=[Depends(_auth)])
    def update_app_settings(payload: dict) -> dict:
        conn = get_conn()
        try:
            for k, v in payload.items():
                conn.execute(
                    "INSERT INTO app_settings(key, value) VALUES (?, ?) "
                    "ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')",
                    (k, str(v)),
                )
            conn.commit()
            return {"ok": True}
        finally:
            conn.close()

    return app


# Convenience: module-level ASGI app for ``uvicorn fileagent.api:app``.
app = create_app()
