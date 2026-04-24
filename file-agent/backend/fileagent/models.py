"""Pydantic models for API + internal transport."""

from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

Category = Literal[
    "pdf", "office", "spreadsheet", "presentation", "image", "screenshot",
    "video", "audio", "installer", "archive", "code", "invoice", "contract",
    "identity", "manual", "resume", "temporary", "duplicate", "unknown",
]

RuleRisk = Literal["safe", "review", "sensitive"]
RuleMode = Literal["off", "preview", "approval", "auto"]
OpType = Literal["move", "rename", "quarantine", "create_folder", "archive"]
ProposedStatus = Literal["pending", "approved", "rejected", "executed", "skipped"]


class WatchedFolder(BaseModel):
    id: int | None = None
    path: str
    role: str = "user"
    enabled: bool = True


class FileRecord(BaseModel):
    id: int | None = None
    path: str
    folder_id: int | None = None
    name: str
    extension: str | None = None
    size_bytes: int
    created_at: datetime | None = None
    modified_at: datetime | None = None
    sha256: str | None = None


class Classification(BaseModel):
    file_id: int
    category: Category
    topic: str | None = None
    confidence: float = 0.0
    source: Literal["rules", "ai", "hybrid"] = "rules"


class OrganizationRule(BaseModel):
    id: int | None = None
    key: str
    name: str
    description: str = ""
    enabled: bool = True
    risk: RuleRisk = "safe"
    mode: RuleMode = "preview"
    min_confidence: float = 0.85
    config_json: str = "{}"
    priority: int = 100


class ProposedAction(BaseModel):
    id: int | None = None
    plan_id: str
    file_id: int
    rule_id: int | None = None
    op_type: OpType
    before_path: str
    after_path: str
    reason: str = ""
    confidence: float = 0.0
    requires_approval: bool = True
    status: ProposedStatus = "pending"


class ExecutedAction(BaseModel):
    id: int | None = None
    batch_id: str
    proposed_id: int | None = None
    rule_id: int | None = None
    op_type: OpType
    before_path: str
    after_path: str
    success: bool
    error_message: str | None = None
    reversible: bool = True
    rollback_token: str | None = None
    executed_at: datetime | None = None


class PlanSummary(BaseModel):
    plan_id: str
    total_actions: int
    auto_eligible: int
    requires_approval: int
    counts_by_rule: dict[str, int] = Field(default_factory=dict)


class ScanRequest(BaseModel):
    folder_ids: list[int] | None = None
    compute_hashes: bool = False
    extract_text: bool = False


class PlanRequest(BaseModel):
    folder_ids: list[int] | None = None
    rule_keys: list[str] | None = None


class ApplyRequest(BaseModel):
    plan_id: str
    action_ids: list[int] | None = None  # None => apply all approved
    mode: Literal["manual", "semi_auto", "auto"] = "manual"


class RollbackRequest(BaseModel):
    batch_id: str | None = None
    executed_ids: list[int] | None = None
