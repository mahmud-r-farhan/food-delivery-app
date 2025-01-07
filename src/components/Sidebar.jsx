import React, { useEffect } from 'react';
import { FaTimes, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar, cart = [], updateQuantity, removeItem, placeOrder }) {
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    const orderId = Math.floor(Math.random() * 1000000);
    placeOrder();
    navigate(`/order/${orderId}`);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => (document.body.style.overflow = '');
  }, [isOpen]);

  return (
    <div>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] transition-opacity duration-300"
          onClick={toggleSidebar}
          style={{ opacity: isOpen ? 0.5 : 0 }}
        ></div>
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed right-0 top-0 h-screen w-[400px] bg-white dark:bg-gray-800 shadow-2xl z-[999] overflow-hidden transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
            <h2 className="text-xl font-bold">Your Cart ({cart.length})</h2>
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)}>
                          <FaTimes className="text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) - 1)
                          }
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                        >
                          <FaMinus />
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) + 1)
                          }
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {cart.length > 0 && (
            <div className="border-t dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t dark:border-gray-700">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl mt-6 hover:bg-indigo-700 transition-colors"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;