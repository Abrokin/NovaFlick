import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieDetails } from "../services/api";
import MovieHero from "../components/movie/MovieHero";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movie.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) {
  return (
    <div className="min-h-screen bg-zinc-950 animate-pulse">
      {/* Backdrop */}
      <div className="h-[65vh] bg-zinc-900" />

      <div className="mx-auto -mt-40 max-w-7xl px-6">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Poster */}
          <div className="h-[450px] w-[300px] rounded-2xl bg-zinc-800" />

          {/* Content */}
          <div className="flex-1 space-y-6 pt-10">
            <div className="h-12 w-3/4 rounded bg-zinc-800" />

            <div className="flex gap-4">
              <div className="h-6 w-20 rounded bg-zinc-800" />
              <div className="h-6 w-20 rounded bg-zinc-800" />
              <div className="h-6 w-28 rounded bg-zinc-800" />
            </div>

            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-zinc-800" />
              <div className="h-4 w-11/12 rounded bg-zinc-800" />
              <div className="h-4 w-10/12 rounded bg-zinc-800" />
              <div className="h-4 w-8/12 rounded bg-zinc-800" />
            </div>

            <div className="flex gap-4 pt-6">
              <div className="h-12 w-40 rounded-xl bg-zinc-800" />
              <div className="h-12 w-40 rounded-xl bg-zinc-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <h2 className="text-xl text-red-500">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950">
      <MovieHero movie={movie} />
    </div>
  );
}