const cartService = require('../services/cartService');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.addToCart = async (req, res) => {
    const { token, product_id, product_name, quantity, price } = req.body;
}

exports.getCartItems = async (req, res) => {
    const token = req.body.token;
    //const id = await cartService.getUserID(token);
    const id = 1;
    console.log(id);
    try {
        const cart_id = await cartService.getCartID(id);
        //console.log(cart_id);
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

exports.checkout = async (req, res) => {

}