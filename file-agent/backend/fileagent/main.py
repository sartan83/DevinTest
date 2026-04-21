"""Sidecar entrypoint."""

from __future__ import annotations

import argparse
import logging
import sys

import uvicorn

from .api import create_app
from .config import load_settings


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="fileagent")
    parser.add_argument("--host", default=None)
    parser.add_argument("--port", type=int, default=None)
    parser.add_argument("--log-level", default=None)
    parser.add_argument("--scheduled-run", action="store_true",
                        help="Run a one-off scheduled plan+apply cycle, then exit.")
    args = parser.parse_args(argv)

    settings = load_settings()
    level = (args.log_level or settings.log_level).upper()
    logging.basicConfig(level=level, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

    if args.scheduled_run:
        # Lightweight, non-server mode for OS-scheduled runs.
        from .db import init_db
        from .executor import apply as executor_apply
        from .models import ApplyRequest
        from .planner import build_plan
        from .seed import seed_all
        conn = init_db(settings.db_path)
        seed_all(conn)
        plan_id, _ = build_plan(conn)
        batch_id, executed = executor_apply(conn, ApplyRequest(plan_id=plan_id, mode="auto"))
        print(f"Scheduled run: plan={plan_id} batch={batch_id} applied={len(executed)}")
        return 0

    app = create_app(settings)
    uvicorn.run(
        app,
        host=args.host or settings.host,
        port=args.port or settings.port,
        log_level=level.lower(),
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
