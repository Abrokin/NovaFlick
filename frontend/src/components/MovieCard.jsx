import { Link } from "react-router-dom";


const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="group transition-transform duration-300 hover:-translate-y-2 hover:scale-105">
      <Link to={`/movie/${movie.id}`}>
        <div className="overflow-hidden rounded-2xl bg-[#17152B] border border-[#2F2B4A] shadow-lg">

          <div className="relative">

            <img
              src={poster}
              alt={movie.title}
              className="w-full h-[420px] object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

            <div className="absolute top-3 right-3 bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
              ⭐ {movie.vote_average?.toFixed(1)}
            </div>

          </div>

          <div className="p-5">

            <h3 className="text-white font-bold text-lg line-clamp-1">
              {movie.title}
            </h3>

            <p className="text-gray-400 text-sm mt-2">
              {movie.release_date?.slice(0, 4)}
            </p>

          </div>

        </div>
      </Link>
    </div>
  );
}