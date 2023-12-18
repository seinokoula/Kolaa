'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="mt-6 flex items-center gap-x-6">
      <input
        type="text"
        placeholder="Rechercher..."
        className="p-2 border border-gray-300 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        onClick={handleSearch}
      >
        Rechercher
      </button>
    </div>
  );
};

export default SearchBar;
