import { SearchBarProps } from '@/types/types';

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      className="border p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
    />
  );
}