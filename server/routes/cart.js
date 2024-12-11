const express = require('express');
const ShoppingCart = require('../models/ShoppingCart');
const Product = require('../models/Products');
const { authenticate } = require('./auth'); // Import authentication middleware
const router = express.Router();

// Route to get a user's cart
router.get('/', authenticate, async (req, res) => {
    try {
        let cart = await ShoppingCart.findOne({ userId: req.user._id }).populate('items.id');
        if (!cart) {
            //If no cart is found, create new cart
            cart = new ShoppingCart({ userId: req.user._id, items: [] });
            await cart.save();  // Save cart on database
            console.log('New cart created for user');
        }
        res.status(200).json(cart.items);  // Return cart items
    } catch (error) {
        console.error('Error while fetching cart:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Route to add items to cart
router.post('/', authenticate, async (req, res) => {
    const { id, quantity } = req.body;

    try {
        // Verify if product id is valid
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'Product ID invalid. Type a positive integer ID.' });
        }

        const product = await Product.findOne({ id: id });  // Search product by ID
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Verify if quantity on cart is smaller than the stock
        if (quantity > product.stock) {
            return res.status(400).json({ message: 'Quantity exceeds current stock.' });
        }

        let cart = await ShoppingCart.findOne({ userId: req.user._id });
        if (!cart) {
            //Create cart if it does not exist
            cart = new ShoppingCart({ userId: req.user._id, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(item => item.id === id);
        if (existingItemIndex !== -1) {
            // Update quantity if product is already in cart
            cart.items[existingItemIndex].quantity = quantity;
        } else {
            // Add new item to cart
            cart.items.push({ id, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Cart updated successfully', cart: cart.items });
    } catch (error) {
        console.error('Error while updating cart:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Route to update quantity of a certain item on cart
router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        // Verify if ID is valid
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'Product ID invalid. Type a positive integer ID.' });
        }

        const product = await Product.findOne({ id: id });  // Search product by ID
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Verify if quantity on cart is smaller than the stock
        if (quantity > product.stock) {
            return res.status(400).json({ message: 'Quantity exceeds current stock' });
        }

        let cart = await ShoppingCart.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const existingItemIndex = cart.items.findIndex(item => parseInt(item.id) === parseInt(id));
        if (existingItemIndex !== -1) {
            // Update quantity of an already existing item
            cart.items[existingItemIndex].quantity = quantity;
            await cart.save();
            res.status(200).json({ message: 'Item quantity updated successfully', cart: cart.items });
        } else {
            return res.status(404).json({ message: 'Item is not on cart' });
        }
    } catch (error) {
        console.error('Error while updating cart:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});


// Route to remove item from cart
router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await ShoppingCart.findOne({ userId: req.user._id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Remove item from cart
        cart.items = cart.items.filter(item => item.id.toString() !== id.toString());
        await cart.save();

        res.status(200).json({ message: 'Item removed successfully', cart: cart.items });
    } catch (error) {
        console.error('Error while removing item from cart:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Route to clear cart and remove quantity from stock
// Only called upon purchase
router.delete('/', authenticate, async (req, res) => {
    try {
        const cart = await ShoppingCart.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Update stock
        for (let item of cart.items) {
            const product = await Product.findOne({ id: item.id });
            if (product) {
                product.stock -= item.quantity;         // Decrement from stock
                product.quantitySold += item.quantity;  // Increment to Quantity Sold
                await product.save();
            }
        }

        // Clear cart
        cart.items = [];
        await cart.save();

        res.status(200).json({ success: true, message: 'Cart reset and stocks updated.' });
    } catch (error) {
        console.error('Error while clearing cart:', error);
        res.status(500).json({ success: false, message: 'Error while clearing cart.' });
    }
});

module.exports = router;