from pydantic import BaseModel, ConfigDict

from app.schemas.movie import MovieDetail


class FavoriteCreate(BaseModel):
    movie_id: int


class FavoriteResponse(BaseModel):
    id: int
    user_id: int
    movie_id: int

    model_config = ConfigDict(from_attributes=True)


class FavoriteMovieResponse(BaseModel):
    favorite_id: int
    movie: MovieDetail