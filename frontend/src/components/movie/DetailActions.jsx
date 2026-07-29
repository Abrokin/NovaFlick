import { Heart, Bookmark } from "lucide-react";

export default function DetailActions() {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 font-semibold text-white transition hover:scale-105">
        <Heart size={18} />
        Favorite
      </button>

      <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-purple-500/40 hover:bg-purple-500/10">
        <Bookmark size={18} />
        Watchlist
      </button>
    </div>
  );
}