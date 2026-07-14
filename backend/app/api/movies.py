from fastapi import APIRouter, Query

from app.schemas.movie import GenreListResponse, MovieDetail, MovieListResponse
from app.services.tmdb import tmdb_service


router = APIRouter(
    prefix="/movies",
    tags=["Movies"]
)


@router.get("/trending", response_model=MovieListResponse)
async def get_trending_movies(
    time_window: str = Query("week", pattern="^(day|week)$"),
    page: int = Query(1, ge=1)
):
    return await tmdb_service.get_trending_movies(time_window, page)


@router.get("/popular", response_model=MovieListResponse)
async def get_popular_movies(
    page: int = Query(1, ge=1)
):
    return await tmdb_service.get_popular_movies(page)


@router.get("/search", response_model=MovieListResponse)
async def search_movies(
    query: str = Query(..., min_length=1),
    page: int = Query(1, ge=1)
):
    return await tmdb_service.search_movies(query, page)


@router.get("/top-rated", response_model=MovieListResponse)
async def get_top_rated_movies(
    page: int = Query(1, ge=1)
):
    return await tmdb_service.get_top_rated_movies(page)


@router.get("/upcoming", response_model=MovieListResponse)
async def get_upcoming_movies(
    page: int = Query(1, ge=1)
):
    return await tmdb_service.get_upcoming_movies(page)
@router.get("/genres", response_model=GenreListResponse)
async def get_movie_genres():
    return await tmdb_service.get_movie_genres()
@router.get("/discover", response_model=MovieListResponse)
async def discover_movies(
    genre_id: int = Query(..., ge=1),
    page: int = Query(1, ge=1)
):
    return await tmdb_service.discover_movies(genre_id, page)


@router.get("/{movie_id}", response_model=MovieDetail)
async def get_movie_details(movie_id: int):
    return await tmdb_service.get_movie_details(movie_id)