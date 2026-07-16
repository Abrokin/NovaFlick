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

    async def get_trending_movies(
        self,
        time_window: str = "week",
        page: int = 1
    ):
        return await self._get(
            f"/trending/movie/{time_window}",
            params={"page": page}
        )

    async def get_popular_movies(self, page: int = 1):
        return await self._get(
            "/movie/popular",
            params={"page": page}
        )

    async def search_movies(self, query: str, page: int = 1):
        return await self._get(
            "/search/movie",
            params={
                "query": query,
                "page": page
            }
        )

    async def get_top_rated_movies(self, page: int = 1):
        return await self._get(
            "/movie/top_rated",
            params={"page": page}
        )

    async def get_upcoming_movies(self, page: int = 1):
        return await self._get(
            "/movie/upcoming",
            params={"page": page}
        )
    async def get_movie_genres(self):
        return await self._get("/genre/movie/list")
    async def discover_movies(
    self,
    genre_id: int,
    page: int = 1
):
        return await self._get(
        "/discover/movie",
        params={
            "with_genres": genre_id,
            "page": page
        }
    )

    async def get_movie_details(self, movie_id: int):
        return await self._get(f"/movie/{movie_id}")
    async def get_recommendations(
    self,
    genres: list[int],
    page: int = 1
):
        return await self._get(
        "/discover/movie",
        params={
            "with_genres": ",".join(map(str, genres)),
            "sort_by": "popularity.desc",
            "page": page,
            "vote_count.gte": 100
        }
    )


tmdb_service = TMDBService()