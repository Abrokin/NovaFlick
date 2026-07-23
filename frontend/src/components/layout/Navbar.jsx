import { NavLink } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
  `px-5 py-2.5 rounded-xl transition-all duration-300 ${
    isActive
      ? "bg-[#241538] text-purple-200 shadow-lg shadow-purple-950/30"
      : "text-gray-300 hover:bg-[#1A112A] hover:text-white"
  }`;
  return (
    <nav className="sticky top-0 z-50 flex justify-center py-4 px-4">
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
              <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-72">

                <FaSearch className="text-gray-400" />

                <input
                  type="text"
                  placeholder="Search movies..."
                  className="bg-transparent outline-none text-sm text-white placeholder:text-gray-500 flex-1"
                />

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