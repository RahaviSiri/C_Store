import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook for navigation
import Navbar from './Navbar'; // Import the Navbar component

const CustomerOrderReport = () => {
    const [orderReport, setOrderReport] = useState([]);  // State to hold the customer order data
    const [loading, setLoading] = useState(true);        // State to show loading
    const [error, setError] = useState(null);            // State to handle any errors
    const navigate = useNavigate(); // Use React Router's navigate function

    // Fetch the customer order report when the component is mounted
    useEffect(() => {
        fetch('/customerOrderReport', {
            method: 'GET', // Specify HTTP method
            headers: {
                'Content-Type': 'application/json', // Set headers if needed
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json(); // Parse JSON response
            })
            .then((data) => {
                setOrderReport(data);   // Set the data from the API
                setLoading(false);      // Data has been loaded
            })
            .catch((error) => {
                console.error('Error fetching the order report:', error);
                setError('Failed to load customer order report');
                setLoading(false);
            });
    }, []);

    // Function to handle "Explore Customer" button click
    const handleExploreCustomer = (customerId) => {
        navigate(`/customer/${customerId}`);  // Navigate to EachCustomerOrder page with customer_id
    };

    // Loading message
    if (loading) {
        return <div>Loading...</div>;  
    }

    // Error message
    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <div>
            <Navbar />
            <h1>Customer Order Report</h1>

            {/* Displaying the customer order report in a table */}
            <table border="1">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Total Price</th>
                        <th>Customer ID</th>
                        <th>Payment ID</th>
                        <th>Shipment ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orderReport.map((order) => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{new Date(order.order_date).toLocaleDateString()}</td>
                            <td>{order.total_price}</td>
                            <td>{order.customer_id}</td>
                            <td>{order.payment_id}</td>
                            <td>{order.shipment_id}</td>
                            <td>
                                {/* Button to explore customer */}
                                <button onClick={() => handleExploreCustomer(order.customer_id)}>
                                    Explore Customer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerOrderReport;
