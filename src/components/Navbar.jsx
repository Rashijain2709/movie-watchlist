import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-title" onClick={() => navigate("/")}>Movie Watchlist</div>
      <div className="navbar-links">
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/watchlist">Watchlist</NavLink>
      </div>
    </nav>
  );
}
