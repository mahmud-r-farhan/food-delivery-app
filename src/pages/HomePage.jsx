import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restaurants } from '../utils/restaurants';
import { Helmet } from 'react-helmet';
import { MagnifyingGlassIcon, MicrophoneIcon } from '@heroicons/react/24/outline';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [randomMenuItems, setRandomMenuItems] = useState([]);
  const [visibleRestaurants, setVisibleRestaurants] = useState(6);

  // Get random menu items
  useEffect(() => {
    const allItems = restaurants.reduce((items, restaurant) => {
      const menuWithRestaurant = restaurant.menu.map(item => ({
        ...item,
        restaurantName: restaurant.name,
        restaurantId: restaurant.id
      }));
      return [...items, ...menuWithRestaurant];
    }, []);
    
    const shuffled = [...allItems].sort(() => 0.5 - Math.random());
    setRandomMenuItems(shuffled.slice(0, 3));
  }, []);

  // Filter restaurants based on search and filters
  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (cuisineFilter === '' || restaurant.cuisine === cuisineFilter) &&
    (ratingFilter === '' || restaurant.rating >= parseFloat(ratingFilter))
  );

  const loadMore = () => {
    setVisibleRestaurants(prev => Math.min(prev + 6, filteredRestaurants.length));
  };

  return (
    <div className="min-h-screen p-4">
      <Helmet>
        <title>Food Delivery App - Home</title>
      </Helmet>

      {/* Hero Section with CSS Animated Background */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 animate-pulse-slow" />
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Delicious Food,
              <br />
              Delivered To You
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-purple-100">
              Order from your favorite restaurants with just a few clicks
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <MagnifyingGlassIcon className="absolute left-4 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search restaurants or cuisines..."
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="absolute right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MicrophoneIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
          >
            <option value="">All Cuisines</option>
            {[...new Set(restaurants.map(r => r.cuisine))].map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="4.5">4.5+</option>
            <option value="4.0">4.0+</option>
            <option value="3.5">3.5+</option>
          </select>
        </div>
      </div>

      {/* Featured Menu Items Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {randomMenuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="font-bold mt-2">{item.name}</h3>
              <p className="text-gray-600">{item.restaurantName}</p>
              <p className="text-indigo-600 font-bold">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurants Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRestaurants.slice(0, visibleRestaurants).map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <Link to={`/restaurant/${restaurant.id}`} className="block">
                <div className="relative h-48">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1">
                    ⭐ {restaurant.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {restaurant.deliveryTime} mins
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400">
                      View Menu →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {visibleRestaurants < filteredRestaurants.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors"
            >
              See More
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
