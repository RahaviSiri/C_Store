const cartService = require('../services/cartService');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.addToCart = async (req, res) => {
    const { token, product_id, product_name, quantity, price } = req.body;
}

exports.getCartItems = async (req, res) => {
    const token = req.body.token;
    const id = await cartService.getUserID(token);
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
    const {cart_id, varient_id} = req.body;
}

exports.decrementItem = async (req, res) => {
    const {cart_id, varient_id} = req.body;
}

exports.deleteItem = async (req, res) => {
    const {cart_id, varient_id} = req.body;
}

exports.checkout = async (req, res) => {

}