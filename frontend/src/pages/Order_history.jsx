import React, { useState } from 'react';
import { assets } from '../../public/assets/assets';

const Order_history = () => {
  // Sample order data (You will replace this with dynamic data later)
  const [orders, setOrders] = useState([
    {
      orderId: 1,
      storeName: 'Boutique Top Watch Store',
      productName: 'Large Dial Fashion Quartz Couple Watches',
      productImage: assets.Camera, // Replace with actual image paths
      price: 1.86,
      quantity: 1,
      date: 'Oct 21, 2024',
      deliveryEstimate: 'Nov 8, 2024 - Nov 15, 2024',
      status: 'Awaiting delivery',
      confirmed: false
    },
    {
      orderId: 2,
      storeName: 'Exquisite Costume Store',
      productName: 'Men Watches Business Wrist Watch',
      productImage: assets.Earpods, // Replace with actual image paths
      price: 1.58,
      quantity: 1,
      date: 'Sep 16, 2024',
      deliveryEstimate: 'Nov 18, 2024',
      status: 'Awaiting delivery',
      confirmed: false
    },
  ]);

  const handleConfirmReceived = (orderId) => {
    setOrders(orders.map(order => 
      order.orderId === orderId ? { ...order, confirmed: true } : order
    ));
    // Navigate to the review page (you will implement the routing later)
    alert(`Navigating to review page for order ${orderId}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Order History</h2>
      {orders.map((order) => (
        <div key={order.orderId} className="border border-gray-200 rounded-lg mb-4 p-4">
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-700">{order.storeName}</h3>
              <p className="text-gray-500 text-sm">{order.date}</p>
            </div>
            <p className="text-sm text-gray-500">{order.status}</p>
          </div>

          <div className="flex items-center mb-4">
            <img src={order.productImage} alt={order.productName} className="w-16 h-16 object-cover rounded-md mr-4" />
            <div>
              <a href="#" className="text-purple-600 hover:underline font-medium text-lg">
                {order.productName}
              </a>
              <p className="text-gray-500">US ${order.price.toFixed(2)} x {order.quantity}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">
              Estimated delivery date: {order.deliveryEstimate}
            </p>
            <p className="font-bold">Total: US ${order.price.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <a href="#" className="text-purple-600 font-medium hover:underline">Track order</a>
            {!order.confirmed ? (
              <button
                onClick={() => handleConfirmReceived(order.orderId)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                Confirm received
              </button>
            ) : (
              <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed">
                Received
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order_history;
