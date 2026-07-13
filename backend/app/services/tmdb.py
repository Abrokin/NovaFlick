import httpx

from app.core.config import settings


class TMDBService:
    def __init__(self):
        self.base_url = settings.TMDB_BASE_URL
        self.api_key = settings.TMDB_API_KEY

    async def _get(self, endpoint: str, params: dict | None = None):
        params = params or {}
        params["api_key"] = self.api_key

        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(
                f"{self.base_url}{endpoint}",
                params=params
            )
            response.raise_for_status()
            return response.json()

    async def get_trending_movies(self, time_window: str = "week"):
        return await self._get(f"/trending/movie/{time_window}")

    async def get_popular_movies(self):
        return await self._get("/movie/popular")
    async def get_movie_details(self, movie_id: int):
        return await self._get(f"/movie/{movie_id}")


tmdb_service = TMDBService()