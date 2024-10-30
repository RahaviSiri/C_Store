import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; 
import axios from 'axios';
import './MessageDetails.css'; // Import the CSS file

const MessageDetails = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the message when the component loads
  useEffect(() => {
    axios.get(`http://localhost:8080/api/messages/${id}`)
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error('Error fetching message:', error);
        setError('Message not found');
      });
  }, [id]);

  // Handle marking the message as read
  const markAsRead = () => {
    axios.put(`http://localhost:8081/api/messages/${id}/read`)
      .then(() => {
        setMessage((prevMessage) => ({ ...prevMessage, read_status: true }));
      })
      .catch((error) => {
        console.error('Error updating message status:', error);
      });
  };

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  if (!message) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="container">
      <Navbar />
      <h1>Message Details</h1>
      <button onClick={markAsRead} disabled={message.read_status}>
        {message.read_status ? "Already Read" : "Mark As Read"}
      </button>
      <p><strong>Customer ID:</strong> {message.customer_id}</p>
      <p><strong>Subject:</strong> {message.subject}</p>
      <p><strong>Message:</strong> {message.message}</p>
      <p><strong>Status:</strong> {message.read_status ? "Read" : "Unread"}</p>
      <Link to="/user-message">
        <p>Back.</p>
      </Link>
    </div>
  );
};

export default MessageDetails;
