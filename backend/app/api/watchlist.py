from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.models.watchlist import Watchlist
from app.schemas.watchlist import (
    WatchlistCreate,
    WatchlistMovieResponse,
    WatchlistResponse,
)
from app.services.tmdb import tmdb_service


router = APIRouter(
    prefix="/watchlist",
    tags=["Watchlist"],
)


@router.post(
    "",
    response_model=WatchlistResponse,
    status_code=status.HTTP_201_CREATED,
)
def add_to_watchlist(
    watchlist_data: WatchlistCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing_item = (
        db.query(Watchlist)
        .filter(
            Watchlist.user_id == current_user.id,
            Watchlist.movie_id == watchlist_data.movie_id,
        )
        .first()
    )

    if existing_item:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Movie is already in watchlist",
        )

    watchlist_item = Watchlist(
        user_id=current_user.id,
        movie_id=watchlist_data.movie_id,
    )

    db.add(watchlist_item)
    db.commit()
    db.refresh(watchlist_item)

    return watchlist_item


@router.get("", response_model=list[WatchlistMovieResponse])
async def get_watchlist(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    watchlist_items = (
        db.query(Watchlist)
        .filter(Watchlist.user_id == current_user.id)
        .all()
    )

    result = []

    for item in watchlist_items:
        movie = await tmdb_service.get_movie_details(item.movie_id)

        result.append(
            {
                "watchlist_id": item.id,
                "movie": movie,
            }
        )

    return result


@router.delete(
    "/{movie_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_from_watchlist(
    movie_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    watchlist_item = (
        db.query(Watchlist)
        .filter(
            Watchlist.user_id == current_user.id,
            Watchlist.movie_id == movie_id,
        )
        .first()
    )

    if watchlist_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found in watchlist",
        )

    db.delete(watchlist_item)
    db.commit()