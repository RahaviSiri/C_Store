const db = require('../config/db');

exports.getOrderHistory = async (id) => {
    const query = `
        SELECT o.order_id, o.order_date, p.name AS product_name, oi.quantity, v.SKU, v.color, v.picture_url, s.shipment_status 
        FROM orders o
        JOIN order_item oi ON o.order_id = oi.order_id
        JOIN variant v ON oi.SKU = v.SKU
        JOIN product p ON v.SKU = p.SKU
        JOIN shipment s ON o.shipment_id = s.shipment_id
        WHERE o.customer_id = ?;
    `;

    try {
        const [rows] = await db.execute(query, [id]);
        return rows;
    } catch (error) {
        console.error('Error fetching order history:', error);
        throw error;
    }
};


exports.shipmentStatusFunct = ({ orderId }) => {
    return new Promise((resolve, reject) => {
        const updateQuery = `
            UPDATE shipment s
            JOIN orders o ON s.shipment_id = o.shipment_id
            SET s.shipment_status = 'Received'
            WHERE o.order_id = ?;
        `;

        db.query(updateQuery, [orderId], (error, result) => {
            if (error) {
                console.error('Error updating shipment status:', error);
                reject(error);
            } else {
                resolve('Shipment status updated to received');
            }
        });
    });
};
