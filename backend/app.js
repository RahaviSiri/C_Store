const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Database connection (MySQL pool setup)
const pool = mysql.createPool({
  host: process.env.HOST,
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Route to fetch product categories
app.get("/productcategory", (req, res) => {
  pool.query("SELECT * FROM products;", (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Database error.");
    }
    res.json(result);
  });
});

// Add cart item
app.post('/cart/add', (req, res) => {
  const { user_id, product_id, product_name, quantity, price } = req.body;

  pool.query(
    "INSERT INTO cart_items (user_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?",
    [user_id, product_id, product_name, quantity, price, quantity],
    (err, result) => {
      if (err) {
        console.error("Error adding item to cart:", err);
        return res.status(500).send("Error adding item to cart.");
      }
      res.send("Item added to cart successfully.");
    }
  );
});

// Get cart items
app.get('/cart/:userId', (req, res) => {
  const userId = req.params.userId;

  pool.query("SELECT * FROM cart_items WHERE user_id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Error fetching cart items:", err);
      return res.status(500).send("Error fetching cart items.");
    }
    res.json(results); // Ensure you send the results back as JSON
  });
});

// Increment cart item
app.put('/cart/increment/:id', (req, res) => {
  const id = req.params.id;

  pool.query(
    "UPDATE cart_items SET quantity = quantity + 1 WHERE product_id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error incrementing cart item:", err);
        return res.status(500).send("Error incrementing cart item.");
      }
      res.send("Cart item incremented successfully.");
    }
  );
});

// Decrement cart item
app.put('/cart/decrement/:id', (req, res) => {
  const id = req.params.id;

  pool.query(
    "UPDATE cart_items SET quantity = quantity - 1 WHERE product_id = ? AND quantity > 1",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error decrementing cart item:", err);
        return res.status(500).send("Error decrementing cart item.");
      }
      res.send("Cart item decremented successfully.");
    }
  );
});

// Remove cart item
app.delete('/cart/remove/:id', (req, res) => {
  const id = req.params.id;

  pool.query("DELETE FROM cart_items WHERE product_id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error removing cart item:", err);
      return res.status(500).send("Error removing cart item.");
    }
    res.send("Cart item removed successfully.");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
