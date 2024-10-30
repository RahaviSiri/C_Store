import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch order history from backend
    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.post(`http://localhost:3001/orderHistory`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Fetched orders:', response.data);
                setOrders(response.data.orderHistoryResponse);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Error fetching orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Update shipment status
    const handleReceived = async (orderId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            setError('No token found');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3001/shipmentStatus`, { order_id: orderId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setOrders((prevOrders) =>
                    prevOrders.map(order =>
                        order.order_id === orderId
                            ? { ...order, shipment_status: 'Received' }
                            : order
                    )
                );
            } else {
                console.error('Failed to update shipment status');
                setError('Failed to update shipment status.');
            }
        } catch (error) {
            console.error('Error updating shipment status:', error);
            setError('Error updating shipment status. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto p-6 my-3 bg-purple-50 min-h-screen">
            <h2 className="text-4xl font-bold text-purple-800 mb-6 text-center">Order History</h2>
            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : Array.isArray(orders) && orders.length > 0 ? (
                <div className="mt-4 space-y-6">
                    {orders.map((order) => (
                        <div key={order.order_id} className="p-6 bg-white shadow-lg rounded-lg border-2 border-purple-200">
                            <p className="text-lg font-semibold my-2"><strong>Order Date:</strong> {order.order_date}</p>
                            <p className='my-2'><strong>Variant Color:</strong> {order.color}</p>
                            <img src={`/assets/${order.picture_url}`} alt={order.SKU} className="w-32 h-32 rounded-md my-4 border border-purple-300" />
                            <p className='my-2'><strong>Quantity:</strong> {order.quantity}</p>
                            <p className='my-2'><strong>Shipment Status:</strong> {order.shipment_status}</p>

                            {order.shipment_status === 'pending' && (
                                <button
                                    onClick={() => handleReceived(order.order_id)}
                                    className="mt-4 px-6 py-2 text-white bg-purple-600 rounded-full hover:bg-gradient-to-r from-purple-600 to-purple-800 transition-colors duration-300"
                                >
                                    Mark as Received
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-purple-700">No orders found.</p>
            )}
        </div>
    );
};

export default OrderHistory;
