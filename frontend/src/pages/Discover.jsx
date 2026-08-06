import { useEffect, useState } from "react";

import { discoverMovies, getGenres } from "../services/api";

import MovieGrid from "../components/MovieGrid";
import MovieCard from "../components/MovieCard";

export default function Discover() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  // Fetch genres
  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await getGenres();

        setGenres(data.genres || []);

        if (data.genres?.length > 0) {
          setSelectedGenre(data.genres[0].id);
        }
      } catch (error) {
        console.error("Genres error:", error);
      }
    }

    fetchGenres();
  }, []);

  // Fetch movies
  useEffect(() => {
    if (!selectedGenre) return;

    async function fetchMovies() {
      setLoading(true);

      try {
        const data = await discoverMovies({
          genre_id: selectedGenre,
          page,
        });

        console.log("Discover response:", data);

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Discover error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [selectedGenre, page]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  return (
    <main className="mx-auto max-w-[1600px] px-8 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Discover Movies
        </h1>

        <p className="mt-2 text-gray-400">
          Explore thousands of movies and discover your next favourite.
        </p>

        {/* Genre Buttons */}
        <div className="mt-10 flex flex-wrap gap-4">
  {genres.map((genre) => (
    <button
      key={genre.id}
      onClick={() => {
        setSelectedGenre(genre.id);
        setPage(1);
      }}
      className={`rounded-full px-4 py-2 transition-colors duration-200 ${
        selectedGenre === genre.id
          ? "bg-purple-600 text-white"
          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
      }`}
    >
      {genre.name}
    </button>
  ))}
</div>
      </div>

      {loading ? (
        <div className="py-32 text-center text-gray-400">
          Loading movies...
        </div>
      ) : (
        <>
          <MovieGrid>
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </MovieGrid>

          {/* Pagination */}
          <div className="mt-14 flex w-full justify-center">
            <div className="flex items-center gap-10 rounded-2xl border border-gray-800 bg-gray-900/70 px-8 py-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-xl bg-gray-800 px-6 py-3 text-white transition-all duration-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              <div className="min-w-[170px] text-center">
                <p className="text-sm text-gray-400">Page</p>
                <p className="text-lg font-semibold text-white">
                  {page}
                  <span className="mx-2 text-gray-500">/</span>
                  {totalPages}
                </p>
              </div>

              <button
                onClick={() =>
                  setPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={page === totalPages}
                className="rounded-xl bg-purple-600 px-6 py-3 text-white transition-all duration-200 hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}