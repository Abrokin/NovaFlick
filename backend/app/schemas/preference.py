from pydantic import BaseModel, Field


class GenrePreferenceCreate(BaseModel):
    genre_ids: list[int] = Field(
        ...,
        min_length=1
    )


class GenrePreferenceResponse(BaseModel):
    genre_ids: list[int]