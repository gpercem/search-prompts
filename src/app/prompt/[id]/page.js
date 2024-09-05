import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import SearchForm from '../../components/SearchForm';
import Footer from '../../components/Footer';
import LikeDislikeButtons from '../../components/LikeDislikeButtons';
import { getPromptById } from '../../lib/getPrompt';
import { getAuthorName } from '../../lib/getAuthorName';
import PromptPageClient from './PromptPageClient';

export default async function PromptPage({ params }) {
  const { id } = params;
  const prompt = await getPromptById(id);

  if (!prompt) {
    notFound();
  }

  const authorName = await getAuthorName(prompt.author);

  return <PromptPageClient prompt={prompt} authorName={authorName} />;
}