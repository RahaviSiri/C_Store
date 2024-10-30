import React, { useState } from 'react';
import './ProductInterestTimePeriod.css';
import Navbar from './Navbar';

const ProductInterestTimePeriod = () => {
  const [sku, setSku] = useState('');
  const [year, setYear] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle SKU input change
  const handleSkuChange = (e) => {
    setSku(e.target.value);
  };

  // Handle year input change
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  // Handle form submission to fetch sales data
  const handleSubmit = async () => {
    if (sku && year) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8081/api/product-interest-trend?sku=${sku}&year=${year}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        setError('Error fetching sales data. Please try again.');
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter both SKU and year');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h3>Enter SKU and Year</h3>
        <input
          type="text"
          className="input-field"
          placeholder="Enter SKU"
          value={sku}
          onChange={handleSkuChange}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Enter Year"
          value={year}
          onChange={handleYearChange}
        />
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>

        {/* Display loading spinner */}
        {loading && <p>Loading...</p>}

        {/* Display error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Display the table */}
        {salesData.length > 0 && !loading && (
          <table className="sales-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Sales $</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.month}</td>
                  <td>{item.total_sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ProductInterestTimePeriod;
