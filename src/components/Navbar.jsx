import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">Movie Watchlist</div>
      <div className="navbar-links">
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/watchlist">Watchlist</NavLink>
      </div>
    </nav>
  );
}
