import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { siteConfig } from '@/config/site';

export default function Contact() {
  return (
    <main className="bg-black text-white min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <Header />

        <section className="mb-8 mt-8 border border-gray-400 rounded-lg pt-8 pb-8 pl-4 pr-4 md:pl-6 md:pr-6 lg:pl-12 lg:pr-12">
          <h2 className="text-xl md:text-2xl mb-6 text-center">Connect with Me</h2>
          <div className="flex justify-center space-x-6">
            <a href={siteConfig.socialLinks.github} target="_blank" rel="noopener noreferrer" 
               className="flex items-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              <FaGithub className="mr-2" />
              GitHub
            </a>
            <a href={siteConfig.socialLinks.linkedin}  target="_blank" rel="noopener noreferrer" 
               className="flex items-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
              <FaLinkedin className="mr-2" />
              LinkedIn
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}