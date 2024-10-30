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

  const sql = "CALL getTopSellingProducts(?, ?)";
  
  db.query(sql, [start_date, end_date], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    res.json(results[0]);
  });
};
/*
// productController.js
exports.getTopSellingProducts = async (req, res) => {
  const { start_date, end_date } = req.query;

  if (!start_date || !end_date) {
    return res.status(400).json({ error: 'Please provide both start and end dates.' });
  }

  try {
    const [results] = await db.query("CALL getTopSellingProducts(?, ?)", [start_date, end_date]);
    res.json(results[0]); // Adjust based on how the structure is returned
  } catch (error) {
    res.status(500).json({ error: 'Failed to call stored procedure' });
  }
};

*/
