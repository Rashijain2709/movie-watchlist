import { useEffect, useState } from "react";
import { getMovieById } from "../api/omdb";

export default function MovieDetailModal({ imdbID, open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !imdbID) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    setMovie(null);

    getMovieById(imdbID)
      .then((d) => !cancelled && setMovie(d))
      .catch((e) => !cancelled && setError(e.message || "Failed to load"))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [open, imdbID]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{movie?.Title || "Movie details"}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modal-body">
          {loading && <p>Loading…</p>}
          {error && <p className="modal-error">{error}</p>}
          {movie && (
            <div className="modal-content-grid">
              <img
                className="modal-poster"
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x445?text=No+Poster"
                }
                alt={movie.Title}
              />
              <div className="modal-details">
                <p><strong>Release Year:</strong> {movie.Year}</p>
                <p><strong>Genre:</strong> {movie.Genre}</p>
                <p><strong>Runtime:</strong> {movie.Runtime}</p>
                <p><strong>Director:</strong> {movie.Director}</p>
                <p><strong>Actors:</strong> {movie.Actors}</p>
                <p><strong>Plot:</strong> {movie.Plot}</p>
                <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
