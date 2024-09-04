"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

export default function Authentication() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', or 'forgot'

  const handleExit = (e, path) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => router.push(path), 500);
  };

  const renderForm = () => {
    switch (authMode) {
      case 'login':
        return <LoginForm />;
      case 'register':
        return <RegisterForm />;
      case 'forgot':
        return <ForgotPasswordForm />;
      default:
        return <LoginForm />;
    }
  };

  const renderTitle = () => {
    switch (authMode) {
      case 'login':
        return 'Log in to your account';
      case 'register':
        return 'Create an account';
      case 'forgot':
        return 'Reset your password';
      default:
        return 'Log in to your account';
    }
  };

  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center p-4">
      <AnimatePresence>
        {!isExiting && (
          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" onClick={(e) => handleExit(e, '/')} className="block text-4xl font-bold text-center mb-8 hover:text-gray-300 transition-colors">
              SearchPrompt
            </Link>
            
            <section className="border border-gray-400 rounded-lg p-8">
              <h2 className="text-xl md:text-2xl mb-6 text-center">{renderTitle()}</h2>
              {renderForm()}
              <div className="mt-4 text-center">
                {authMode === 'login' && (
                  <>
                    <button onClick={() => setAuthMode('forgot')} className="text-sm text-blue-400 hover:text-blue-300">
                      Forgot password?
                    </button>
                    <div className="mt-2">
                      <button onClick={() => setAuthMode('register')} className="text-sm text-gray-400 hover:text-gray-300">
                        Don&apost have an account? Register
                      </button>
                    </div>
                  </>
                )}
                {authMode === 'register' && (
                  <button onClick={() => setAuthMode('login')} className="text-sm text-gray-400 hover:text-gray-300">
                    Already have an account? Log in
                  </button>
                )}
                {authMode === 'forgot' && (
                  <button onClick={() => setAuthMode('login')} className="text-sm text-gray-400 hover:text-gray-300">
                    Back to login
                  </button>
                )}
              </div>
              <div className="mt-6 text-center">
                <Link href="/" onClick={(e) => handleExit(e, '/')} className="text-sm text-gray-400 hover:text-gray-300">
                  Go back
                </Link>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}