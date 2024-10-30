import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; 

const QuarterlySalesReport = () => {
  const [year, setYear] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState('');

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (!year) {
      setError("Please enter a valid year.");
      setSalesData([]); // Clear previous sales data
      return;
    }

    // Fetch the sales data from the backend API
    axios.get(`http://localhost:8081/api/quarterly-sales/${year}`)
      .then(response => {
        setSalesData(response.data); // Update the state with fetched data
        setError(''); // Clear any previous errors
      })
      .catch(error => {
        console.error("There was an error fetching the sales data!", error);
        setError("Error fetching data, please try again.");
        setSalesData([]); // Clear previous sales data
      });
  };

  return (
    <div>
      <Navbar />
      <h1>Quarterly Sales Report</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Enter Year: 
          <input 
            type="text" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            placeholder="e.g., 2024"
          />
        </label>
        <button type="submit">Fetch Sales Data</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {salesData.length === 0 && !error && year && (
        <p>No related data found for the year {year}.</p>
      )}

      {salesData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Quarter</th>
              <th>Total Units Sold</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((row, index) => (
              <tr key={index}>
                <td>{row.Quarter}</td>
                <td>{row['Total Units Sold']}</td>
                <td>{row['Total Sales']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuarterlySalesReport;
