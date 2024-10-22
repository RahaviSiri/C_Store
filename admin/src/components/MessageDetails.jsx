import React from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
// Mock data for messages
const messagesData = [
  { message_id: 1, customer_id: 101, subject: "Welcome", message: "Welcome to our service", read_status: true },
  { message_id: 2, customer_id: 102, subject: "Invoice", message: "Here is your invoice", read_status: false },
  { message_id: 3, customer_id: 103, subject: "Update", message: "Important update regarding your account", read_status: false },
  // ... more messages
];

const MessageDetails = () => {
  const { id } = useParams();
  const message = messagesData.find(msg => msg.message_id === parseInt(id));

  if (!message) {
    return <h2>Message not found</h2>;
  }

  return (
    <div>
      <h1>Message Details</h1>
      <button>Mark As Read</button>
      <p><strong>Customer ID:</strong> {message.customer_id}</p>
      <p><strong>Subject:</strong> {message.subject}</p>
      <p><strong>Message:</strong> {message.message}</p>
      <p><strong>Status:</strong> {message.read_status ? "Read" : "Unread"}</p>
      <Link to="/user-message" >
          <p>Back.</p>
        </Link>
    </div>
  );
};

export default MessageDetails;
