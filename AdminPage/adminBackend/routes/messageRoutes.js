const express = require('express');
const {
  getAllMessages,
  getMessageById,
  markMessageAsRead
} = require('../controllers/messageController');

const router = express.Router();

// Route to get all messages
router.get('/api/messages', getAllMessages);

// Route to get a specific message by ID
router.get('/api/messages/:id', getMessageById);

// Route to mark a message as read
router.put('/api/messages/:id/read', markMessageAsRead);

module.exports = router;
