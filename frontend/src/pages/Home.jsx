import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/api";

import Hero from "../components/layout/Hero";
import MovieCard from "../components/MovieCard";
import MovieGrid from "../components/MovieGrid";
import WhyNovaFlick from "../components/WhyNovaFlick";

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
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <h2 className="animate-pulse text-2xl text-white">
          Loading movies...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <h2 className="text-xl text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <Hero featuredMovie={movies[0]} />
      <Hero />

      {/* Trending Section */}
      <section className="mx-auto max-w-[1600px] px-8 pt-24 pb-16">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-sm text-purple-300">
              🔥 Trending
            </span>

            <h2 className="mt-4 text-5xl font-black text-white">
              Trending This Week
            </h2>

            <p className="mt-3 max-w-2xl text-lg text-gray-400">
              Explore the movies everyone is talking about right now, updated
              weekly from global trends.
            </p>
          </div>

          <button className="hidden rounded-xl border border-purple-500/30 bg-white/5 px-5 py-3 text-white transition hover:border-purple-400 hover:bg-purple-500/10 md:block">
            View All →
          </button>
        </div>

        <MovieGrid>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </MovieGrid>
      </section>

      {/* Why NovaFlick Section */}
      <WhyNovaFlick />
    </div>
  );
}