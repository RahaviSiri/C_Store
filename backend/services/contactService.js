const db = require('../config/db');

exports.contact = async ({ id, subject, message }) => {
  return new Promise((resolve, reject) => {
    const sqlInc = "INSERT INTO user_messages (user_id, subject, message) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE message = VALUES(message)";

    db.execute(sqlInc, [id, subject, message], (err, result) => {
      if (err) {
        console.error("Error adding contact message:", err);
        return reject("Error adding contact message.");
      }
      resolve("Contact message added successfully.");
    });
  });
};
