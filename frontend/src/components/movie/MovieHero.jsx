import { Star, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import GenreBadge from "./GenreBadge";
import DetailActions from "./DetailActions";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieHero({ movie }) {
  if (!movie) return null;

  const backdrop = movie.backdrop_path
    ? `${IMAGE_BASE}${movie.backdrop_path}`
    : "";

  const poster = movie.poster_path
    ? `${POSTER_BASE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backdrop})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A14] via-[#0B0A14]/80 to-black/40" />

      {/* Purple Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center gap-16 px-8 py-24">

        {/* Poster */}
        <motion.img
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          src={poster}
          alt={movie.title}
          className="hidden w-[340px] rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] lg:block"
        />

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-purple-400">
            {movie.tagline}
          </p>

          <h1 className="text-5xl font-black text-white lg:text-7xl">
            {movie.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-gray-300">

            <div className="flex items-center gap-2">
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
              <span>{movie.vote_average?.toFixed(1)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{movie.release_date?.slice(0, 4)}</span>
            </div>

            {movie.runtime && (
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{movie.runtime} min</span>
              </div>
            )}
          </div>

          {/* Genres */}
          <div className="mt-8 flex flex-wrap gap-3">
            {movie.genres?.map((genre) => (
              <GenreBadge
                key={genre.id}
                name={genre.name}
              />
            ))}
          </div>

          {/* Overview */}
          <p className="mt-8 text-lg leading-8 text-gray-300">
            {movie.overview}
          </p>

          {/* Buttons */}
          <DetailActions />
        </motion.div>
      </div>
    </section>
  );
}