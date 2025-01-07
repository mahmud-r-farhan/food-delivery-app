import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';

function Chat({ type = 'restaurant' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAutoResponse = () => {
    const responses = [
      "Thanks for your message! We'll get back to you shortly.",
      "Your order is being processed.",
      "The restaurant is preparing your food.",
      "Your delivery partner is on the way.",
      "Is there anything else I can help you with?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate typing indicator
    setIsTyping(true);

    // Simulate auto-response after delay
    setTimeout(() => {
      const autoResponse = {
        id: Date.now() + 1,
        text: generateAutoResponse(),
        sender: 'bot',
        time: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, autoResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed z-50 bottom-20 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
          >
            <ChatBubbleLeftIcon className="h-6 w-6" />
            {messages.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {messages.length}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed z-50 bottom-20 right-4 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
          >
            {/* Chat Header */}
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  {type === 'restaurant' ? '🏪' : '🛵'}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {type === 'restaurant' ? 'Restaurant Support' : 'Delivery Partner'}
                  </h3>
                  <span className="text-xs text-green-500">Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] ${message.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700'} rounded-lg p-3`}>
                    <p>{message.text}</p>
                    <span className="text-xs opacity-75 mt-1">{message.time}</span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-gray-500">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Typing...
                  </motion.div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full px-4 py-2 border dark:border-gray-600 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chat;