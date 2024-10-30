import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import axios from 'axios'; // Import Axios

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null); // State to hold any errors
  const navigate = useNavigate();

  // Fetch messages from the backend
  useEffect(() => {
    axios.get('http://localhost:8081/api/messages') // Use Axios to fetch messages
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
        setError('Error fetching messages'); // Set error state
      });
  }, []);

  // Function to navigate to the full message display
  const viewMessage = (id) => {
    navigate(`/message/${id}`);
  };

  return (
    <div>
      <Navbar />
      <h1>Messages</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if exists */}
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Subject</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.message_id}>
              <td>{message.customer_id}</td>
              <td>{message.subject}</td>
              <td>{message.read_status ? "Read" : "Unread"}</td>
              <td>
                <button onClick={() => viewMessage(message.message_id)}>
                  View Message
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessagesList;
