const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes for users

router.post('/getProduct', productController.getProduct);
router.post('/getVariants', productController.getVariants);
router.post('/searchProducts', productController.searchProducts);

module.exports = router;
