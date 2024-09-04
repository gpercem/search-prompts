import { Suspense } from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import SearchResults from './SearchResults';
import Footer from '../components/Footer';

export default function SearchPage() {
  return (
    <main className="bg-black text-white min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <Header />


        <section className="mb-8 mt-8 border border-gray-400 rounded-lg pt-8 pb-8 pl-4 pr-4 md:pl-6 md:pr-6 lg:pl-12 lg:pr-12">
          <h2 className="text-xl md:text-2xl mb-4 text-center">Search Results</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
          </Suspense>
        </section>

        <Footer />
      </div>
    </main>
  );
}