const express = require('express');
const router = express.Router();
const orderHistoryController = require('../controllers/orderHistoryController');

router.post('/orderHistory', orderHistoryController.orderHistory);
router.post('/shipmentStatus', orderHistoryController.shipmentStatus);

module.exports = router;