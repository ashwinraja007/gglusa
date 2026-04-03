from typing import Any

from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession


async def list_records(
    db: AsyncSession,
    model: Any,
    *,
    page: int,
    page_size: int,
    q: str | None,
    search_columns: list[str],
):
    stmt = select(model)
    if q and search_columns:
        filters = [getattr(model, col).ilike(f"%{q}%") for col in search_columns]
        stmt = stmt.where(or_(*filters))

    count_stmt = select(func.count()).select_from(stmt.subquery())
    total = (await db.execute(count_stmt)).scalar_one()
    rows = (
        await db.execute(stmt.order_by(model.id.desc()).offset((page - 1) * page_size).limit(page_size))
    ).scalars().all()
    return {"items": rows, "page": page, "page_size": page_size, "total": total}
