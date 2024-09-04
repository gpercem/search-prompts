'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase/config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';

const MODEL_NAMES = [
  'ChatGPT-3.5',
  'ChatGPT-4',
  'Claude-3-Opus',
  'Claude-3-Sonnet',
  'GPT-3',
  'DALL-E 3',
  'Midjourney',
  'Stable Diffusion',
];

export default function CreatePrompt() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [modelName, setModelName] = useState(MODEL_NAMES[0]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const router = useRouter();
  const recaptchaRef = useRef(null);

  useEffect(() => {
    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setRecaptchaLoaded(true);
      };
      document.body.appendChild(script);
    };

    if (typeof window !== 'undefined') {
      loadRecaptcha();
    }

    return () => {
      // Clean up script tag on unmount
      const script = document.querySelector(`script[src^="https://www.google.com/recaptcha/api.js"]`);
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const executeRecaptcha = useCallback(() => {
    if (!window.grecaptcha) {
      console.error('reCAPTCHA not loaded');
      return Promise.reject(new Error('reCAPTCHA not loaded'));
    }
    return window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {action: 'submit'});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    if (!user) {
      setMessage('You must be logged in to create a prompt.');
      setIsSubmitting(false);
      return;
    }

    if (!user.emailVerified) {
      setMessage('Please verify your email before creating a prompt.');
      setIsSubmitting(false);
      return;
    }

    try {
      let recaptchaToken = '';
      if (recaptchaLoaded) {
        recaptchaToken = await executeRecaptcha();
      } else {
        console.warn('reCAPTCHA not loaded, proceeding without verification');
      }

      const idToken = await user.getIdToken(true);  // Force refresh the token
      console.log('Token generated:', idToken.substring(0, 10) + '...');

      const response = await fetch('/api/create-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          title,
          prompt: content,
          description,
          modelName,
          recaptchaToken
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create prompt');
      }

      setMessage('Prompt created successfully!');
      // Use the postId from the response for redirection
      router.push(`/prompt/${data.postId}`);
    } catch (error) {
      console.error('Error details:', error);
      setMessage('Error creating prompt: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendVerificationEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setMessage('Verification email sent. Please check your inbox.');
    } catch (error) {
      setMessage('Error sending verification email: ' + error.message);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <Header />

        <section className="mb-8 mt-8 border border-gray-400 rounded-lg pt-8 pb-8 pl-4 pr-4 md:pl-6 md:pr-6 lg:pl-12 lg:pr-12">
          <h2 className="text-xl md:text-2xl mb-4 text-center">Create a Prompt</h2>
          {!user && (
            <p className="text-center mb-4">You must be logged in to create a prompt.</p>
          )}
          {user && !user.emailVerified && (
            <div className="bg-yellow-800 text-yellow-200 p-4 rounded-lg mb-6">
              <p className="mb-2">Your email is not verified. Please verify your email to create prompts.</p>
              <button
                onClick={handleSendVerificationEmail}
                className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
              >
                Send Verification Email
              </button>
            </div>
          )}
          {user && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">Prompt Content</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white h-32"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white h-24"
                  required
                />
              </div>
              <div>
                <label htmlFor="modelName" className="block text-sm font-medium mb-2">Model Name</label>
                <select
                  id="modelName"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  required
                >
                  {MODEL_NAMES.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              {message && <div className="text-center text-yellow-400">{message}</div>}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                disabled={isSubmitting || !user.emailVerified}
              >
                {isSubmitting ? 'Creating...' : 'Create Prompt'}
              </button>
            </form>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}