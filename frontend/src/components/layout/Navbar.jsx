import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0B0A14]/80 border-b border-[#2F2B4A]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl">🎬</span>

          <span className="text-2xl font-bold text-purple-400">
            NovaFlick
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-gray-300">

          <Link to="/" className="hover:text-purple-400 transition">
            Home
          </Link>

          <Link to="/discover" className="hover:text-purple-400 transition">
            Discover
          </Link>

          <Link to="/favorites" className="hover:text-purple-400 transition">
            Favorites
          </Link>

          <Link to="/watchlist" className="hover:text-purple-400 transition">
            Watchlist
          </Link>

          <Link to="/recommendations" className="hover:text-purple-400 transition">
            AI Picks
          </Link>

        </div>

        <div className="flex items-center gap-5">

          <FaSearch
            size={20}
            className="text-gray-300 hover:text-purple-400 cursor-pointer transition"
          />

          <FaUserCircle
            size={28}
            className="text-purple-400 cursor-pointer"
          />

        </div>

      </div>
    </nav>
  );
}