import React, { useState } from 'react';
import { motion } from 'framer-motion';

function FoodCard({ food, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={food.image} 
          alt={food.name} 
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        {food.spiceLevel && (
          <div className="absolute top-4 left-4 bg-red-500/90 text-white px-2 py-1 rounded-full text-xs">
            🌶️ {food.spiceLevel}
          </div>
        )}
        {food.isVegetarian && (
          <div className="absolute top-4 right-4 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs">
            🥬 Veg
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{food.name}</h3>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            ❤️
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{food.description}</p>

        <div className="flex items-center gap-2 mb-3">
          {food.tags?.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              ${(food.price * quantity).toFixed(2)}
            </span>
            {food.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${food.originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() => onAddToCart({ ...food, quantity })}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Add to Cart</span>
          <span className="text-sm bg-indigo-700 px-2 py-0.5 rounded">
            ${(food.price * quantity).toFixed(2)}
          </span>
        </button>
      </div>
    </motion.div>
  );
}

export default FoodCard;