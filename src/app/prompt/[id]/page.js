import { sql } from '@vercel/postgres';
import Header from '../../components/Header';
import SearchForm from '../../components/SearchForm';
import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';
import firebaseAdmin from '../../../firebaseAdmin';
import LikeDislikeButtons from '../../components/LikeDislikeButtons';
import { getPromptById } from '../../lib/getPrompt';

async function getAuthorName(uid) {
  try {
    const userRecord = await firebaseAdmin.auth().getUser(uid);
    return userRecord.displayName || 'Anonymous';
  } catch (error) {
    console.error('Failed to fetch author name:', error);
    return 'Anonymous';
  }
}

export default async function PromptPage({ params, searchParams }) {
  const { id } = params;
  const idToken = searchParams.token;
  let userId = null;

  console.log("ID Token:", idToken); // Add logging to debug

  if (idToken) {
    try {
      const response = await fetch('/api/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        userId = data.userId;
        console.log("User ID:", userId); // Add logging to debug
      } else {
        console.error('Error verifying token:', await response.text());
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  }

  const prompt = await getPromptById(id, userId);

  if (!prompt) {
    notFound();
  }

  const authorName = await getAuthorName(prompt.author);

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
              <span className="font-bold">Views:</span> {prompt.views}
            </div>
            <div>
              <span className="font-bold">Model:</span> {prompt.model_name}
            </div>
          </div>
          <LikeDislikeButtons 
            postId={prompt.post_id} 
            initialLikes={prompt.likes} 
            initialDislikes={prompt.dislikes} 
            userLiked={prompt.userLiked}
            userDisliked={prompt.userDisliked}
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