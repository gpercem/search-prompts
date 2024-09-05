'use client';

import React from 'react';
import Link from 'next/link';
import SuggestionsDisplay from './SuggestionsDisplay';

const SuggestionsSection = ({ initialSuggestions }) => {
  return (
    <section className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Suggestions</h2>
      </div>
      <SuggestionsDisplay suggestions={initialSuggestions.topLiked} />
      
      <div className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-2xl font-bold">Recent Prompts</h2>
      </div>
      <SuggestionsDisplay suggestions={initialSuggestions.mostRecent} />
    </section>
  );
};

export default SuggestionsSection;