import { motion } from "framer-motion";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function Hero({ featuredMovie }) {
  if (!featuredMovie) return null;

  return (
    <section className="relative overflow-hidden pt-12 lg:pt-16">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-40 h-[500px] w-[500px] rounded-full bg-purple-700/20 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1450px] px-8 pt-6 pb-16 lg:px-12 xl:px-16">
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Left Side */}
          <motion.div
          
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 text-sm text-purple-300 backdrop-blur">
              ✨ AI Powered Recommendations
            </div>

            <h1 className="mt-6 text-5xl font-black leading-[0.9] tracking-tight md:text-6xl lg:text-7xl">
              Discover your
              <span className="block text-purple-400">
                next favourite movie.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-gray-300 md:text-xl">
              Your AI movie companion that understands your taste and recommends
              films you'll actually love—no endless scrolling, just better
              discoveries.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-purple-600 px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-purple-500">
                Explore Trending
              </button>

              <button className="rounded-2xl border border-purple-500/40 bg-white/5 px-8 py-4 text-lg font-semibold backdrop-blur transition-all duration-300 hover:border-purple-400 hover:bg-purple-500/10">
                Surprise Me
              </button>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative -mt-4 w-full max-w-md lg:-mt-8">
              {/* Glow */}
              <div className="absolute inset-0 scale-95 rounded-[32px] bg-purple-600/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(168,85,247,0.15)] backdrop-blur-xl">
                <div className="border-b border-white/10 p-6">
                  <span className="text-xs uppercase tracking-[0.3em] text-purple-400">
                    🤖 AI Pick of the Day
                  </span>
                </div>

                <img
                  src={`${IMAGE_BASE}${featuredMovie.poster_path}`}
                  alt={featuredMovie.title}
                  className="h-[420px] w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="text-3xl font-bold text-white">
                    {featuredMovie.title}
                  </h2>

                  <div className="mt-4 flex items-center gap-5 text-gray-300">
                    <span>⭐ {featuredMovie.vote_average.toFixed(1)}</span>
                    <span>📅 {featuredMovie.release_date?.slice(0, 4)}</span>
                  </div>

                  <div className="mt-5 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-4">
                    <p className="text-sm uppercase tracking-widest text-purple-300">
                      WHY AI PICKED THIS
                    </p>

                    <p className="mt-3 leading-7 text-gray-300">
                      Perfect if you enjoy epic adventures, strong characters,
                      and immersive cinematic worlds.
                    </p>
                  </div>

                  <button className="mt-5 w-full rounded-2xl bg-purple-600 py-4 text-lg font-semibold transition hover:bg-purple-500">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}