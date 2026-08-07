import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import Recommendations from "./pages/Recommendations";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/Profile";
import Navbar from "./components/layout/Navbar";
import SearchResults from "./pages/SearchResults";
import Discover from "./pages/Discover";
import AIPicks from "./pages/AIPicks";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/ai-picks" element={<AIPicks />} />
                <Route
  path="/discover"
  element={<Discover />}
/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;