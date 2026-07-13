from pydantic import BaseModel


class Movie(BaseModel):
    id: int
    title: str
    overview: str
    poster_path: str | None = None
    backdrop_path: str | None = None
    release_date: str | None = None
    vote_average: float
    vote_count: int


class MovieListResponse(BaseModel):
    page: int
    total_pages: int
    total_results: int
    results: list[Movie]

class MovieDetail(Movie):
    runtime: int | None = None
    genres: list[dict] = []
    status: str | None = None
    tagline: str | None = None