import { useEffect, useState } from "react";

import { discoverMovies, getGenres } from "../services/api";

import MovieGrid from "../components/MovieGrid";
import MovieCard from "../components/MovieCard";

export default function Discover() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch genres when the page loads
  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await getGenres();

        setGenres(data.genres || []);

        if (data.genres && data.genres.length > 0) {
          setSelectedGenre(data.genres[0].id);
        }
      } catch (error) {
        console.error("Genres error:", error);
      }
    }

    fetchGenres();
  }, []);

  // Fetch movies whenever the selected genre changes
  useEffect(() => {
    if (!selectedGenre) return;

    async function fetchMovies() {
      setLoading(true);

      try {
        const data = await discoverMovies({
          genre_id: selectedGenre,
        });

        console.log("Discover response:", data);

        setMovies(data.results || []);
      } catch (error) {
        console.error("Discover error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [selectedGenre]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Discover Movies
        </h1>

        <p className="mt-2 text-gray-400">
          Explore thousands of movies and discover your next favourite.
        </p>

        {/* Genre Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
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
        <MovieGrid>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </MovieGrid>
      )}
    </main>
  );
}