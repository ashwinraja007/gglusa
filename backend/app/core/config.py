import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "GGL USA API"
    API_V1_STR: str = "/api/v1"
    
    # This will be populated from the .env file
    DATABASE_URL: str = os.getenv("DATABASE_URL", "mysql+aiomysql://user:pass@localhost/db")
    MYSQL_SSL_CA: str | None = os.getenv("MYSQL_SSL_CA")
    MYSQL_SSL_CERT: str | None = os.getenv("MYSQL_SSL_CERT")
    MYSQL_SSL_KEY: str | None = os.getenv("MYSQL_SSL_KEY")

settings = Settings()