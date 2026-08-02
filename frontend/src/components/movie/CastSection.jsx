import { useEffect, useState } from "react";
import { getMovieCredits } from "../../services/api";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w185";

export default function CastSection({ movieId }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCast() {
      try {
        const data = await getMovieCredits(movieId);
        setCast(data.cast.slice(0, 12));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-8 text-3xl font-bold text-white">
          Top Cast
        </h2>

        <div className="flex gap-6 overflow-x-auto">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-64 w-40 flex-shrink-0 animate-pulse rounded-2xl bg-zinc-900"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h2 className="mb-8 text-3xl font-bold text-white">
        Top Cast
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {cast.map((person) => (
          <div
            key={person.cast_id ?? person.id}
            className="w-40 flex-shrink-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-purple-500"
          >
            {person.profile_path ? (
              <img
                src={`${IMAGE_BASE}${person.profile_path}`}
                alt={person.name}
                className="h-56 w-full object-cover"
              />
            ) : (
              <div className="flex h-56 items-center justify-center bg-zinc-800 text-5xl">
                👤
              </div>
            )}

            <div className="p-4">
              <h3 className="line-clamp-2 font-semibold text-white">
                {person.name}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                {person.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}