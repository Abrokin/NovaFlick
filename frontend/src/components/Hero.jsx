import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-purple-700/10 to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-28">

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight"
        >
          Discover your
          <br />

          <span className="text-purple-400">
            next favourite movie.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg text-gray-300 max-w-2xl"
        >
          Your AI movie companion that helps you discover films you'll
          actually love—based on your taste, not endless scrolling.
        </motion.p>

        <div className="mt-10 flex flex-wrap gap-4">

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