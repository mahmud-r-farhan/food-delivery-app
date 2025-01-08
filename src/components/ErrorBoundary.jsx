import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    const { customMessage, children } = this.props;

    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <div className="text-center p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {customMessage || 'Something went wrong'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please try again or contact support if the issue persists.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/" className="block">
              <button
               
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Home
              </button>
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  customMessage: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;