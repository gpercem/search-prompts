'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Header from '../../components/Header';
import SearchForm from '../../components/SearchForm';
import Footer from '../../components/Footer';
import LikeDislikeButtons from '../../components/LikeDislikeButtons';

export default function PromptPageClient({ prompt, authorName }) {
  const { user, loading } = useAuth();
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setUserLiked(Array.isArray(prompt.likes) && prompt.likes.includes(user.uid));
      setUserDisliked(Array.isArray(prompt.dislikes) && prompt.dislikes.includes(user.uid));
    }
  }, [user, loading, prompt.likes, prompt.dislikes]);

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <main className="bg-black text-white min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <Header />
        <SearchForm fullWidth={true} />
        <article className="mt-8 border border-gray-400 rounded-lg p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{prompt.title}</h1>
          <p className="text-gray-300 mb-4">{prompt.description}</p>
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h2 className="text-xl mb-2">Prompt:</h2>
            <p className="font-mono">{prompt.prompt}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <span className="font-bold">Model:</span> {prompt.model_name}
            </div>
          </div>
          <LikeDislikeButtons 
            postId={prompt.post_id} 
            initialLikes={prompt.likes} 
            initialDislikes={prompt.dislikes} 
            userLiked={userLiked}
            userDisliked={userDisliked}
          />
          <div className="text-sm text-gray-400 mt-4">
            <p>Author: {authorName}</p>
            <p>Created: {new Date(prompt.created_at).toLocaleString()}</p>
            <p>Last edited: {new Date(prompt.edited_at).toLocaleString()}</p>
          </div>
        </article>
        <Footer />
      </div>
    </main>
  );
}