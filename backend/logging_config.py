from __future__ import annotations

import logging
import sys


DEFAULT_LOG_FORMAT = (
    "%(asctime)s %(levelname)s [%(name)s] [%(threadName)s] %(message)s"
)
DEFAULT_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


def configure_logging(log_level: str | None = None) -> None:
    level_name = (log_level or "INFO").strip().upper()
    level = getattr(logging, level_name, logging.INFO)
    logging.basicConfig(
        level=level,
        format=DEFAULT_LOG_FORMAT,
        datefmt=DEFAULT_DATE_FORMAT,
        stream=sys.stdout,
        force=True,
    )
    logging.getLogger("uvicorn").setLevel(level)
    logging.getLogger("uvicorn.error").setLevel(level)
    logging.getLogger("uvicorn.access").setLevel(level)


def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)
