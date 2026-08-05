import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";

import { searchMovies } from "../../services/api";

export default function Navbar() {
  const navigate = useNavigate();
const [query, setQuery] = useState("");
const [results, setResults] = useState([]);
const [showDropdown, setShowDropdown] = useState(false);
const [selectedIndex, setSelectedIndex] = useState(-1);

const searchRef = useRef(null);
const clearSearch = () => {
  setQuery("");
  setResults([]);
  setShowDropdown(false);
  setSelectedIndex(-1);
};

useEffect(() => {
  function handleClickOutside(event) {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);
useEffect(() => {
  if (query.trim().length < 2) {
    setResults([]);
    setShowDropdown(false);
    return;
  }
  
 const timer = setTimeout(async () => {
    try {
      const data = await searchMovies(query);

      setResults((data.results || []).slice(0, 5));
      setSelectedIndex(-1);
      setShowDropdown(true);
    } catch (error) {
      console.error(error);
    }
  }, 300);

  return () => clearTimeout(timer);
}, [query]);
  const navLinkClass = ({ isActive }) =>
  `px-5 py-2.5 rounded-xl transition-all duration-300 ${
    isActive
      ? "bg-[#241538] text-purple-200 shadow-lg shadow-purple-950/30"
      : "text-gray-300 hover:bg-[#1A112A] hover:text-white"
  }`;
  return (
    <nav className="sticky top-0 z-50 flex justify-center px-4">
  <div className="w-full">

        <div className="bg-[#0B0A14]/75 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-900/20 px-8 py-5">

          <div className="flex items-center justify-between gap-8">

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/30 transition-transform duration-300 group-hover:scale-105">
                <span className="text-xl">🎬</span>
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  NovaFlick
                </h1>

                <p className="text-xs text-gray-400 -mt-1">
                  AI Movie Companion
                </p>
              </div>

            </NavLink>

            {/* Navigation */}
            <div className="hidden lg:flex items-center gap-6">

              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>

              <NavLink to="/discover" className={navLinkClass}>
                Discover
              </NavLink>

              <NavLink to="/favorites" className={navLinkClass}>
                Favorites
              </NavLink>

              <NavLink to="/watchlist" className={navLinkClass}>
                Watchlist
              </NavLink>

              <NavLink to="/recommendations" className={navLinkClass}>
                AI Picks
              </NavLink>

            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">

              {/* Search */}
              <div
  ref={searchRef}
  className="relative hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-72"
  
>

                <FaSearch className="text-gray-400" />

                <input
  type="text"
  placeholder="Search movies..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onFocus={() => {
  if (results.length > 0 && query.trim().length >= 2) {
    setShowDropdown(true);
  }
}}
  onKeyDown={(e) => {
  if (!showDropdown) {
    if (e.key === "Enter") {
  e.preventDefault();

  if (selectedIndex >= 0) {
    navigate(`/movie/${results[selectedIndex].id}`);
  } else if (query.trim()) {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  // Always clean up
  setShowDropdown(false);
  setSelectedIndex(-1);
  setResults([]);
  setQuery("");
}
    return;
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setSelectedIndex((prev) =>
      prev < results.length - 1 ? prev + 1 : 0
    );
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    setSelectedIndex((prev) =>
      prev > 0 ? prev - 1 : results.length - 1
    );
  }

  if (e.key === "Escape") {
    setShowDropdown(false);
    setSelectedIndex(-1);
  }

  if (e.key === "Enter") {
  e.preventDefault();

  if (selectedIndex >= 0) {
    clearSearch();
    navigate(`/movie/${results[selectedIndex].id}`);
  } else if (query.trim()) {
    clearSearch();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return;
}
}}
  className="bg-transparent outline-none text-sm text-white placeholder:text-gray-500 flex-1"
  
/>
{showDropdown && query.trim().length >= 2 && (
  <div className="absolute left-0 top-full mt-3 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#12101F] shadow-2xl shadow-purple-950/30">
    {results.length > 0 ? (
      <>
        {results.map((movie, index) => (
          <button
            key={movie.id}
            onClick={() => {
  clearSearch();
  navigate(`/movie/${movie.id}`);
}}
           className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
  selectedIndex === index
    ? "bg-purple-600/20"
    : "hover:bg-white/5"
}`}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                  : "https://placehold.co/92x138?text=No+Image"
              }
              alt={movie.title}
              className="h-16 w-11 rounded-md object-cover"
            />

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">
                {movie.title}
              </h3>

              <p className="text-xs text-gray-400">
                {movie.release_date?.slice(0, 4) || "Unknown"}
              </p>
            </div>
          </button>
        ))}

        <button
          onClick={() => {
  clearSearch();
  navigate(`/search?q=${encodeURIComponent(query)}`);
}}
          className="w-full border-t border-white/10 px-4 py-3 text-center text-sm font-medium text-purple-300 transition-colors hover:bg-white/5"
        >
          View all results →
        </button>
      </>
    ) : (
      <div className="px-4 py-6 text-center text-sm text-gray-400">
        No movies found.
      </div>
    )}
  </div>
)}

              </div>

              {/* Profile */}
              <button className="w-11 h-11 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center hover:bg-purple-500/25 transition-all duration-300">

                <FaUserCircle
                  size={24}
                  className="text-purple-300"
                />

              </button>

            </div>

          </div>

        </div>

      </div>
    </nav>
  );
}