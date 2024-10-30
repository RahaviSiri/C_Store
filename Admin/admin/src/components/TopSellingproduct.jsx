import React, { useState } from 'react';
import Navbar from './Navbar'; // Import the Navbar component

const TopSellingproduct = () => {
  const [mostSellingCategories, setMostSellingCategories] = useState([]);
  const [loading, setLoading] = useState(false); // Initially, loading is false
  const [error, setError] = useState(null); // To handle errors
  const [startDate, setStartDate] = useState(''); // Start date input state
  const [endDate, setEndDate] = useState(''); // End date input state

  // Fetch data from the API based on the selected date range
  const fetchTopSellingProducts = () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }

    setLoading(true);
    setError(null); // Reset any previous errors

    fetch(`http://localhost:8081/api/top-selling-product?start_date=${startDate}&end_date=${endDate}`)
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
        setError(error.message);
        setLoading(false);
      });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTopSellingProducts();
  };

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
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>Product Category With Most Orders</h1>
      
      {/* Date range input form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startDate">Start Date: </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date: </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>

      {/* Render the list of most-selling categories */}
      {mostSellingCategories.length > 0 && (
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
      )}
    </div>
  );
};

export default TopSellingproduct;
