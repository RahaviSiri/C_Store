const express = require('express');
const {
  getProductInterestTrend,
  getMostSellingCategory
} = require('../controllers/productController');

const router = express.Router();

// Route for product interest trend
router.get('/api/product-interest-trend', getProductInterestTrend);

// Route for most selling product category
router.get('/api/most-selling-category', getMostSellingCategory);

module.exports = router;
