import { useEffect, useState } from "react";
import { getAIPicks } from "../services/api";
import MovieGrid from "../components/MovieGrid";

export default function AIPicks() {
  const [movies, setMovies] = useState([]);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPicks() {
      try {
        const data = await getAIPicks();
        setMovies(data.results || []);
        setReason(data.reason || "Personalized recommendations");
      } catch (error) {
        console.error("Failed to load AI Picks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPicks();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B12] text-white px-8 lg:px-12 xl:px-16 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">AI Picks for You</h1>
        <p className="text-purple-400 mt-3">{reason}</p>
      </div>

      <MovieGrid
        title="Recommended for you"
        movies={movies}
        loading={loading}
      />
    </div>
  );
}