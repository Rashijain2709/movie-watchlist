export default function SearchBar({ value, onChange, placeholder = "Search movies..." }) {
  return (
    <input
      className="w-full border border-gray-300 rounded-full px-6 py-3 bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-green-400 transition-all duration-200 text-lg placeholder-gray-400"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search movies"
    />
  );
}