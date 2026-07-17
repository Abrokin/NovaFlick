from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.schemas.movie import MovieListResponse
from app.services.recommendation import recommendation_service

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"],
)


@router.get("/", response_model=MovieListResponse)
async def get_recommendations(
    page: int = Query(1, ge=1),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return await recommendation_service.get_recommendations(
        user_id=current_user.id,
        db=db,
        page=page,
    )