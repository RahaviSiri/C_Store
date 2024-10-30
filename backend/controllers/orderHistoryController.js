const userService = require("../services/userService");
const orderHistoryService = require("../services/orderHistoryService");

exports.orderHistory = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const id = await userService.getUserID(token);
        const orderHistoryResponse = await orderHistoryService.getOrderHistory(id);
        res.status(200).json({ orderHistoryResponse });
    } catch (error) {
        console.error('Failed to fetch order history:', error);
        res.status(500).json({ message: 'Failed to fetch order history', error: error.message });
    }
};

exports.shipmentStatus = async (req, res) => {
    try {
        const message = await orderHistoryService.shipmentStatusFunct({ orderId: req.body.order_id });
        res.status(200).json({ message });
    } catch (error) {
        console.error('Failed to update shipment status:', error);
        res.status(500).json({ message: 'Failed to update shipment status', error: error.message });
    }
};
