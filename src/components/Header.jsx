import React from 'react';
import { Link } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

function Header({ toggleDarkMode, darkMode }) {
  return (
    <header className="bg-yellow-50 dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold text-yellow-800 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors duration-300"
        >
          Bee Food
        </Link>
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-yellow-200 dark:bg-gray-700 hover:bg-yellow-300 dark:hover:bg-gray-600 transition-colors duration-300"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <SunIcon className="h-7 w-7 text-yellow-400 transition-transform duration-300 transform hover:scale-110" />
            ) : (
              <MoonIcon className="h-7 w-7 text-gray-700 transition-transform duration-300 transform hover:scale-110" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;