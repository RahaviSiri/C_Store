import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure you create this CSS file for styling
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <h1>Admin Reports</h1>
      <p>Welcome to the admin area. Please select a report from the options below:</p>
      <div className="report-boxes">
        <Link to="/quarterly-sales-report" className="report-box">
          <h2>Quarterly Sales Report</h2>
          <p>View sales data on a quarterly basis.</p>
        </Link>
        <Link to="/top-selling-products" className="report-box">
          <h2>Top Selling Products</h2>
          <p>Discover which products have the most sales.</p>
        </Link>
        <Link to="/most-ordered-category" className="report-box">
          <h2>Most Ordered Product Category</h2>
          <p>Analyze orders by product category.</p>
        </Link>
        <Link to="/product-interest-trend" className="report-box">
          <h2>Product Interest Trends</h2>
          <p>Examine interest trends for specific products over time.</p>
        </Link>
        <Link to="/customer-order-report" className="report-box">
          <h2>Customer Order Report</h2>
          <p>Review customer orders and their details.</p>
        </Link>
        <Link to="/user-message" className="report-box">
          <h2>View Customer Massage</h2>
          <p>Read customer send masseges.</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
