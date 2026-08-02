const formatCurrency = (value) => {
  if (!value) return "Unknown";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function MovieInfo({ movie }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        {/* Left */}
        <div>
          <h2 className="mb-5 text-3xl font-bold text-white">
            Overview
          </h2>

          <p className="leading-8 text-zinc-300">
            {movie.overview || "No overview available."}
          </p>
        </div>

        {/* Right */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm">
          <h3 className="mb-6 text-xl font-semibold text-white">
            Details
          </h3>

          <div className="space-y-5">
            <InfoRow
              label="Release Date"
              value={movie.release_date || "Unknown"}
            />

            <InfoRow
              label="Runtime"
              value={
                movie.runtime
                  ? `${movie.runtime} min`
                  : "Unknown"
              }
            />

            <InfoRow
              label="Status"
              value={movie.status || "Unknown"}
            />

            <InfoRow
              label="Original Language"
              value={movie.original_language?.toUpperCase()}
            />

            <InfoRow
              label="Budget"
              value={formatCurrency(movie.budget)}
            />

            <InfoRow
              label="Revenue"
              value={formatCurrency(movie.revenue)}
            />
          </div>
        </div>
      </div>

      {/* Genres */}
      {movie.genres?.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-5 text-3xl font-bold text-white">
            Genres
          </h2>

          <div className="flex flex-wrap gap-3">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 text-sm font-medium text-purple-300 transition hover:bg-purple-500/20"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-zinc-800 pb-3">
      <span className="text-zinc-400">{label}</span>

      <span className="text-right font-medium text-white">
        {value || "Unknown"}
      </span>
    </div>
  );
}