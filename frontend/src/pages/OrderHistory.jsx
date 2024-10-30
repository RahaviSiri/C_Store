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
                const data = await response.json();
                console.log('Fetched orders:', response.data);
                setOrders(data.orderHistoryResponse || []);
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
                            ? { ...order, shipment_status: 'received' } 
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
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold text-indigo-600">Order History</h2>
            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : Array.isArray(orders) && orders.length > 0 ? (
                <div className="mt-4 space-y-6">
                    {orders.map((order) => (
                        <div key={order.order_id} className="p-4 bg-white shadow-md rounded-lg">
                            <p><strong>Order Date:</strong> {order.order_date}</p>
                            <p><strong>Variant Color:</strong> {order.color}</p>
                            <img src={`/assets/${order.picture_url}`} alt={order.SKU} className="w-24 h-24" />
                            <p><strong>Quantity:</strong> {order.quantity}</p>
                            <p><strong>Shipment Status:</strong> {order.shipment_status}</p>

                            {order.shipment_status === 'pending' && (
                                <button
                                    // onClick={() => handleReceived(order.order_id)}
                                    className="mt-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                >
                                    Mark as Received
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrderHistory;
