const db = require('../config/db');

exports.getOrders = (req, res) => {
  const customerId = req.query.customerId;
  let sql = customerId
    ? 'SELECT order_id, order_date, total_price, payment_id, shipment_id FROM orders WHERE customer_id = ?'
    : 'SELECT order_id, order_date, total_price, customer_id, payment_id, shipment_id FROM orders';

  db.query(sql, customerId ? [customerId] : [], (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.json(results);
  });
};
