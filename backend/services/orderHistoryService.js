const db = require('../config/db');

exports.orderHistoryFunct = ({ id }) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT o.order_id, o.order_date, p.name AS product_name, oi.quantity, v.SKU, v.color, v.picture_url, s.shipment_status 
            FROM orders o
            JOIN order_item oi ON o.order_id = oi.order_id
            JOIN variant v ON oi.SKU = v.SKU
            JOIN product p ON v.SKU = p.SKU
            JOIN shipment s ON o.shipment_id = s.shipment_id
            WHERE o.customer_id = ?;
        `;

        db.query(query, [id], (error, results) => {
            if (error) {
                console.error('Error fetching order history:', error);
                reject(error);
            } else {
                console.log('Fetched order history results:', results);
                resolve(results);
            }
        });
    });
};


exports.shipmentStatusFunct = ({ orderId }) => {
    return new Promise((resolve, reject) => {
        const updateQuery = `
            UPDATE shipment s
            JOIN orders o ON s.shipment_id = o.shipment_id
            SET s.shipment_status = 'received'
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
