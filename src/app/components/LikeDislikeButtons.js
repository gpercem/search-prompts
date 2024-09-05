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
    if (user) {
      setLiked(likes.includes(user.uid));
      setDisliked(dislikes.includes(user.uid));
    }
  }, [likes, dislikes, user]);

  const handleReaction = async (action) => {
    if (!user) {
      alert('You need to be logged in to perform this action.');
      return;
    }

    try {
      const idToken = await user.getIdToken();
      console.log('Sending reaction:', action, 'for post:', postId, 'by user:', user.uid);
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

      setLikes(result.likes);
      setDislikes(result.dislikes);
    } catch (error) {
      console.error('Error updating reaction:', error);
    }
  };

  return (
    <div className="flex space-x-4">
      <button 
        onClick={() => handleReaction('like')} 
        className={`px-4 py-2 rounded ${liked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
      >
        👍 {likes.length}
      </button>
      <button 
        onClick={() => handleReaction('dislike')} 
        className={`px-4 py-2 rounded ${disliked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
      >
        👎 {dislikes.length}
      </button>
    </div>
  );
}