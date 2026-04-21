"""Very small in-process scheduler for MVP.

Reads ``scheduled_jobs`` rows, fires due jobs on a fixed tick, and records
``last_run_at``. The real MVP deliberately avoids depending on Windows Task
Scheduler so it runs on the first launch; a helper to register a schtasks
entry is provided for users who want OS-level scheduling later.
"""

from __future__ import annotations

import contextlib
import sqlite3
import threading
from collections.abc import Callable
from datetime import UTC, datetime, timedelta

TickHandler = Callable[[sqlite3.Connection, sqlite3.Row], None]


class Scheduler:
    def __init__(self, conn_factory: Callable[[], sqlite3.Connection], handler: TickHandler, interval_s: int = 60) -> None:
        self._conn_factory = conn_factory
        self._handler = handler
        self._interval = interval_s
        self._stop = threading.Event()
        self._thread: threading.Thread | None = None

    def start(self) -> None:
        if self._thread and self._thread.is_alive():
            return
        self._stop.clear()
        self._thread = threading.Thread(target=self._loop, name="fileagent-scheduler", daemon=True)
        self._thread.start()

    def stop(self) -> None:
        self._stop.set()
        if self._thread:
            self._thread.join(timeout=5)

    def _loop(self) -> None:
        while not self._stop.is_set():
            # Never let the scheduler die silently; real logs go through the normal logger.
            with contextlib.suppress(Exception):
                self._tick()
            self._stop.wait(self._interval)

    def _tick(self) -> None:
        now = datetime.now(UTC)
        conn = self._conn_factory()
        try:
            rows = conn.execute(
                "SELECT * FROM scheduled_jobs WHERE enabled = 1 AND "
                "(next_run_at IS NULL OR next_run_at <= ?)",
                (now.isoformat(),),
            ).fetchall()
            for row in rows:
                self._handler(conn, row)
                conn.execute(
                    "UPDATE scheduled_jobs SET last_run_at = ?, next_run_at = ? WHERE id = ?",
                    (now.isoformat(), _next_run(row["trigger"], now).isoformat(), row["id"]),
                )
            conn.commit()
        finally:
            conn.close()


def _next_run(trigger: str, now: datetime) -> datetime:
    if trigger == "daily":
        return now + timedelta(days=1)
    if trigger == "weekly":
        return now + timedelta(days=7)
    if trigger == "startup":
        # Startup jobs only run once per process.
        return now + timedelta(days=36500)
    return now + timedelta(hours=1)


def windows_task_command(exe_path: str, task_name: str = "FileAgentDaily") -> str:
    """Return a ``schtasks`` command the user can run manually to register the job."""
    return (
        f'schtasks /Create /SC DAILY /TN "{task_name}" '
        f'/TR "\"{exe_path}\" --scheduled-run" /ST 09:00 /F'
    )
