"""Runtime configuration for the fileagent sidecar.

Loads settings from environment variables with sensible defaults. All paths are
kept inside the user's application-data directory so the service is portable.
"""

from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


def _default_data_dir() -> Path:
    # Respect APPDATA on Windows, fall back to XDG / home on other platforms.
    appdata = os.environ.get("APPDATA")
    if appdata:
        return Path(appdata) / "FileAgent"
    xdg = os.environ.get("XDG_DATA_HOME")
    if xdg:
        return Path(xdg) / "fileagent"
    return Path.home() / ".fileagent"


@dataclass(frozen=True)
class Settings:
    data_dir: Path
    db_path: Path
    quarantine_dirname: str = ".fileagent_quarantine"
    host: str = "127.0.0.1"
    port: int = 53117
    api_token: str = ""
    log_level: str = "INFO"
    default_min_confidence: float = 0.85
    default_archive_days: int = 180
    ai_provider: str = "null"  # 'null' | 'openai'
    ai_api_key: str = ""
    ai_model: str = "gpt-4o-mini"


def load_settings(data_dir: Path | None = None) -> Settings:
    base = Path(data_dir) if data_dir else Path(os.environ.get("FILEAGENT_DATA_DIR", _default_data_dir()))
    base.mkdir(parents=True, exist_ok=True)
    db_path = Path(os.environ.get("FILEAGENT_DB_PATH", base / "agent.db"))
    return Settings(
        data_dir=base,
        db_path=db_path,
        host=os.environ.get("FILEAGENT_HOST", "127.0.0.1"),
        port=int(os.environ.get("FILEAGENT_PORT", "53117")),
        api_token=os.environ.get("FILEAGENT_API_TOKEN", ""),
        log_level=os.environ.get("FILEAGENT_LOG_LEVEL", "INFO"),
        default_min_confidence=float(os.environ.get("FILEAGENT_MIN_CONFIDENCE", "0.85")),
        default_archive_days=int(os.environ.get("FILEAGENT_ARCHIVE_DAYS", "180")),
        ai_provider=os.environ.get("FILEAGENT_AI_PROVIDER", "null"),
        ai_api_key=os.environ.get("FILEAGENT_AI_API_KEY", ""),
        ai_model=os.environ.get("FILEAGENT_AI_MODEL", "gpt-4o-mini"),
    )
