const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Define routes for users
router.post('/addToCart', cartController.addToCart);
router.post('/getCartItems', cartController.getCartItems);
router.post('/incrementItem', cartController.incrementItem);
router.post('/decrementItem', cartController.decrementItem);
router.post('/deleteItem', cartController.deleteItem);
router.post('/checkout',cartController.checkout);
// CartCount route
router.post('/cartCount', cartController.cartCount);

module.exports = router;