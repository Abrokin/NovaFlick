from fastapi import FastAPI
from sqlalchemy import text

from app.api.users import router as users_router
from app.database.session import engine
from app.api.movies import router as movies_router


app = FastAPI(
    title="NovaFlick API",
    version="1.0.0",
    description="AI-powered movie recommendation backend."
)


@app.get("/")
def root():
    return {"message": "Welcome to the NovaFlick API!"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.get("/db-test")
def db_test():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {"database": "Connected successfully"}

    except Exception as e:
        return {"database": f"Connection failed: {str(e)}"}
app.include_router(users_router)
app.include_router(movies_router)
