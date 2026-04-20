from __future__ import annotations

from devin_roi_api.config import RoiConfig
from devin_roi_api.projects import _is_running, _project_tags, _session_summary


def test_is_running_excludes_archived():
    assert _is_running("running", "working", False) is True
    assert _is_running("running", "working", True) is False
    assert _is_running("running", "finished", False) is False
    assert _is_running("running", "waiting_for_user", False) is False
    assert _is_running("exit", None, False) is False
    assert _is_running("blocked", None, False) is True
    assert _is_running(None, None, False) is False


def test_project_tags_with_prefix():
    assert _project_tags(["project:alpha", "project:beta", "other"], "project:") == [
        "alpha",
        "beta",
    ]
    assert _project_tags(["project:alpha"], None) == ["project:alpha"]
    assert _project_tags([], "project:") == []


def test_session_summary_defaults():
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


def test_session_summary_handles_missing_acu():
    s = _session_summary({"session_id": "s", "status": "exit"})
    assert s["acu"] == 0.0
    assert s["is_running"] is False


def test_roi_config_defaults():
    cfg = RoiConfig()
    assert cfg.acu_rate_usd == 2.25
    assert cfg.cursor_multiplier == 0.5
