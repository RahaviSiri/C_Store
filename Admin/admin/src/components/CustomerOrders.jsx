import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar'; 

const CustomerOrders = () => {
  const { customerId } = useParams(); // Get customerId from URL parameters
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all orders for the specific customer
    axios.get(`http://localhost:8081/api/orders?customerId=${customerId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer orders', error);
        setError('Error fetching customer orders');
      });
  }, [customerId]);

  

  return (
    <div>
      <Navbar/>
      <h1>Orders for Customer {customerId}</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Payment ID</th>
              <th>Shipment ID</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{new Date(order.order_date).toLocaleDateString()}</td>
                  <td>{order.total_price}</td>
                  <td>{order.payment_id}</td>
                  <td>{order.shipment_id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No orders found for this customer</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerOrders;
