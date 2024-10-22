import React, { useState } from 'react';
import { assets } from '../../public/assets/assets';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Address = ({ street, city, state, zip }) => {
  return (
    <div className="space-y-2 text-gray-700">
      <p><strong>Street Address:</strong> {street}</p>
      <p><strong>City:</strong> {city}</p>
      <p><strong>State:</strong> {state}</p>
      <p><strong>Zip Code:</strong> {zip}</p>
    </div>
  );
};

const EditProfileForm = ({ customer, onSave }) => {
  const [formData, setFormData] = useState(customer);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the field belongs to the address object
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData); // Pass the entire updated form data to save
    const token = localStorage.getItem('token');

    const update_response = await axios.post("http://localhost:3001/changeUserInfo",
      {
        token:token,
        firstName:formData.firstName,
        lastName:formData.lastName,
        streetAddress:formData.address.street,
        city:formData.address.city,
        state:formData.address.state,
        zipCode:formData.address.zip,
        phoneNumber:formData.phoneNumber
      }
    );

    console.log(update_response);

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Fields */}
      <div className="flex flex-col">
        <label className="text-gray-600">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Email Field */}
      {/* <div className="flex flex-col">
        <label className="text-gray-600">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div> */}

      {/* Address Fields */}
      <div className="flex flex-col">
        <label className="text-gray-600">Street Address:</label>
        <input
          type="text"
          name="street"
          value={formData.address.street}
          onChange={handleChange}
          className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600">City:</label>
        <input
          type="text"
          name="city"
          value={formData.address.city}
          onChange={handleChange}
          className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600">State:</label>
        <input
          type="text"
          name="state"
          value={formData.address.state}
          onChange={handleChange}
          className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600">Zip Code:</label>
        <input
          type="text"
          name="zip"
          value={formData.address.zip}
          onChange={handleChange}
          className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Phone Number */}
      <div className="flex flex-col">
        <label className="text-gray-600">Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>


      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
        Save Profile
      </button>
    </form>
  );
};

const Profile = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      console.log(token);
      if (!token) {
        // No token found, redirect to login page
        navigate('/Login');
        return;
      }

      try {
        // Verify token with backend
        await axios.post('http://localhost:3001/authentication', {
          
            authorization: token
          
        });
        
        // Token is valid, continue to stay on the page
        
      } catch (error) {
        // If error, token is invalid or expired, redirect to login page
        console.error('Invalid token, redirecting to login:', error);
        navigate('/Login');
      }
    };

    checkToken(); // Call the token check function when page loads
  }, [navigate]); // Dependency array to run on page load


  const [customer, setCustomer] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    address: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '62704',
    },
    phoneNumber: '+94779367923',
    //img: assets.Person,
  });

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (updatedCustomer) => {
    setCustomer(updatedCustomer); // Update the entire customer data
    setIsEditing(false); // Exit editing mode after saving
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundImage: `url(${assets.Login_bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex flex-col lg:flex-row w-full max-w-5xl h-auto justify-between">
        {/* Left Section with Text */}
        <div className="flex justify-center lg:justify-start items-center w-full p-6 text-white">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">Welcome to Your Profile</h1>
            <p className="text-xl sm:text-2xl lg:text-2xl">Update your address and personal information with ease.</p>
          </div>
        </div>

        {/* Right Section with Form */}
        <div className="flex justify-center items-center w-full h-full p-6">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-indigo-600">Customer Profile</h2>
            <img src={customer.img} alt="Customer" className="w-56 my-4 rounded" />
            
            {!isEditing ? (
              <div className="mt-4 text-gray-700">
                <p><strong>First Name:</strong> {customer.firstName}</p>
                <p><strong>Last Name:</strong> {customer.lastName}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <h3 className="mt-6 text-lg font-medium text-gray-800"><i className="fa-solid fa-location-dot"></i> Address</h3>
                <Address {...customer.address} />
                <br />
                <p><strong>Phone number:</strong> {customer.phoneNumber}</p>
                <button
                  onClick={toggleEdit}
                  className="mt-4 w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <EditProfileForm customer={customer} onSave={handleSave} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
