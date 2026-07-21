export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-purple-700/10 to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-28">

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Discover your
          <br />
          <span className="text-purple-400">
            next favourite movie.
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-2xl">
          Your AI movie companion that helps you discover films you'll
          actually love—based on your taste, not endless scrolling.
        </p>

        <div className="mt-10 flex gap-4 flex-wrap">
          <button className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
            Explore Trending
          </button>

          <button className="px-6 py-3 rounded-xl border border-purple-500 hover:bg-purple-900/30 transition">
            Surprise Me
          </button>
        </div>

      </div>
    </section>
  );
}