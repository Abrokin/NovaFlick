import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Trending Movies
export const getTrendingMovies = async () => {
  const response = await api.get("/movies/trending");
  return response.data;
};

// Movie Details
export const getMovieDetails = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};
export async function getMovieCredits(movieId) {
  const response = await api.get(`/movies/${movieId}/credits`);
  return response.data;
}
// Search Movies
export const searchMovies = async (query, page = 1) => {
  const response = await api.get("/movies/search", {
    params: {
      query,
      page,
    },
  });

  return response.data;
};
export async function getGenres() {
  const { data } = await api.get("/movies/genres");
  return data;
}
export async function discoverMovies(params = {}) {
  const { data } = await api.get("/movies/discover", {
    params,
  });

  return data;
}
export const getAIPicks = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      results: [],
      reason: "Sign in to get personalized AI recommendations",
    };
  }

  const response = await api.get("/recommendations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default api;
