const db = require('../config/db');

exports.getProductInterestTrend = (req, res) => {
  const { sku, year } = req.query;
  if (!sku || !year) return res.status(400).json({ error: 'Please provide both SKU and year' });

  db.query(`CALL getSalesTrendByPeriod(?, ?)`, [sku, year], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results[0].map(row => ({ month: row.month, total_sales: row.total_sales })));
  });
};

exports.getMostSellingCategory = (req, res) => {
  const sql = `
    SELECT p.SKU, p.name, SUM(oi.quantity) AS total_quantity
    FROM order_item oi
    INNER JOIN product p ON oi.SKU = p.SKU
    GROUP BY p.SKU, p.name
    ORDER BY total_quantity DESC`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    res.json(results);
  });
};
