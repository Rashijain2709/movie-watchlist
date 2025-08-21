import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../context/WatchlistContext";
import "../index.css"; // Import the CSS file

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  return (
    <div className="page-container">
      <h2 className="page-title">My Watchlist</h2>

      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <p className="text-lg">Your watchlist is empty</p>
          <p className="text-sm">
            Search and add movies to build your collection.
          </p>
        </div>
      ) : (
        <div className="movie-grid">
          {watchlist.map((m) => (
            <MovieCard key={m.imdbID} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
}
