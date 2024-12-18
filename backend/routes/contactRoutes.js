const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/contact', contactController.contactUs);

module.exports = router;
