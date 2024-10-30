const mysql = require('mysql');

/* Connect Your DataBase*/

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Themiya1998',
  database: 'cstore_db',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = db;
