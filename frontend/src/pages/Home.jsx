import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/api";

import Hero from "../components/layout/Hero";
import MovieCard from "../components/MovieCard";
import MovieGrid from "../components/MovieGrid";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load trending movies.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <h2 className="text-2xl text-white animate-pulse">
          Loading movies...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <h2 className="text-red-500 text-xl">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen">
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-white text-4xl font-bold mb-8">
          🔥 Trending Movies
        </h2>

        <MovieGrid>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </MovieGrid>
      </section>
    </div>
  );
}