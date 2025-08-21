import { useWatchlist } from "../context/WatchlistContext";

const FALLBACK_POSTER = "https://via.placeholder.com/300x445?text=No+Poster";

export default function MovieCard({ movie, onOpen, hideAddButton = false }) {
  const { addMovie, removeMovie, inWatchlist } = useWatchlist();
  const isSaved = inWatchlist(movie.imdbID);

  return (
    <div className="movie-card-wrapper">
      <img
        src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER}
        alt={movie.Title}
        className="movie-card-poster"
        loading="lazy"
      />

      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.Title}</h3>
        <p className="movie-card-year"><strong>Release Year:</strong> {movie.Year}</p>

        <div className="movie-card-buttons">
          {!hideAddButton && (
            <button
              className={`btn btn-green`}
              onClick={() => (isSaved ? null : addMovie(movie))}
              disabled={isSaved}
            >
              {isSaved ? "Added" : "Add to Watchlist"}
            </button>
          )}

          <button
            className="btn btn-blue"
            onClick={() => onOpen?.(movie.imdbID)}
          >
            Details
          </button>

          {isSaved && (
            <button
              className="btn btn-red"
              onClick={() => removeMovie(movie.imdbID)}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
