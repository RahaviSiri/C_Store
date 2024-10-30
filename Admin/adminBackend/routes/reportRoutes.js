const express = require('express');
const {
  getQuarterlySales,
  getTopSellingProducts
} = require('../controllers/reportController');

const router = express.Router();

// Route for quarterly sales report
router.get('/api/quarterly-sales/:year', getQuarterlySales);

// Route for top selling products
router.get('/api/top-selling-product', getTopSellingProducts);

module.exports = router;
