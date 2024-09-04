"use client";


import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function LikeDislikeButtons({ postId, initialLikes, initialDislikes, userLiked, userDisliked }) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [liked, setLiked] = useState(userLiked);
  const [disliked, setDisliked] = useState(userDisliked);
  const { user } = useAuth();

  useEffect(() => {
    console.log('Initial likes:', initialLikes);
    console.log('Initial dislikes:', initialDislikes);
    console.log('User liked:', userLiked);
    console.log('User disliked:', userDisliked);

    setLikes(initialLikes);
    setDislikes(initialDislikes);
    setLiked(userLiked);
    setDisliked(userDisliked);
  }, [initialLikes, initialDislikes, userLiked, userDisliked]);

  const handleReaction = async (action) => {
    if (!user) {
      alert('You need to be logged in to perform this action.');
      return;
    }

    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/update-post-reaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ postId, action })
      });

      if (!response.ok) {
        throw new Error('Failed to update reaction');
      }

      const result = await response.json();
      console.log('Updated likes:', result.likes);
      console.log('Updated dislikes:', result.dislikes);

      setLikes(result.likes);
      setDislikes(result.dislikes);

      if (action === 'like') {
        setLiked(!liked);
        setDisliked(false);
      } else if (action === 'dislike') {
        setDisliked(!disliked);
        setLiked(false);
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
    }
  };

  return (
    <div className="flex space-x-4">
      <button 
        onClick={() => handleReaction('like')} 
        className={`px-4 py-2 rounded ${liked ? 'bg-blue-500' : 'bg-gray-500'}`}
      >
        👍 {likes.length}
      </button>
      <button 
        onClick={() => handleReaction('dislike')} 
        className={`px-4 py-2 rounded ${disliked ? 'bg-red-500' : 'bg-gray-500'}`}
      >
        👎 {dislikes.length}
      </button>
    </div>
  );
}