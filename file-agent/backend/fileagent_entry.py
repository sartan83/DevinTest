"""PyInstaller entrypoint for the sidecar.

PyInstaller runs its target script as ``__main__`` with no parent package,
which breaks relative imports inside ``fileagent/main.py``. This top-level
script imports the package normally and delegates to its ``main()``.
"""

from __future__ import annotations

import sys

from fileagent.main import main


if __name__ == "__main__":
    sys.exit(main())
