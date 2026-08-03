import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-zinc-950 px-6 pt-32 pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Search Movies
        </h1>

        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
        />
      </div>
    </div>
  );
}