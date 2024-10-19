const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true 
};

app.use(cors(corsOptions));
app.use(express.static("public"));
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
    // If you are using a view engine, uncomment the following
    // res.render("pages/productcategory", { result: result });

    // For sending JSON data to the frontend:
    res.json(result);
  });
});

// Route setup
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');

app.use('/', userRoutes);
app.use('/', adminRoutes);
// app.use('/', categoryRoutes);

// Cart Start

const productRoutes = require('./routes/productRoutes');
app.use('/', productRoutes);

// Add cart item
app.post('/cart/add', (req, res) => {
  const { user_id, product_id, product_name, quantity, price } = req.body;

  pool.query(
    "INSERT INTO cart_items (user_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + 1",
    [user_id, product_id, product_name, quantity, price],
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
  const userId = 1;

  pool.query("SELECT * FROM cart_items WHERE user_id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Error fetching cart items:", err);
      return res.status(500).send("Error fetching cart items.");
    }
    res.json(results);
  });
});

// Increment cart item
app.put('/cart/increment/:id', (req, res) => {
  const id = req.params.id; // Use the id from the request parameters

  pool.query(
    "UPDATE cart_items SET quantity = quantity + 1 WHERE product_id = ?",
    [id], // Use product_id to update the correct item
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
  const id = req.params.id; // Use the id from the request parameters

  pool.query(
    "UPDATE cart_items SET quantity = quantity - 1 WHERE product_id = ? AND quantity > 1",
    [id], // Use product_id to update the correct item
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
  const id = req.params.id; // Use the id from the request parameters

  pool.query("DELETE FROM cart_items WHERE product_id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error removing cart item:", err);
      return res.status(500).send("Error removing cart item.");
    }
    res.send("Cart item removed successfully.");
  });
});

// Calculate total price of items in the cart
app.get('/cart/total/:userId', (req, res) => {
  const userId = req.params.userId;

  pool.query(
    "SELECT SUM(quantity * price) AS total FROM cart_items WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching total cart price:", err);
        return res.status(500).send("Error fetching total cart price.");
      }
      res.json({ total: results[0].total || 0 }); 
    }
  );
});

//Caluculate Count
app.get('/cart/count/:userId', (req, res) => {
  const userId = req.params.userId;

  pool.query(
    "SELECT COUNT(id) AS count FROM cart_items WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching total count:", err);
        return res.status(500).json({ error: "Error fetching total count." });
      }
      res.json({ count: results[0].count || 0 }); // Send the count value
    }
  );
});


// End cart

// Contact Start

app.post('/contact/add', (req, res) => {
  const { name, email, message } = req.body;

  pool.query(
    "INSERT INTO Contact (name, email, message) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE message = VALUES(message)",
    [name, email, message],
    (err, result) => {
      if (err) {
        console.error("Error adding contact message:", err);
        return res.status(500).send("Error adding contact message.");
      }
      res.send("Contact message added successfully.");
    }
  );
});

// Contact End

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}');
});