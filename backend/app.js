const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const db = require('./config/db');

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: 'http://localhost:5175', 
  credentials: true 
};

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());

// Database connection (MySQL pool setup)
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// Route to fetch product categories
app.get("/productcategory", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM category;");
    res.json(result);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error." });
  }
});

// Route setup
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cartRoutes = require('./routes/cartRoutes');
const contactRoutes = require('./routes/contactRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');

app.use('/', userRoutes);
app.use('/', adminRoutes);
app.use('/', cartRoutes);
// app.use('/cart', cartRoutes);
app.use('/', contactRoutes);

// Cart Start

const productRoutes = require('./routes/productRoutes');
app.use('/', productRoutes);

// Add cart item
// Add item to cart using stored procedure
app.post('/cart/add', (req, res) => {
  const { user_id, product_id, product_name, quantity, price } = req.body;

// <<<<<<< suki008_about_us-changed
  const query = `CALL addToCart(?, ?, ?, ?, ?)`;

  pool.query(query, [user_id, product_id, product_name, quantity, price], (err, result) => {
    if (err) {
      console.error("Error calling addToCart procedure:", err);
      return res.status(500).send("Error adding item to cart.");

//   pool.query(
//     "INSERT INTO cart_item (user_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + 1",
//     [user_id, product_id, product_name, quantity, price],
//     (err, result) => {
//       if (err) {
//         console.error("Error adding item to cart:", err);
//         return res.status(500).send("Error adding item to cart.");
//       }
//       res.send("Item added to cart successfully.");

    }
    res.send("Item added to cart successfully.");
  });
});


// Get cart items
app.get('/cart/:userId', (req, res) => {
  const userId = 1;

  pool.query("SELECT * FROM cart_item WHERE user_id = ?", [userId], (err, results) => {
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
    "UPDATE cart_item SET quantity = quantity + 1 WHERE product_id = ?",
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
    "UPDATE cart_item SET quantity = quantity - 1 WHERE product_id = ? AND quantity > 1",
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

  pool.query("DELETE FROM cart_item WHERE product_id = ?", [id], (err, result) => {
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
    "SELECT SUM(quantity * price) AS total FROM cart_item WHERE user_id = ?",
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
    "SELECT SUM(quantity) AS count FROM cart_item WHERE user_id = ?",
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

// app.post('/contact/add', (req, res) => {
//   const { userId, subject, message } = req.body;

//   pool.query(
//     "INSERT INTO user_messages (user_id, subject, message) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE message = VALUES(message)",
//     [userId, subject, message],
//     (err, result) => {
//       if (err) {
//         console.error("Error adding contact message:", err);
//         return res.status(500).send("Error adding contact message.");
//       }
//       res.send("Contact message added successfully.");
//     }
//   );
// });

// Contact End

// OrderHistory 

// const categoryRoutes = require('./routes/categoryRoutes');


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

