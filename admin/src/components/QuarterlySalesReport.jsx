import React, { useState } from 'react';
import './QuarterlySalesReport.css'; // Create this CSS file for styling
import Navbar from './Navbar'; // Import the Navbar component

const QuarterlySalesReport = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to the current year

  // Sample data for sales reports
  const salesData = [
    { quarter: 'Q1', mostSoldItem: 'Item A', totalProfit: '$5000' },
    { quarter: 'Q2', mostSoldItem: 'Item B', totalProfit: '$7000' },
    { quarter: 'Q3', mostSoldItem: 'Item C', totalProfit: '$8000' },
    { quarter: 'Q4', mostSoldItem: 'Item D', totalProfit: '$6000' },
  ];

  // Handle year selection
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    // You can add logic here to fetch data for the selected year if needed
  };

  return (
    <div>
        <Navbar /> 
    <div className="quarterly-sales-report-container">
      <h1>Quarterly Sales Report</h1>
      <p>This section will display the sales data for the selected year.</p>

      {/* Year selection */}
      <div className="year-selection">
        <label htmlFor="year-select">Select Year: </label>
        <select id="year-select" value={selectedYear} onChange={handleYearChange}>
          {/* You can add more years as needed */}
          <option value={new Date().getFullYear()}>Current Year</option>
          <option value={new Date().getFullYear() - 1}>Last Year</option>
          <option value={new Date().getFullYear() - 2}>2 Years Ago</option>
          <option value={new Date().getFullYear() - 3}>3 Years Ago</option>
        </select>
      </div>

      {/* Sales data table */}
      <div className="report-content">
        <h2>Sales Summary for {selectedYear}</h2>
        <table className="sales-data-table">
          <thead>
            <tr>
              <th>Quarter</th>
              <th>Most Sold Item</th>
              <th>Total Profit</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((data, index) => (
              <tr key={index}>
                <td>{data.quarter}</td>
                <td>{data.mostSoldItem}</td>
                <td>{data.totalProfit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Placeholder for charts */}
      <div className="charts-container">
        <h2>Sales Trends</h2>
        <p>[Insert Chart Here]</p>
      </div>
    </div>
    </div>
  );
};

export default QuarterlySalesReport;
