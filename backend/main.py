from __future__ import annotations

import uvicorn

from backend.config import load_backend_config
from backend.logging_config import configure_logging, get_logger


logger = get_logger(__name__)


def main() -> int:
    config = load_backend_config()
    configure_logging(config.api.log_level)
    logger.info(
        f"Serving FastAPI backend at http://{config.api.host}:{config.api.port}{config.api.prefix}"
    )
    uvicorn.run(
        "backend.fastapi_app:app",
        host=config.api.host,
        port=config.api.port,
        log_level=config.api.log_level.lower(),
        access_log=config.api.access_log,
        factory=False,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
