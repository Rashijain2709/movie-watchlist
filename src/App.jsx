import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import WatchlistPage from "./pages/WatchlistPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/" replace />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>
    </div>
  );
}