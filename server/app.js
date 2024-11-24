const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/onlineStore')
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

app.use('/pages', express.static(path.join(__dirname, '../pages')));
app.use('/styles', express.static(path.join(__dirname, '../styles')));
app.use('/scripts', express.static(path.join(__dirname, '../scripts')));
app.use('/images', express.static(path.join(__dirname, '../images')));

// Redirect to index.html for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages', 'index.html'));
});

// Export the app for use in server.js
module.exports = app;