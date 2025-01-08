import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-yellow-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2 text-yellow-800 dark:text-yellow-400">Bee Food - Food Delivery</h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              Bringing delicious food right to your doorstep.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2 text-yellow-800 dark:text-yellow-400">Quick Links</h3>
            <ul className="text-sm">
              <li><Link to="/" className="text-yellow-800 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300">Home</Link></li>
              <li><Link to="/about" className="text-yellow-800 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300">About</Link></li>
              <li><Link to="https://gravatar.com/floawd" className="text-yellow-800 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300">Contact</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2 text-yellow-800 dark:text-yellow-400">Developer Contacts</h3>
            <ul className="text-sm">
              <li><a href="https://www.fiverr.com/mahmudrfarhan" className="text-yellow-800 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300">Fiverr</a></li>
              <li><a href="https://x.com/mahmud_r_farhan" className="text-yellow-800 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300">Twitter</a></li>
              <li><a href="https://github.com/mahmud-r-farhan/" className="text-yellow-800 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300">Github</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-yellow-800 dark:text-yellow-400">
          © 2022 - 2025 Bee Food. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;