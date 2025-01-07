import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarIcon, ClockIcon } from '@heroicons/react/24/solid';

const restaurants = [
  { id: 1, name: 'Burger Palace', cuisine: 'Fast Food', rating: 4.5 },
  { id: 2, name: 'Pasta Paradise', cuisine: 'Italian', rating: 4.2 },
  { id: 3, name: 'Sushi Sensation', cuisine: 'Japanese', rating: 4.8 },
  { id: 4, name: 'Taco Town', cuisine: 'Mexican', rating: 4.6 },
  { id: 5, name: 'Pizza Planet', cuisine: 'Italian', rating: 4.4 },
  { id: 6, name: 'Wok World', cuisine: 'Chinese', rating: 4.1 },
  { id: 7, name: 'Kebab Kingdom', cuisine: 'Turkish', rating: 4.7 },
  { id: 8, name: 'Curry Corner', cuisine: 'Indian', rating: 4.3 },
  { id: 9, name: 'Bakery Boutique', cuisine: 'Bakery', rating: 4.9 },
  { id: 10, name: 'Salad Stop', cuisine: 'Healthy', rating: 4.0 },
  
];

function RestaurantList() {
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRestaurants = restaurants.filter(restaurant => 
    (selectedCuisine === '' || restaurant.cuisine === selectedCuisine) &&
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cuisineTypes = [...new Set(restaurants.map(r => r.cuisine))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCuisine('')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCuisine === ''
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {cuisineTypes.map(cuisine => (
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(cuisine)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCuisine === cuisine
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <motion.div
            key={restaurant.id}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to={`/restaurant/${restaurant.id}`}
              className="block h-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">{restaurant.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{restaurant.cuisine}</p>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <span>{restaurant.rating}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;