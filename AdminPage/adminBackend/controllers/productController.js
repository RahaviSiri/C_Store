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
  const sql = `SELECT * FROM MostSellingCategory`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    res.json(results);
  });
};
