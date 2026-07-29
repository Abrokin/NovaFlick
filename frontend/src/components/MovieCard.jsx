import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <motion.div
      whileHover={{
        y: -12,
        rotateX: 4,
        rotateY: -3,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className="group perspective-[1200px]"
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#17152B] transition-all duration-500 shadow-[0_20px_45px_rgba(0,0,0,0.45)] group-hover:shadow-[0_35px_90px_rgba(139,92,246,0.28)]">

          {/* Animated Glow */}
          <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
            <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
          </div>
          <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none group-hover:border-purple-400/30 transition-colors duration-500" />

          {/* Poster */}
          <div className="relative overflow-hidden">
            <img
              src={poster}
              alt={movie.title}
              className="h-[390px] w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110"
            />

            {/* Overlay */}
<div className="absolute inset-0 bg-gradient-to-t from-[#0B0A14] via-black/25 to-transparent transition-all duration-500 group-hover:from-[#090812]" />

            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 backdrop-blur-lg border border-white/10">
  <span>⭐</span>
  <span className="font-semibold">
    {movie.vote_average?.toFixed(1)}
  </span>
</div>

            {/* Year */}
            <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white backdrop-blur-md">
              {movie.release_date?.slice(0, 4)}
            </div>

            
          </div>

          {/* Content */}
          <div className="space-y-4 p-5">
            <div>
              <h3 className="min-h-[56px] line-clamp-2 text-xl font-bold text-white transition duration-300 group-hover:text-purple-300">
  {movie.title}
</h3>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-400">
  {movie.overview || "No description available."}
</p>
            </div>

            {/* Button */}
            <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <button className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3 font-semibold text-white shadow-lg transition duration-300 group-hover:scale-[1.02]">
                View Details →
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}