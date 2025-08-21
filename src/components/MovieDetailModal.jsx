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
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center bg-green-600 text-white p-4">
          <h3 className="font-semibold">{movie?.Title || "Movie details"}</h3>
          <button
            className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="p-6">
          {loading && <p>Loading…</p>}
          {error && <p className="text-red-600">{error}</p>}
          {movie && (
            <div className="grid md:grid-cols-3 gap-4">
              <img
                className="w-full h-64 object-cover md:col-span-1 rounded-xl"
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Poster"}
                alt={movie.Title}
              />
              <div className="md:col-span-2 space-y-2">
                <p><strong>Year:</strong> {movie.Year}</p>
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
