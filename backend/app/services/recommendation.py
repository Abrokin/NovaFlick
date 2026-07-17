from sqlalchemy.orm import Session

from app.models.favorite import Favorite
from app.models.preference import UserGenrePreference
from app.schemas.movie import MovieListResponse
from app.services.tmdb import tmdb_service


class RecommendationService:

    async def get_recommendations(
        self,
        user_id: int,
        db: Session,
        page: int = 1,
    ):
        favorite = (
        db.query(Favorite)
        .filter(Favorite.user_id == user_id)
        .order_by(Favorite.id.desc())
        .first()
)

        if favorite:
            return await tmdb_service.get_similar_movies(
            movie_id=favorite.movie_id,
            page=page,
        )

        preferences = (
            db.query(UserGenrePreference)
            .filter(UserGenrePreference.user_id == user_id)
            .all()
        )

        genre_ids = [p.genre_id for p in preferences]

        if not genre_ids:
            return MovieListResponse(
                page=1,
                results=[],
                total_pages=0,
                total_results=0,
            )

        return await tmdb_service.get_recommendations(
            genres=genre_ids,
            page=page,
        )


recommendation_service = RecommendationService()