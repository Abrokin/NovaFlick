import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navLink =
    "transition-colors duration-200 hover:text-purple-400";

  const activeLink = "text-purple-400 font-semibold";

  return (
    <nav className="sticky top-0 z-50 bg-gray-950 border-b border-purple-900 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-3xl font-extrabold text-purple-500 tracking-wide"
        >
          NovaFlick
        </Link>

        <div className="flex items-center gap-6 text-gray-200">
          <Link
            to="/"
            className={`${navLink} ${
              location.pathname === "/" ? activeLink : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/recommendations"
            className={`${navLink} ${
              location.pathname === "/recommendations" ? activeLink : ""
            }`}
          >
            Recommendations
          </Link>

          <Link
            to="/favorites"
            className={`${navLink} ${
              location.pathname === "/favorites" ? activeLink : ""
            }`}
          >
            Favorites
          </Link>

          <Link
            to="/watchlist"
            className={`${navLink} ${
              location.pathname === "/watchlist" ? activeLink : ""
            }`}
          >
            Watchlist
          </Link>

          <Link
            to="/profile"
            className={`${navLink} ${
              location.pathname === "/profile" ? activeLink : ""
            }`}
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}