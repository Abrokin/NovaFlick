import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { searchMovies } from "../services/api";
import MovieGrid from "../components/MovieGrid";
import MovieCard from "../components/MovieCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchResults() {
      if (!query.trim()) {
        setMovies([]);
        setError("");
        return;
      }

      setLoading(true);
      setMovies([]);
      setError("");

      try {
        const data = await searchMovies(query);
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while searching. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-zinc-950 px-6 pt-32 pb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">
          Search Results
        </h1>

        {query && (
          <p className="text-zinc-400 mb-8">
            {loading
              ? `Searching for "${query}"...`
              : `${movies.length} result${
                  movies.length !== 1 ? "s" : ""
                } for "${query}"`}
          </p>
        )}

        {error && (
          <div className="mb-8 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <p className="text-zinc-400 text-lg animate-pulse">
              Searching movies...
            </p>
          </div>
        ) : movies.length === 0 && !error ? (
          <div className="flex justify-center py-16">
            <p className="text-zinc-500 text-lg">
              No movies found.
            </p>
          </div>
        ) : (
          <MovieGrid>
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </MovieGrid>
        )}
      </div>
    </div>
  );
}