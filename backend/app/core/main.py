from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.db.models import Page # Assuming you want to query the Page model
from sqlalchemy import select

app = FastAPI(title="GGL USA API")

@app.get("/")
async def read_root():
    return {"message": "Welcome to GGL USA API"}

# Example endpoint using the database session
@app.get("/pages/")
async def get_all_pages(db: AsyncSession = Depends(get_db)):
    """
    Retrieves all pages from the database.
    """
    try:
        result = await db.execute(select(Page))
        pages = result.scalars().all()
        return pages
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")