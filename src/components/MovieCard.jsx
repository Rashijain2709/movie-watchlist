import { useWatchlist } from "../context/WatchlistContext";

const FALLBACK_POSTER = "https://via.placeholder.com/300x445?text=No+Poster";

export default function MovieCard({ movie, onOpen }) {
  const { addMovie, removeMovie, inWatchlist } = useWatchlist();
  const isSaved = inWatchlist(movie.imdbID);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col md:flex-row gap-4 p-4">
      {/* Poster */}
      <img
        src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER}
        alt={movie.Title}
        className="w-28 h-40 object-cover rounded-xl shadow-sm"
        loading="lazy"
      />

      {/* Content */}
      <div className="flex flex-col flex-1">
        <h3 className="font-bold text-lg text-gray-900">{movie.Title}</h3>
        <p className="text-sm text-gray-500 mb-3">{movie.Year}</p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mt-auto">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              isSaved
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-600 text-white shadow-md hover:shadow-lg hover:scale-105"
            }`}
            onClick={() => (isSaved ? null : addMovie(movie))}
            disabled={isSaved}
          >
            {isSaved ? "Added" : "Add to Watchlist"}
          </button>

          <button
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
            onClick={() => onOpen?.(movie.imdbID)}
          >
            Details
          </button>

          {isSaved && (
            <button
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
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
