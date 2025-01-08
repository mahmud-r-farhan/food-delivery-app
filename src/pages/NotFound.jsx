import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon } from '@heroicons/react/24/outline';

function NotFound() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4"
    >
      <div className="text-center">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-9xl font-bold text-indigo-600 mb-8"
        >
          404
        </motion.div>
        
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for has been moved or doesn't exist.
          Let's get you back on track!
        </p>

        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
        >
          <HomeIcon className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="mt-8 space-y-2 text-sm text-gray-500 dark:text-gray-400">
          <p>Try checking:</p>
          <ul>
            <li>The spelling of the URL</li>
            <li>If you followed a link, it might be outdated</li>
            <li>The page might have been moved or deleted</li>
            <li>Support<Link to="https://github.com/mahmud-r-farhan" className="text-indigo-600 hover:underline"> Github</Link></li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default NotFound;