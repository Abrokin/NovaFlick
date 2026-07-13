from pydantic_settings import BaseSettings

print("Loading config.py...")


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    TMDB_API_KEY: str
    TMDB_BASE_URL: str

    class Config:
        env_file = ".env"


print("Creating settings...")
settings = Settings()
print("Settings created successfully!")