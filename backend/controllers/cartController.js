const cartService = require('../services/cartService');
// const userService = require('../services/userService');
// const jwt = require('jsonwebtoken');
// const db = require('../config/db');

exports.addToCart = async (req, res) => {
    const { token, variant_id,quantity,} = req.body;
    try {
        const id = await cartService.getUserID(token);
        cartService.addToCart(id,variant_id,quantity);
        res.status(201).json({message: 'Item added to the cart'});
    } catch (error) {
        res.status(404).json({ message: 'Failed to add items to cart', error: error.message });
    }
}

exports.getCartItems = async (req, res) => {
    const token = req.body.token;
    const id = await cartService.getUserID(token);
    //const id = 2;
    //console.log(id);
    try {
        const cart_id = await cartService.getCartID(id);
        console.log(cart_id);
        const cartItems = await cartService.getCartItems(id);
        console.log(cartItems);
        const cart_total = await cartService.getCartTotal(cart_id);
        //console.log(cart_total);
        res.status(201).json({message: 'Cart items Fetched', cart_id, cartItems, cart_total});
    } catch (error) {
        res.status(401).json({ message: 'Failed get cart items', error: error.message });
    }
}

exports.incrementItem = async (req, res) => {
    console.log(req);
    const {cart_id, variant_id} = req.body;
    //console.log(cart_id, variant_id);
    try {
        const inc = await cartService.incrementItem(cart_id, variant_id);
        res.status(201).json({message: 'item incremented!'});
    } catch (error) {
        res.status(401).json({ message: 'Failed to increment item', error: error.message });
    }
}

exports.decrementItem = async (req, res) => {
    const {cart_id, variant_id} = req.body;
    try {
        const inc = await cartService.decrementItem(cart_id, variant_id);
        res.status(201).json({message: 'item decremented!'});
    } catch (error) {
        res.status(401).json({ message: 'Failed to decrement item', error: error.message });
    }
}

exports.deleteItem = async (req, res) => {
    const {cart_id, variant_id} = req.body;
    try {
        const inc = await cartService.deleteItem(cart_id, variant_id);
        res.status(201).json({message: 'item deleted!'});
    } catch (error) {
        res.status(401).json({ message: 'Failed to delete item', error: error.message });
    }
}

exports.getCheckoutItems = async (req, res) => {
    const {combination, cart_id} = req.body;
    try {
        const checkoutItems = await cartService.getCheckoutItems(combination, cart_id);
        res.status(201).json({message: 'Checkout items fetched', checkoutItems});
    } catch (error) {
        res.status(401).json({ message: 'Failed to get checkout items', error: error.message });
    }
}

exports.checkout = async (req, res) => {
    const {combination, cart_id, paymentMethod} = req.body;
    try {
        await cartService.checkout(cart_id, paymentMethod, combination);
        res.status(201).json({message: 'Checkout successful'});
    } catch (error) {
        res.status(401).json({ message: 'Failed to checkout', error: error.message });
    }
}

exports.cartCount = async (req, res) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);
    const token = authHeader && authHeader.split(' ')[1]; 
    console.log('Authorization Header:', token);
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    try {
      const id = await cartService.getUserID(token);
      console.log(id);
      const cartCount = await cartService.getCartCount(id); 
      res.status(200).json({ message: 'Cart count fetched', cartCount });
    } catch (error) {
      console.error("Error fetching cart count:", error);
      res.status(401).json({ message: 'Failed to get cart items', error: error.message });
    }
};
  
  


