import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function OrderTracker({ orderStatus, estimatedTime, riderLocation }) {
  const stages = [
    { id: 1, name: 'Order Confirmed', icon: '✓', completed: true },
    { id: 2, name: 'Preparing', icon: '👨‍🍳', completed: orderStatus === 'preparing' },
    { id: 3, name: 'On the Way', icon: '🛵', completed: orderStatus === 'delivering' },
    { id: 4, name: 'Delivered', icon: '🏠', completed: orderStatus === 'delivered' }
  ];

  const calculateProgressWidth = () => {
    const maxTime = 30; // Assuming 30 mins as the max estimated time
    return `${((maxTime - estimatedTime) / maxTime) * 100}%`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        {/* Order Status Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Track Your Order
          </h1>

          {/* Timeline */}
          <div className="flex justify-between mb-8">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex flex-col items-center w-1/4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    stage.completed
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
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

          {/* ETA Card */}
          <div className="bg-indigo-50 dark:bg-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Estimated Arrival</h2>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {estimatedTime} mins
              </span>
            </div>
            <div className="w-full bg-white dark:bg-gray-800 rounded-full h-3">
              <div
                className="bg-indigo-600 h-3 rounded-full"
                style={{ width: calculateProgressWidth(), transition: 'width 0.5s ease' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="h-[400px]">
            <MapContainer
              center={riderLocation}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
              className="rounded-2xl"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={riderLocation}>
                <Popup className="text-center">
                  <b>Your rider is here!</b>
                  <br />
                  Arriving in {estimatedTime} mins
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                🛵
              </div>
              <div>
                <h3 className="font-semibold">Your Rider</h3>
                <p className="text-gray-600 dark:text-gray-400">John Doe</p>
              </div>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
              Contact Rider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTracker;
