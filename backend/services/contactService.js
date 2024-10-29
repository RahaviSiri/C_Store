const db = require('../config/db');

exports.contact = async ({ id, subject, message }) => {
  const sqlInc = "INSERT INTO user_messages (user_id, subject, message) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE message = VALUES(message)";
  
  try {
    // Use db.execute() directly as a promise
    await db.execute(sqlInc, [id, subject, message]);
    return "Contact message added successfully.";
  } catch (err) {
    console.error("Error adding contact message:", err);
    throw new Error("Error adding contact message.");
  }
};
