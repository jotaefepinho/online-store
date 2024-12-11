const mongoose = require('mongoose');

// Cart Item model
const cartItemSchema = new mongoose.Schema({
    id: { type: Number, required: true }, // Product ID
    quantity: { type: Number, required: true, min: 1 }, // Quantity of product on Cart
});

// Shopping-cart model to associate with user id
const shoppingCartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Associate user id to cart
    items: [cartItemSchema], // Cart item list
});

// Creating models
const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;
