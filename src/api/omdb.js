const BASE = "https://www.omdbapi.com/";

export async function searchMovies(query, page = 1) {
  const url = `${BASE}?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`;
  console.log("Fetching URL:", url); // 👈 add this
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === "False") {
    // OMDb returns { Response: "False", Error: "Movie not found!" }
    return { results: [], total: 0, error: data.Error || "No results" };
  }
  return { results: data.Search || [], total: Number(data.totalResults || 0), error: "" };
}

export async function getMovieById(imdbID) {
  const url = `${BASE}?apikey=${import.meta.env.VITE_OMDB_KEY}&i=${imdbID}&plot=full`;
  console.log("Loaded OMDb Key:", import.meta.env.VITE_OMDB_KEY);
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "Failed to load movie");
  return data;
}
