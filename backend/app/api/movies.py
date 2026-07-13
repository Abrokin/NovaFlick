from fastapi import APIRouter, Query

from app.schemas.movie import MovieListResponse
from app.services.tmdb import tmdb_service
from app.schemas.movie import MovieDetail

router = APIRouter(
    prefix="/movies",
    tags=["Movies"]
)


@router.get("/trending", response_model=MovieListResponse)
async def get_trending_movies(
    time_window: str = Query("week", pattern="^(day|week)$")
):
    return await tmdb_service.get_trending_movies(time_window)


@router.get("/popular", response_model=MovieListResponse)
async def get_popular_movies():
    return await tmdb_service.get_popular_movies()
@router.get("/{movie_id}", response_model=MovieDetail)
async def get_movie_details(movie_id: int):
    return await tmdb_service.get_movie_details(movie_id)