import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group"
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#17152B] shadow-[0_15px_40px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:border-purple-500/40 group-hover:shadow-[0_25px_70px_rgba(168,85,247,0.25)]">

          {/* Purple Glow */}
          <div className="absolute inset-0 bg-purple-600/0 transition duration-300 group-hover:bg-purple-600/5" />

          {/* Poster */}
          <div className="relative overflow-hidden">
            <img
              src={poster}
              alt={movie.title}
              className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#17152B] via-black/20 to-transparent" />

            {/* Rating */}
            <div className="absolute right-4 top-4 rounded-full bg-purple-600 px-3 py-1 text-sm font-semibold text-white shadow-lg">
              ⭐ {movie.vote_average?.toFixed(1)}
            </div>

            {/* Year */}
            <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-md">
              {movie.release_date?.slice(0, 4)}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="line-clamp-1 text-xl font-bold text-white transition group-hover:text-purple-300">
              {movie.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-400 line-clamp-2">
              Click to explore ratings, details and AI-powered recommendations.
            </p>

            <button className="mt-5 w-full rounded-xl bg-purple-600 py-3 font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-purple-500">
              View Details
            </button>
          </div>

        </div>
      </Link>
    </motion.div>
  );
}