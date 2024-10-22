import React, { useState } from 'react';
import './ProductInterestTimePeriod.css'; // Ensure this file exists
import Navbar from './Navbar'; // Ensure the Navbar component exists
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductInterestTimePeriod = () => {
  // State to store the SKU input value
  const [sku, setSku] = useState('');

  // Function to handle input change
  const handleInputChange = (e) => {
    setSku(e.target.value);
  };

  // Function to handle form submission or button click
  const handleSubmit = () => {
    alert(`Entered SKU: ${sku}`);
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],
    datasets: [
      {
        label: 'Average Total Sales',
        data: [5000, 7000, 8000, 6000, 7500, 9000,5000,4500,6500,10000,11000,1200], // Sample sales data
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Total Sales by Month',
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h3>Enter SKU</h3>
        <input
          type="text"
          placeholder="Enter SKU"
          value={sku}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Submit</button>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default ProductInterestTimePeriod;
