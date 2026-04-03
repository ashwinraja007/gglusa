from datetime import datetime

from pydantic import BaseModel, Field


class PageIn(BaseModel):
    path: str
    component_key: str = Field(default="dynamic_page")


class PageOut(PageIn):
    id: int
    created_at: datetime
    updated_at: datetime


class ContentIn(BaseModel):
    page_path: str
    section_key: str
    content_json: dict = Field(default_factory=dict)
    images_json: dict = Field(default_factory=dict)


class ContentOut(ContentIn):
    id: int
    created_at: datetime
    updated_at: datetime


class SeoIn(BaseModel):
    path: str
    title: str
    description: str
    keywords: str
    extra_meta_json: dict = Field(default_factory=dict)


class SeoOut(SeoIn):
    id: int
    created_at: datetime
    updated_at: datetime


class HeaderIn(BaseModel):
    label: str
    url: str
    sort_order: int = 0
    is_active: bool = True


class HeaderOut(HeaderIn):
    id: int
    created_at: datetime
    updated_at: datetime


class LocationIn(BaseModel):
    name: str
    address: str
    country: str
    phone: str
    email: str
    lat: float | None = None
    lng: float | None = None


class LocationOut(LocationIn):
    id: int
    created_at: datetime
    updated_at: datetime


class SessionCheckIn(BaseModel):
    username: str
    password: str


class SessionCheckOut(BaseModel):
    success: bool
    mode: str
