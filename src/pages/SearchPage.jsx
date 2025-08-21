import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import MovieDetailModal from "../components/MovieDetailModal";
import { searchMovies } from "../api/omdb";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 500);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    let cancelled = false;
    if (!debounced) {
      setResults([]);
      setTotal(0);
      setError("");
      return;
    }
    setLoading(true);
    setError("");
    searchMovies(debounced)
      .then(({ results, total, error }) => {
        if (cancelled) return;
        setResults(results);
        setTotal(total);
        setError(error || "");
      })
      .catch(() => !cancelled && setError("Network error"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  const emptyState = useMemo(
    () => !loading && !error && debounced && results.length === 0,
    [loading, error, debounced, results]
  );

  return (
    <div className="page-container">
      <h1 className="page-title">Movie Search</h1>

      <div className="search-wrapper">
        <div className="search-bar-container">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      <div className="status-text">
        {loading && <p className="status-text loading">Searching…</p>}
        {error && <p className="status-text error">{error}</p>}
        {emptyState && (
          <p className="status-text empty">
            No movies found for “{debounced}”.
          </p>
        )}
        {total > 0 && (
          <p className="status-text total">Found {total} results</p>
        )}
      </div>

      <div className="movie-grid">
        {results.map((m) => (
          <MovieCard key={m.imdbID} movie={m} onOpen={setOpenId} />
        ))}
      </div>

      <MovieDetailModal
        imdbID={openId}
        open={Boolean(openId)}
        onClose={() => setOpenId(null)}
      />
    </div>
  );
}
