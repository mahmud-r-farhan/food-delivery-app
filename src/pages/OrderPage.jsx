import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Helmet } from 'react-helmet';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';
import Chat from '../components/Chat';

// Custom marker icon
const deliveryIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function OrderPage() {
  const { id } = useParams();
  const [orderStatus, setOrderStatus] = useState('Preparing');
  const [estimatedTime, setEstimatedTime] = useState(30);
  const [riderLocation, setRiderLocation] = useState([51.505, -0.09]);

  const stages = [
    { id: 1, name: 'Order Confirmed', icon: '✓', completed: true },
    { id: 2, name: 'Preparing', icon: '👨‍🍳', completed: orderStatus === 'Preparing' },
    { id: 3, name: 'On the Way', icon: '🛵', completed: orderStatus === 'Delivering' },
    { id: 4, name: 'Delivered', icon: '🏠', completed: orderStatus === 'Delivered' },
  ];

  // Update estimated time
  useEffect(() => {
    const timer = setInterval(() => {
      if (estimatedTime > 0) {
        setEstimatedTime(prev => prev - 1);
        if (estimatedTime <= 20 && orderStatus === 'Preparing') {
          setOrderStatus('Delivering');
        }
      } else {
        clearInterval(timer);
        setOrderStatus('Delivered');
      }
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, [estimatedTime, orderStatus]);

  // Simulate rider movement
  useEffect(() => {
    const moveRider = setInterval(() => {
      setRiderLocation(prev => [
        prev[0] + (Math.random() - 0.5) * 0.001,
        prev[1] + (Math.random() - 0.5) * 0.001,
      ]);
    }, 3000);
    return () => clearInterval(moveRider);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <Helmet>
        <title>Order #{id} | Tracking</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Status */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h1 className="text-2xl font-bold mb-6">Order #{id}</h1>

              {/* Timeline */}
              <div className="flex justify-between mb-8">
                {stages.map((stage, index) => (
                  <div key={stage.id} className="flex flex-col items-center w-1/4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                        stage.completed ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      {stage.icon}
                    </div>
                    <div className="text-sm mt-2 text-center font-medium">{stage.name}</div>
                    {index < stages.length - 1 && (
                      <div
                        className={`h-1 w-full mt-6 ${
                          stage.completed ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
                <MapContainer center={riderLocation} zoom={15} className="h-full w-full">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={riderLocation} icon={deliveryIcon}>
                    <Popup>Your delivery partner is here!</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </motion.div>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
                  <span>123 Delivery Street, City</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="w-5 h-5 text-gray-400" />
                  <span>+1 234 567 890</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className="w-5 h-5 text-gray-400" />
                  <span>Estimated arrival in {estimatedTime} mins</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-4">Need Help?</h2>
              <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors">
                Contact Support
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <Chat type="delivery" />
    </div>
  );
}

export default OrderPage;
