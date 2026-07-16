from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.database.session import get_db
from app.models.preference import UserGenrePreference
from app.models.user import User
from app.schemas.preference import (
    GenrePreferenceCreate,
    GenrePreferenceResponse,
)
from sqlalchemy import select


router = APIRouter(
    prefix="/preferences",
    tags=["Preferences"]
)


@router.put("/genres", response_model=GenrePreferenceResponse)
def update_genre_preferences(
    preference_data: GenrePreferenceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db.query(UserGenrePreference).filter(
        UserGenrePreference.user_id == current_user.id
    ).delete(synchronize_session=False)

    preferences = [
        UserGenrePreference(
            user_id=current_user.id,
            genre_id=genre_id
        )
        for genre_id in set(preference_data.genre_ids)
    ]

    db.add_all(preferences)
    db.commit()

    return {
        "genre_ids": [preference.genre_id for preference in preferences]
    }
@router.get("/genres", response_model=GenrePreferenceResponse)
def get_genre_preferences(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    preferences = (
        db.query(UserGenrePreference)
        .filter(UserGenrePreference.user_id == current_user.id)
        .all()
    )

    return {
        "genre_ids": [preference.genre_id for preference in preferences]
    }