import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("watchlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } catch {
      console.error("Failed to save watchlist to localStorage");
    }
  }, [watchlist]);

  const addMovie = (movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.imdbID === movie.imdbID)) {
        alert("This movie is already in your watchlist!");
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeMovie = (imdbID) => {
    setWatchlist((prev) => prev.filter((m) => m.imdbID !== imdbID));
  };

  const inWatchlist = (imdbID) => watchlist.some((m) => m.imdbID === imdbID);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addMovie, removeMovie, inWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used within WatchlistProvider");
  return ctx;
};
