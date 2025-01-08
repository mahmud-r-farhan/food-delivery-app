import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Helmet } from 'react-helmet-async';
import Chat from '../components/Chat';
import ErrorBoundary from '../components/ErrorBoundary';

function OrderPage() {
  const { id } = useParams();
  const [orderStatus, setOrderStatus] = useState('Preparing');
  const [estimatedTime, setEstimatedTime] = useState(30);
  const [riderLocation, setRiderLocation] = useState([51.505, -0.09]);
  const [showMap, setShowMap] = useState(false);
  const [orderError, setOrderError] = useState(null);

  useEffect(() => {
    if (isNaN(parseInt(id))) {
      setOrderError('Invalid order ID');
    }
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (estimatedTime > 0) {
        setEstimatedTime((prev) => prev - 1);
      } else {
        clearInterval(timer);
        setOrderStatus('Delivered');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [estimatedTime]);

  useEffect(() => {
    const locationTimer = setInterval(() => {
      setRiderLocation([
        riderLocation[0] + (Math.random() - 0.5) * 0.001,
        riderLocation[1] + (Math.random() - 0.5) * 0.001,
      ]);
    }, 5000);

    return () => clearInterval(locationTimer);
  }, [riderLocation]);

  if (orderError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-red-600">{orderError}</h1>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Order #{id} | Bee Food | Fast Deliver</title>
        <meta
          name="description"
          content={`Track your order #${id} from Bee Food. Your current order status is ${orderStatus}. Estimated delivery time: ${estimatedTime} minutes.`}
        />
        <meta name="keywords" content="Order tracking, food delivery, Bee Food" />
        <link rel="canonical" href={`https://www.beefood.netlify.app/order/${id}`} />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Order #{id}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Order Status: {orderStatus}</h2>
        <p className="mb-4">Estimated Time: {estimatedTime} minutes</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${((30 - estimatedTime) / 30) * 100}%` }}
            role="progressbar"
            aria-valuenow={((30 - estimatedTime) / 30) * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <button
          onClick={() => setShowMap(!showMap)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          aria-label={showMap ? "Hide rider's location" : "Show rider's location"}
        >
          {showMap ? 'Hide' : 'Show'} Rider's Location
        </button>
      </div>
      {showMap ? (
        <div className="h-96 z-0 rounded-lg overflow-hidden mb-6">
          <ErrorBoundary>
            <MapContainer
              center={riderLocation}
              zoom={18}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={riderLocation}>
                <Popup>Your order is here!</Popup>
              </Marker>
            </MapContainer>
          </ErrorBoundary>
        </div>
      ) : (
        <div className="text-gray-500 text-center mb-6">
          Rider's location map is hidden. Click the button above to view.
        </div>
      )}
      <Chat type="rider" />
    </div>
  );
}

export default OrderPage;
