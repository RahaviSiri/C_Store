const db = require('../config/db');

exports.getQuarterlySales = (req, res) => {
  const year = req.params.year;
  db.query(`CALL getQuarterlySales(?)`, [year], (err, results) => {
    if (err) return res.status(500).send('Failed to fetch quarterly sales report');
    res.json(results[0]);
  });
};

exports.getTopSellingProducts = (req, res) => {
  const { start_date, end_date } = req.query;
  if (!start_date || !end_date) return res.status(400).json({ error: 'Please provide both start and end dates.' });

  const sql = `
    SELECT p.SKU, p.name, SUM(oi.quantity) AS total_quantity
    FROM order_item oi
    INNER JOIN product p ON oi.SKU = p.SKU
    INNER JOIN orders o ON oi.order_id = o.order_id
    WHERE o.order_date BETWEEN ? AND ?
    GROUP BY p.SKU, p.name
    ORDER BY total_quantity DESC`;

  db.query(sql, [start_date, end_date], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    res.json(results);
  });
};
