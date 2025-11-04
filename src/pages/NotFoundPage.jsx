// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="text-center p-10 animate-fade-in">
      <h1 className="text-9xl font-extrabold text-cyan-400">404</h1>
      <h2 className="text-4xl font-bold mt-4 mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link 
        to="/" 
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}