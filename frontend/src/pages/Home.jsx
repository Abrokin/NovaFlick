import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MovieGrid from "../components/MovieGrid";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <Hero />

      <div className="bg-zinc-950 min-h-screen">
        <h2 className="text-white text-3xl font-bold px-8 pt-8">
          Trending Movies
        </h2>

        <MovieGrid>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </MovieGrid>
      </div>
    </>
  );
}