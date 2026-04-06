from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.models import ContentRecord, Header, Location, Page, SeoRecord
from app.db.session import get_db
from app.schemas.resources import (
    ContentIn,
    ContentOut,
    HeaderIn,
    HeaderOut,
    LocationIn,
    LocationOut,
    PageIn,
    PageOut,
    SeoIn,
    SeoOut,
    SessionCheckIn,
    SessionCheckOut,
)
from app.services.crud import list_records

router = APIRouter()


def _json(record):
    return record


@router.get("/pages")
async def get_pages(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    q: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    result = await list_records(db, Page, page=page, page_size=page_size, q=q, search_columns=["path", "component_key"])
    result["items"] = [PageOut.model_validate(_json(item), from_attributes=True).model_dump() for item in result["items"]]
    return result


@router.post("/pages", response_model=PageOut)
async def create_page(payload: PageIn, db: AsyncSession = Depends(get_db)):
    exists = await db.scalar(select(Page).where(Page.path == payload.path))
    if exists:
        raise HTTPException(status_code=409, detail="Path already exists")
    record = Page(**payload.model_dump())
    db.add(record)
    await db.commit()
    await db.refresh(record)
    return PageOut.model_validate(record, from_attributes=True)


@router.delete("/pages/{page_id}")
async def delete_page(page_id: int, db: AsyncSession = Depends(get_db)):
    record = await db.get(Page, page_id)
    if not record:
        raise HTTPException(status_code=404, detail="Not found")
    await db.delete(record)
    await db.commit()
    return {"ok": True}


@router.get("/content")
async def get_content(
    page_path: str | None = None,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    q: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    result = await list_records(
        db,
        ContentRecord,
        page=page,
        page_size=page_size,
        q=q,
        search_columns=["page_path", "section_key"],
    )
    if page_path:
        rows = await db.execute(select(ContentRecord).where(ContentRecord.page_path == page_path))
        result = {
            "items": [ContentOut.model_validate(item, from_attributes=True).model_dump() for item in rows.scalars().all()],
            "page": 1,
            "page_size": 500,
            "total": len(result["items"]),
        }
    else:
        result["items"] = [ContentOut.model_validate(item, from_attributes=True).model_dump() for item in result["items"]]
    return result


@router.post("/content", response_model=ContentOut)
async def create_content(payload: ContentIn, db: AsyncSession = Depends(get_db)):
    record = ContentRecord(**payload.model_dump())
    db.add(record)
    await db.commit()
    await db.refresh(record)
    return ContentOut.model_validate(record, from_attributes=True)




@router.put("/content/{content_id}", response_model=ContentOut)
async def update_content(content_id: int, payload: ContentIn, db: AsyncSession = Depends(get_db)):
    record = await db.get(ContentRecord, content_id)
    if not record:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in payload.model_dump().items():
        setattr(record, key, value)
    await db.commit()
    await db.refresh(record)
    return ContentOut.model_validate(record, from_attributes=True)

@router.delete("/content/{content_id}")
async def delete_content(content_id: int, db: AsyncSession = Depends(get_db)):
    record = await db.get(ContentRecord, content_id)
    if not record:
        raise HTTPException(status_code=404, detail="Not found")
    await db.delete(record)
    await db.commit()
    return {"ok": True}


@router.get("/seo")
async def get_seo(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    q: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    result = await list_records(db, SeoRecord, page=page, page_size=page_size, q=q, search_columns=["path", "title"])
    result["items"] = [SeoOut.model_validate(item, from_attributes=True).model_dump() for item in result["items"]]
    return result


@router.post("/seo", response_model=SeoOut)
async def upsert_seo(payload: SeoIn, db: AsyncSession = Depends(get_db)):
    existing = await db.scalar(select(SeoRecord).where(SeoRecord.path == payload.path))
    if existing:
        for key, value in payload.model_dump().items():
            setattr(existing, key, value)
        await db.commit()
        await db.refresh(existing)
        return SeoOut.model_validate(existing, from_attributes=True)

    record = SeoRecord(**payload.model_dump())
    db.add(record)
    await db.commit()
    await db.refresh(record)
    return SeoOut.model_validate(record, from_attributes=True)


@router.delete("/seo/{seo_id}")
async def delete_seo(seo_id: int, db: AsyncSession = Depends(get_db)):
    record = await db.get(SeoRecord, seo_id)
    if not record:
        raise HTTPException(status_code=404, detail="Not found")
    await db.delete(record)
    await db.commit()
    return {"ok": True}


@router.get("/headers")
async def get_headers(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    q: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    result = await list_records(db, Header, page=page, page_size=page_size, q=q, search_columns=["label", "url"])
    result["items"] = [HeaderOut.model_validate(item, from_attributes=True).model_dump() for item in result["items"]]
    return result


@router.post("/headers", response_model=HeaderOut)
async def create_header(payload: HeaderIn, db: AsyncSession = Depends(get_db)):
    record = Header(**payload.model_dump())
    db.add(record)
    await db.commit()
    await db.refresh(record)
    return HeaderOut.model_validate(record, from_attributes=True)


@router.delete("/headers/{header_id}")
async def delete_header(header_id: int, db: AsyncSession = Depends(get_db)):
    record = await db.get(Header, header_id)
    if not record:
        raise HTTPException(status_code=404, detail="Not found")
    await db.delete(record)
    await db.commit()
    return {"ok": True}


@router.get("/locations")
async def get_locations(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    q: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    result = await list_records(db, Location, page=page, page_size=page_size, q=q, search_columns=["name", "country", "email"])
    result["items"] = [LocationOut.model_validate(item, from_attributes=True).model_dump() for item in result["items"]]
    return result


@router.post("/locations", response_model=LocationOut)
async def create_location(payload: LocationIn, db: AsyncSession = Depends(get_db)):
    record = Location(**payload.model_dump())
    db.add(record)
    await db.commit()
    await db.refresh(record)
    return LocationOut.model_validate(record, from_attributes=True)


@router.delete("/locations/{location_id}")
async def delete_location(location_id: int, db: AsyncSession = Depends(get_db)):
    record = await db.get(Location, location_id)
    if not record:
        raise HTTPException(status_code=404, detail="Not found")
    await db.delete(record)
    await db.commit()
    return {"ok": True}


@router.post("/admin/session", response_model=SessionCheckOut)
async def admin_session_check(payload: SessionCheckIn):
    ok = payload.username == settings.ADMIN_UI_USERNAME and payload.password == settings.ADMIN_UI_PASSWORD
    return SessionCheckOut(success=ok, mode="non-production security mode")


@router.post("/content/upload-image")
async def content_upload_image():
    return {
        "url": "https://object-storage.example.com/path/to/uploaded-file.png",
        "message": "Integrate your object storage provider (S3/R2/GCS) here.",
    }
