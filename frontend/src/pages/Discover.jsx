import { useEffect, useState } from "react";

import { discoverMovies } from "../services/api";

import MovieGrid from "../components/MovieGrid";
import MovieCard from "../components/MovieCard";

export default function Discover() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
  try {
    const data = await discoverMovies();

    console.log("Discover response:", data);

    setMovies(data.results || []);
  } catch (error) {
    console.error("Discover error:", error);
  } finally {
    setLoading(false);
  }
}

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="py-32 text-center text-gray-400">
        Loading movies...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Discover Movies
        </h1>

        <p className="mt-2 text-gray-400">
          Explore thousands of movies and discover your next favourite.
        </p>
      </div>

      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </MovieGrid>
    </main>
  );
}