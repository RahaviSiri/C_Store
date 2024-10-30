import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Import the Navbar component

const ProductCategoryWithMostOrders = () => {
  const [mostSellingCategories, setMostSellingCategories] = useState([]);
  const [loading, setLoading] = useState(true); // To show a loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch data from the API
  useEffect(() => {
    fetch('http://localhost:8081/api/most-selling-category')
      .then((response) => {
        console.log('API response:', response); // Log the entire response object
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data received:', data); // Log the data received
        setMostSellingCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);
  

  // Loading state
  if (loading) {
    return (
      <div>
        <Navbar />
        <h1>Product Category With Most Orders</h1>
        <p>Loading...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <Navbar />
        <h1>Product Category With Most Orders</h1>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  // Render the list of most-selling categories
  return (
    <div>
      <Navbar />
      <h1>Product Category With Most Orders</h1>
      <table border="1">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {mostSellingCategories.map((category) => (
            <tr key={category.SKU}>
              <td>{category.SKU}</td>
              <td>{category.name}</td>
              <td>{category.total_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCategoryWithMostOrders;
