import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'; // Import the Navbar component
// Mock data for messages
const messagesData = [
  { message_id: 1, customer_id: 101, subject: "Welcome", read_status: true },
  { message_id: 2, customer_id: 102, subject: "Invoice", read_status: false },
  { message_id: 3, customer_id: 103, subject: "Update", read_status: false },
  // ... more messages
];

const MessagesList = () => {
  const navigate = useNavigate();

  // Function to navigate to the full message display
  const viewMessage = (id) => {
    navigate(`/message/${id}`);
  };

  return (
    <div>
      <Navbar/>
      <h1>Messages</h1>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Subject</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {messagesData.map((message) => (
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
