from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.database.session import get_db
from app.models.favorite import Favorite
from app.models.user import User
from app.schemas.favorite import (
    FavoriteCreate,
    FavoriteMovieResponse,
    FavoriteResponse,
)
from app.services.tmdb import tmdb_service


router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"],
)


@router.post(
    "",
    response_model=FavoriteResponse,
    status_code=status.HTTP_201_CREATED,
)
def add_favorite(
    favorite_data: FavoriteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing_favorite = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == current_user.id,
            Favorite.movie_id == favorite_data.movie_id,
        )
        .first()
    )

    if existing_favorite:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Movie is already in favorites",
        )

    favorite = Favorite(
        user_id=current_user.id,
        movie_id=favorite_data.movie_id,
    )

    db.add(favorite)
    db.commit()
    db.refresh(favorite)

    return favorite


@router.get("", response_model=list[FavoriteMovieResponse])
async def get_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    favorites = (
        db.query(Favorite)
        .filter(Favorite.user_id == current_user.id)
        .all()
    )

    result = []

    for favorite in favorites:
        movie = await tmdb_service.get_movie_details(favorite.movie_id)

        result.append(
            {
                "favorite_id": favorite.id,
                "movie": movie,
            }
        )

    return result


@router.delete(
    "/{movie_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_favorite(
    movie_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    favorite = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == current_user.id,
            Favorite.movie_id == movie_id,
        )
        .first()
    )

    if favorite is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Favorite not found",
        )

    db.delete(favorite)
    db.commit()