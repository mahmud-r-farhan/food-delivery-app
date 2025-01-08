import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const RestaurantPage = React.lazy(() => import('./pages/RestaurantPage'));
const OrderPage = React.lazy(() => import('./pages/OrderPage'));

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
            <Helmet>
              <title>Bee Food | Fresh Food Delivered</title>
              <meta name="description" content="Order delicious food from your favorite local restaurants with Bee Food." />
              <meta name="theme-color" content={darkMode ? '#1F2937' : '#ffffff'} />
            </Helmet>

            <Header toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />

            <main className="flex-grow container mx-auto px-4 py-8">
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-screen">
                      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
                    </div>
                  }
                >
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/restaurant/:id" element={<RestaurantPage />} />
                      <Route path="/order/:id" element={<OrderPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AnimatePresence>
                </Suspense>
              </ErrorBoundary>
            </main>

            <Footer />
            <Toaster position="bottom-center" />
          </div>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;