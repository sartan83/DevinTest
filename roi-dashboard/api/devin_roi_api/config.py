from __future__ import annotations

import base64  # noqa: I001
import json
import os
from dataclasses import dataclass, field

DEVIN_API_BASE = os.environ.get("DEVIN_API_BASE", "https://api.devin.ai").rstrip("/")


def key_mode(api_key: str) -> str:
    """Return "v3" for service-user keys (cog_* prefix) and "v1" for legacy personal keys.

    v3 keys unlock the Organization API (ACU/cost, archive/pause). v1 keys only expose
    session metadata (status, tags, timestamps) with no cost data and no pause endpoint.
    """
    k = (api_key or "").strip()
    return "v3" if k.startswith("cog_") else "v1"


@dataclass(frozen=True)
class RoiConfig:
    acu_rate_usd: float = 2.25
    hourly_rate_usd: float = 75.0
    hours_per_acu_vanilla: float = 0.75
    cursor_multiplier: float = 0.5
    copilot_multiplier: float = 0.7
    tag_prefix: str | None = None

    @classmethod
    def from_header(cls, header_value: str | None) -> RoiConfig:
        if not header_value:
            return cls()
        try:
            raw = base64.b64decode(header_value).decode("utf-8")
            data = json.loads(raw)
            if not isinstance(data, dict):
                return cls()
            kwargs = {}
            for f in ("acu_rate_usd", "hourly_rate_usd", "hours_per_acu_vanilla",
                      "cursor_multiplier", "copilot_multiplier"):
                if f in data and data[f] is not None:
                    try:
                        kwargs[f] = float(data[f])
                    except (TypeError, ValueError):
                        pass
            tag_prefix = data.get("tag_prefix")
            if isinstance(tag_prefix, str) and tag_prefix.strip():
                kwargs["tag_prefix"] = tag_prefix
            return cls(**kwargs)
        except Exception:
            return cls()


@dataclass
class OrgCache:
    """In-memory cache of API-key -> org_id. Cleared on process restart."""

    _by_key: dict[str, str] = field(default_factory=dict)

    def get(self, api_key: str) -> str | None:
        return self._by_key.get(api_key)

    def set(self, api_key: str, org_id: str) -> None:
        self._by_key[api_key] = org_id

    def clear(self, api_key: str) -> None:
        self._by_key.pop(api_key, None)


org_cache = OrgCache()
