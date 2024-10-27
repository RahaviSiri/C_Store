const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticateJWT = require('../middlewares/authMiddleware');

// Define routes for users
router.post('/addToCart', cartController.addToCart);
router.post('/getCartItems', cartController.getCartItems);
router.post('/incrementItem', cartController.incrementItem);
router.post('/decrementItem', cartController.decrementItem);
router.post('/deleteItem', cartController.deleteItem);
router.post('/checkout',cartController.checkout);
router.post('/cartCount', cartController.cartCount);

module.exports = router;