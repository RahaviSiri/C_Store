const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

//Routes for admin
router.post('/quarterlySalesReport', adminController.quarterlySalesReport);
router.post('/topSellingProducts', adminController.topSellingProducts);
router.get('/salesByCategory', adminController.salesByCategory);
router.post('/productInterestTrends', adminController.productInterestTrends);
router.get('/customerDetails', adminController.customerDetails);
router.post('/customerOrderReport', adminController.customerOrderReport);
router.get('/viewCustomerMessages', adminController.viewCustomerMessages);

module.exports = router;
