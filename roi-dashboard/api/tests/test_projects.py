from __future__ import annotations

from devin_roi_api.config import RoiConfig, key_mode
from devin_roi_api.projects import (
    MAX_ESTIMATED_HOURS_PER_SESSION,
    _estimate_acu_for_session,
    _is_running,
    _parse_ts,
    _project_tags,
    _session_summary,
)


def test_is_running_excludes_archived():
    assert _is_running("running", "working", False) is True
    assert _is_running("running", "working", True) is False
    assert _is_running("running", "finished", False) is False
    assert _is_running("running", "waiting_for_user", False) is False
    assert _is_running("exit", None, False) is False
    assert _is_running("blocked", None, False) is True
    assert _is_running("working", None, False) is True
    assert _is_running(None, None, False) is False


def test_project_tags_with_prefix():
    assert _project_tags(["project:alpha", "project:beta", "other"], "project:") == [
        "alpha",
        "beta",
    ]
    assert _project_tags(["project:alpha"], None) == ["project:alpha"]
    assert _project_tags([], "project:") == []


def test_project_tags_skips_system_tags_without_prefix():
    # Devin's auto-added tags shouldn't become projects when no prefix is set.
    assert _project_tags(
        ["agent:devin-rs", "agent-preview:devin-opus-4-7", "feature-x"],
        None,
    ) == ["feature-x"]
    # Empty result when every tag is a system tag.
    assert _project_tags(["agent:devin-rs"], None) == []
    # With an explicit prefix, system tags are still filtered by prefix match.
    assert _project_tags(
        ["agent:devin-rs", "project:alpha"], "project:"
    ) == ["alpha"]


def test_session_summary_v3():
    raw = {
        "session_id": "devin-xyz",
        "title": "Do a thing",
        "status": "RUNNING",
        "status_detail": "working",
        "tags": ["project:alpha"],
        "acus_consumed": 12.5,
        "created_at": 10,
        "updated_at": 42,
        "url": "https://app.devin.ai/sessions/xyz",
        "is_archived": False,
    }
    s = _session_summary(raw)
    assert s["session_id"] == "devin-xyz"
    assert s["status"] == "running"
    assert s["is_running"] is True
    assert s["acu"] == 12.5
    assert s["tags"] == ["project:alpha"]


def test_session_summary_v1_no_acu_fills_url():
    # v1 payloads have no acus_consumed and no url; acu should be None and url synthesised.
    raw = {
        "session_id": "devin-abc123",
        "status": "running",
        "status_enum": "working",
        "tags": ["project:alpha"],
    }
    s = _session_summary(raw)
    assert s["acu"] is None
    assert s["is_running"] is True
    assert s["url"] == "https://app.devin.ai/sessions/abc123"


def test_session_summary_exit_not_running():
    s = _session_summary({"session_id": "s", "status": "exit"})
    assert s["acu"] is None
    assert s["is_running"] is False


def test_roi_config_defaults():
    cfg = RoiConfig()
    assert cfg.acu_rate_usd == 2.25
    assert cfg.cursor_multiplier == 0.5


def test_key_mode_detects_service_user_prefix():
    assert key_mode("cog_abc") == "v3"
    assert key_mode("cog_") == "v3"
    assert key_mode("apk_user_xyz") == "v1"
    assert key_mode("") == "v1"
    assert key_mode("random-thing") == "v1"


def test_parse_ts_iso_and_epoch():
    t = _parse_ts("2026-04-20T07:39:28Z")
    assert t is not None and abs(t - 1776670768.0) < 1.0
    assert _parse_ts(1776670768.0) == 1776670768.0
    assert _parse_ts(1776670768000) == 1776670768.0
    assert _parse_ts(None) is None
    assert _parse_ts("not-a-date") is None


def test_estimate_acu_uses_duration_and_rate():
    cfg = RoiConfig(estimated_acus_per_hour=4.0)
    # 2h finished session → 8 ACU
    summary = {
        "created_at": "2026-04-20T07:00:00Z",
        "updated_at": "2026-04-20T09:00:00Z",
        "is_running": False,
    }
    assert abs(_estimate_acu_for_session(summary, cfg) - 8.0) < 0.01


def test_estimate_acu_caps_long_sessions():
    cfg = RoiConfig(estimated_acus_per_hour=4.0)
    # 48h span → should cap at MAX_ESTIMATED_HOURS_PER_SESSION
    summary = {
        "created_at": "2026-04-18T07:00:00Z",
        "updated_at": "2026-04-20T07:00:00Z",
        "is_running": False,
    }
    expected = MAX_ESTIMATED_HOURS_PER_SESSION * 4.0
    assert _estimate_acu_for_session(summary, cfg) == expected


def test_estimate_acu_zero_when_no_created_at():
    cfg = RoiConfig(estimated_acus_per_hour=4.0)
    assert _estimate_acu_for_session({"is_running": False}, cfg) == 0.0
