from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from app.core.config import settings
from typing import AsyncGenerator

# Create the async engine for Remote MySQL
engine = create_async_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,  # Important for remote connections to verify liveness
    pool_recycle=3600,   # Recycle connections to prevent "MySQL server has gone away"
    echo=False,
    connect_args={
        "ssl": {
            "ca": settings.MYSQL_SSL_CA,
            "cert": settings.MYSQL_SSL_CERT,
            "key": settings.MYSQL_SSL_KEY,
            # For full verification, you might also need:
            # "check_hostname": True,
            # "verify_mode": "CERT_REQUIRED" # This is generally implied by ssl_verify_cert=true in the URL
        }
    } if settings.MYSQL_SSL_CA and settings.MYSQL_SSL_CERT and settings.MYSQL_SSL_KEY else {}
)

# Session factory
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session