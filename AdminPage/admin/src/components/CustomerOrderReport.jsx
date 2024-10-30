import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; 
import './CustomerOrderReport.css';

const CustomerOrderReport = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/orders')
      .then((response) => setOrders(response.data))
      .catch((error) => {
        console.error('Error fetching customer orders', error);
        setError('Error fetching customer orders');
      });
  }, []);

  const handleExploreCustomer = (customerId) => {
    navigate(`/customer-orders/${customerId}`);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Customer Order Report</h1>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Total Price</th>
                <th>Customer ID</th>
                <th>Payment ID</th>
                <th>Shipment ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                    <td>{order.total_price}</td>
                    <td>{order.customer_id}</td>
                    <td>{order.payment_id}</td>
                    <td>{order.shipment_id}</td>
                    <td>
                      <button onClick={() => handleExploreCustomer(order.customer_id)}>Explore Customer</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-orders">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomerOrderReport;
