const db = require('../config/db');

exports.getAllMessages = (req, res) => {
  db.query('SELECT * FROM user_message', (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.json(results);
  });
};

exports.getMessageById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM user_message WHERE message_id = ?', [id], (err, result) => {
    if (err) return res.status(500).send('Server error');
    res.json(result[0] || {});
  });
};

exports.markMessageAsRead = (req, res) => {
  const { id } = req.params;
  db.query('UPDATE user_message SET read_status = 1 WHERE message_id = ?', [id], (err, result) => {
    if (err) return res.status(500).send('Server error');
    res.json({ message: 'Message marked as read', result });
  });
};
