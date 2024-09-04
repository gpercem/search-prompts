'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchForm({ fullWidth = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex justify-center ${fullWidth ? 'w-full' : ''}`}>
      <div className={`relative ${fullWidth ? 'w-full' : 'w-full md:w-1/2'}`}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search among 200+ prompts!"
          className="bg-gray-800 rounded-full py-2 px-4 pr-10 border border-gray-400 w-full"
        />
        <button 
          type="submit" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          🔍
        </button>
      </div>
    </form>
  );
}
