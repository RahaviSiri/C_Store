import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './QuarterlySalesReport.css';

const QuarterlySalesReport = () => {
  const [year, setYear] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!year) {
      setError("Please enter a valid year.");
      setSalesData([]);
      return;
    }

    axios.get(`http://localhost:8080/api/quarterly-sales/${year}`)
      .then(response => {
        setSalesData(response.data);
        setError('');
      })
      .catch(error => {
        console.error("There was an error fetching the sales data!", error);
        setError("Error fetching data, please try again.");
        setSalesData([]);
      });
  };

  return (
    <div>
      <Navbar /> {/* Navbar is separated from the main container */}
      <div className="container">
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

        {error && <p className="error-message">{error}</p>}

        {salesData.length === 0 && !error && year && (
          <p className="no-data-message">No related data found for the year {year}.</p>
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
    </div>
  );
};

export default QuarterlySalesReport;
