from pydantic import BaseModel


class PaginationParams(BaseModel):
    page: int = 1
    page_size: int = 20
    q: str | None = None


class PaginatedResponse(BaseModel):
    items: list
    page: int
    page_size: int
    total: int
