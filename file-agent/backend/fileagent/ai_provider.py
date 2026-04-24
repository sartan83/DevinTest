"""Optional AI provider abstraction.

The MVP ships with a :class:`NullProvider` (default) and a stub
``OpenAIProvider`` sketch. Calls are *never* made without explicit opt-in via
settings. The app works fully without any provider configured.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol


@dataclass
class AIHint:
    topic: str | None
    confidence: float
    reason: str = ""


class AIProvider(Protocol):
    name: str

    def suggest_topic(self, filename: str, text: str) -> AIHint: ...


class NullProvider:
    """No-op provider. Always returns a low-confidence empty hint."""

    name = "null"

    def suggest_topic(self, filename: str, text: str) -> AIHint:  # noqa: ARG002
        return AIHint(topic=None, confidence=0.0, reason="AI disabled")


class OpenAIProvider:
    """Very thin wrapper. Requires ``openai`` at runtime; not installed by default."""

    name = "openai"

    def __init__(self, api_key: str, model: str = "gpt-4o-mini") -> None:
        self.api_key = api_key
        self.model = model

    def suggest_topic(self, filename: str, text: str) -> AIHint:
        if not self.api_key:
            return AIHint(topic=None, confidence=0.0, reason="no api key")
        try:
            from openai import OpenAI  # type: ignore[import-not-found]
        except ImportError:
            return AIHint(topic=None, confidence=0.0, reason="openai sdk not installed")
        client = OpenAI(api_key=self.api_key)
        prompt = (
            "You label personal documents. Given the filename and an excerpt of content, "
            "return one of: invoice, contract, resume, identity, manual, none. "
            "Also return a confidence between 0 and 1. Format: <label>|<confidence>.\n"
            f"Filename: {filename}\n\nExcerpt:\n{text[:2000]}"
        )
        try:
            resp = client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=16,
                temperature=0.0,
            )
            out = (resp.choices[0].message.content or "").strip().lower()
            label, _, conf = out.partition("|")
            label = label.strip()
            try:
                confidence = float(conf.strip() or "0.5")
            except ValueError:
                confidence = 0.5
            if label in {"invoice", "contract", "resume", "identity", "manual"}:
                return AIHint(topic=label, confidence=max(0.0, min(1.0, confidence)), reason="openai")
            return AIHint(topic=None, confidence=0.0, reason=f"unknown label: {label!r}")
        except Exception as e:  # pragma: no cover - network path
            return AIHint(topic=None, confidence=0.0, reason=f"error: {e}")


def build_provider(kind: str, api_key: str = "", model: str = "gpt-4o-mini") -> AIProvider:
    if kind == "openai":
        return OpenAIProvider(api_key=api_key, model=model)
    return NullProvider()
