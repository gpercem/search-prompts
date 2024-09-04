'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialQuery = searchParams.get('q');
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [searchParams]);

  const handleSearch = async (searchQuery) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="relative flex justify-center mb-8">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search among 200+ prompts!"
            className="bg-gray-800 rounded-full py-2 px-4 pr-10 border border-gray-400 w-full"
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
            🔍
          </button>
        </div>
      </form>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((prompt) => (
            <Link href={`/prompt/${prompt.post_id}`} key={prompt.post_id}>
              <div className="border border-gray-400 rounded-lg p-4 hover:bg-gray-800 transition-colors">
                <h3 className="text-lg font-semibold mb-2">{prompt.title}</h3>
                <p className="text-sm mb-2">{prompt.description.substring(0, 100)}...</p>
                <p className="text-xs text-gray-500">Likes: {prompt.likes}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No results found. Try a different search term.</p>
      )}
    </>
  );
}
