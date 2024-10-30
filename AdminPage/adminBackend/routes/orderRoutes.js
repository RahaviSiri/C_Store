const express = require('express');
const { getOrders } = require('../controllers/orderController');
const router = express.Router();

router.get('/api/orders', getOrders);

module.exports = router;
