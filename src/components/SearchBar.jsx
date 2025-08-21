export default function SearchBar({ value, onChange, placeholder = "Search movies..." }) {
  return (
    <input
      className="search-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search movies"
    />
  );
}
