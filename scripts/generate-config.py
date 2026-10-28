#!/usr/bin/env python3
"""Generate the browser config.js file from a local .env file."""

from __future__ import annotations

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
ENV_PATH = ROOT / ".env"
CONFIG_PATH = ROOT / "config.js"


def read_env(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        value = value.strip().strip('"').strip("'")
        values[key.strip()] = value
    return values


def main() -> int:
    if not ENV_PATH.exists():
        print("Missing .env. Copy .env.example to .env and add your API key.", file=sys.stderr)
        return 1

    values = read_env(ENV_PATH)
    api_key = values.get("OPENWEATHERMAP_API_KEY", "")
    if not api_key or api_key == "YOUR_OPENWEATHERMAP_API_KEY_HERE":
        print("Set OPENWEATHERMAP_API_KEY in .env before generating config.js.", file=sys.stderr)
        return 1

    config = {
        "API_KEY": api_key,
        "BASE_URL": values.get("OPENWEATHERMAP_BASE_URL", "https://api.openweathermap.org/data/2.5"),
        "UNITS": values.get("OPENWEATHERMAP_UNITS", "metric"),
        "DEFAULT_CITY": values.get("OPENWEATHERMAP_DEFAULT_CITY", "New York"),
    }
    serialized = json.dumps(config, indent=2)
    CONFIG_PATH.write_text(
        "// Generated from .env. Do not commit this file.\n"
        f"const CONFIG = {serialized};\n\n"
        "window.CONFIG = CONFIG;\n",
        encoding="utf-8",
    )
    print(f"Generated {CONFIG_PATH.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
