import React from 'react';
import { Link } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
  const priceRange = restaurant.menu?.reduce((min, item) => 
    Math.min(min, item.price), Infinity).toFixed(2);

  return (
    <div className="h-full hover:-translate-y-2 transition-transform duration-300">
      <Link to={`/restaurant/${restaurant.id}`} className="block h-full">
        <div className="bg-white dark:bg-gray-800 h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="relative">
            <img 
              src={restaurant.image} 
              alt={restaurant.name} 
              className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <div className="flex items-center gap-1.5">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-bold">{restaurant.rating}</span>
              </div>
            </div>
            {restaurant.deliveryTime <= 30 && (
              <div className="absolute top-4 left-4 bg-green-500/90 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                Fast Delivery
              </div>
            )}
          </div>
          
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {restaurant.name}
              </h2>
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full">
                {restaurant.cuisine}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{restaurant.deliveryTime} min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>From ${priceRange}</span>
                </div>
              </div>

              {restaurant.menu && restaurant.menu.length > 0 && (
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Popular items:
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {restaurant.menu.slice(0, 2).map(item => (
                      <span key={item.id} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                View Menu
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RestaurantCard;