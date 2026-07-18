import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-red-600">
        NovaFlick
      </h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/recommendations">Recommendations</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}