'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { siteConfig } from '@/config/site';

const menuItems = [
  { name: 'Contact', path: '/contact' },
  { name: 'Create Prompt', path: '/create-prompt' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAccountPopupOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAccountPopupOpen && !event.target.closest('.account-popup')) {
        setIsAccountPopupOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountPopupOpen]);

  return (
    <>
      <header className="flex justify-between items-center mb-6 relative">
        <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
        {siteConfig.website.name}
        </Link>
        <nav className="hidden md:block">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.path}>
              <button className="mx-2 px-3 py-1 border border-gray-400 rounded">
                {item.name}
              </button>
            </Link>
          ))}
          {user ? (
            <button 
              onClick={() => setIsAccountPopupOpen(!isAccountPopupOpen)} 
              className="mx-2 px-3 py-1 border border-gray-400 rounded"
            >
              Account
            </button>
          ) : (
            <Link href="/authentication">
              <button className="mx-2 px-3 py-1 border border-gray-400 rounded">
                Log in
              </button>
            </Link>
          )}
        </nav>
        <button 
          className="text-3xl md:hidden z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Account Popup */}
        {isAccountPopupOpen && user && (
          <div className="account-popup absolute right-0 top-12 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
            <div className="p-4">
              <p className="text-sm mb-2">Signed in as:</p>
              <p className="font-bold mb-4">{user.displayName || user.email}</p>
              <button 
                onClick={handleSignOut}
                className="w-full text-left px-3 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <nav className={`fixed left-0 right-0 top-0 h-auto bg-gray-900 p-4 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          {menuItems.map((item, index) => (
            <Link key={index} href={item.path} className="block w-full mb-2">
              <button 
                className="w-full text-left px-3 py-2 border border-gray-400 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </button>
            </Link>
          ))}
          {user ? (
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                setIsAccountPopupOpen(!isAccountPopupOpen);
              }} 
              className="w-full text-left px-3 py-2 border border-gray-400 rounded mb-2"
            >
              Account
            </button>
          ) : (
            <Link href="/authentication" className="block w-full mb-2">
              <button 
                className="w-full text-left px-3 py-2 border border-gray-400 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </button>
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}