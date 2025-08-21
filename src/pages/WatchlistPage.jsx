import MovieCard from "../components/MovieCard";
import MovieDetailModal from "../components/MovieDetailModal";
import { useState } from "react";
import { useWatchlist } from "../context/WatchlistContext";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();
  const [openId, setOpenId] = useState(null);

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
            <MovieCard key={m.imdbID} movie={m} onOpen={setOpenId} />
          ))}

          <MovieDetailModal
            imdbID={openId}
            open={Boolean(openId)}
            onClose={() => setOpenId(null)}
          />
        </div>
      )}
    </div>
  );
}
