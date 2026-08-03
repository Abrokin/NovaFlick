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

  useEffect(() => {
    async function fetchResults() {
      if (!query.trim()) {
        setMovies([]);
        return;
      }

      setLoading(true);

      try {
        const data = await searchMovies(query);
        setMovies(data.results);
      } catch (error) {
        console.error(error);
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
            Results for "{query}"
          </p>
        )}

        {loading ? (
          <p className="text-zinc-400">Searching...</p>
        ) : movies.length === 0 ? (
          <p className="text-zinc-500">
            No movies found.
          </p>
        ) : (
          <MovieGrid>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MovieGrid>
        )}
      </div>
    </div>
  );
}