export default function MovieCard({ movie }) {
  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#1c1c1c",
        color: "white",
        transition: "transform 0.2s",
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{
          width: "100%",
          display: "block",
        }}
      />

      <div style={{ padding: "10px" }}>
        <h3
          style={{
            fontSize: "16px",
            marginBottom: "8px",
          }}
        >
          {movie.title}
        </h3>

        <p>⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
}