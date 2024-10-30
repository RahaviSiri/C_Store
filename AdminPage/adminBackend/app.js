const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const messageRoutes = require('./routes/messageRoutes');
const productRoutes = require('./routes/productRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use(orderRoutes);
app.use(messageRoutes);
app.use(productRoutes);
app.use(reportRoutes);

module.exports = app;
