'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function SuggestionsDisplay({ suggestions }) {
    return (
      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
        {suggestions.map((suggestion, index) => (
          <SuggestionCard key={index} suggestion={suggestion} />
        ))}
      </div>
    );
}

function SuggestionCard({ suggestion }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const descriptionRef = useRef(null);
    const [showExpandButton, setShowExpandButton] = useState(false);

    useEffect(() => {
        if (descriptionRef.current) {
            setShowExpandButton(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
        }
    }, [suggestion.description]);

    return (
      <Link href={`/prompt/${suggestion.post_id}`} className="block">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-400 hover:border-blue-400 transition-colors duration-200">
          <h4 className="font-semibold">{suggestion.title}</h4>
          <p 
            ref={descriptionRef}
            className={`text-gray-400 text-sm mt-2 ${isExpanded ? '' : 'line-clamp-3'}`}
          >
            {suggestion.description}
          </p>
          {showExpandButton && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }}
              className="text-blue-400 text-sm mt-1"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2">
              <span>❤️ {suggestion.likes.length}</span>
              <span>😔 {suggestion.dislikes.length}</span>
            </div>
          </div>
        </div>
      </Link>
    );
}