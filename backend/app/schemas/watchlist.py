from pydantic import BaseModel, ConfigDict

from app.schemas.movie import MovieDetail


class WatchlistCreate(BaseModel):
    movie_id: int


class WatchlistResponse(BaseModel):
    id: int
    user_id: int
    movie_id: int

    model_config = ConfigDict(from_attributes=True)


class WatchlistMovieResponse(BaseModel):
    watchlist_id: int
    movie: MovieDetail