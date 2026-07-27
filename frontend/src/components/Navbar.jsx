import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Recommendations", path: "/recommendations" },
    { name: "Favorites", path: "/favorites" },
    { name: "Watchlist", path: "/watchlist" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <header className="sticky top-5 z-50 px-6">
      <nav className="mx-auto flex max-w-[1450px] items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/70 px-8 py-4 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide text-white transition duration-300 hover:text-purple-400"
        >
          <span className="text-purple-500">Nova</span>Flick
        </Link>

        <div className="flex items-center gap-2">
          {links.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-xl px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}