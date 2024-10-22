import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to create a CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Admin Dashboard</h1>
      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/quarterly-sales-report">Quarterly Sales Report</Link>
        </li>
        <li>
          <Link to="/top-selling-products">Top Selling Products</Link>
        </li>
        <li>
          <Link to="/product-category-orders">Most Ordered Product Category</Link>
        </li>
        <li>
          <Link to="/product-interest-trend">Product Interest Trends</Link>
        </li>
        <li>
          <Link to="/customer-order-report">Customer Order Report</Link>
        </li>
        <li>
          <Link to="/user-message">Read User Meassage</Link>
        </li>
        <li className='Lo'>
          <Link to="/">Logout</Link>
        </li>
      </ul>
      
    </nav>
  );
};

export default Navbar;
