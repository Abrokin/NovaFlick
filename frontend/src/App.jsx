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
            </Routes>
        </BrowserRouter>
    );
}

export default App;