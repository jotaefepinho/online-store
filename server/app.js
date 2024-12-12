//app.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const { router: authRoutes, authenticate } = require('./routes/auth'); // Importing authentication middleware

const productRoutes = require('./routes/products'); // Importing product routes
const cartRoutes = require('./routes/cart');        // Importing cart routes
const paymentRoutes = require('./routes/payment');  // Importing payment routes
const profileRoutes = require('./routes/profile');  // Importing profile routes

const app = express();
dotenv.config();

// Middlewares
app.use(express.json()); // Json interpreter
app.use('/auth', authRoutes);         // authentication routes
app.use('/products', productRoutes);  // product routes
app.use('/cart', cartRoutes);         // cart routes
app.use('/payment', paymentRoutes);   // payment routes
app.use('/profile', profileRoutes);   // profile routes

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/profile', profileRoutes);


app.use('/pages', express.static(path.join(__dirname, '../pages')));
app.use('/styles', express.static(path.join(__dirname, '../styles')));
app.use('/scripts', express.static(path.join(__dirname, '../scripts')));
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/samples', express.static(path.join(__dirname, '../samples')));

// Redirect to index.html for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages', 'index.html'));
});

// Export the app for use in server.js
module.exports = app;