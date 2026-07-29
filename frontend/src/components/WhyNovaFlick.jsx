import { Brain, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI Recommendations",
    description:
      "Get movie suggestions tailored to your taste instead of endless scrolling.",
  },
  {
    icon: Heart,
    title: "Save Favorites",
    description:
      "Build your personal collection and never lose track of great movies.",
  },
  {
    icon: Sparkles,
    title: "Discover Faster",
    description:
      "Explore trending films, hidden gems, and new releases in one place.",
  },
];

export default function WhyNovaFlick() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
          Why NovaFlick
        </p>

        <h2 className="mt-4 text-4xl font-bold text-white">
          Your AI movie companion
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Discover movies with intelligent recommendations, personalized
          collections, and a beautiful browsing experience.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-white/10 bg-[#17152B]/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_25px_60px_rgba(139,92,246,0.2)]"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600">
              <Icon size={28} className="text-white" />
            </div>

            <h3 className="text-xl font-semibold text-white">
              {title}
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}