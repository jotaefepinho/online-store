const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

// List all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});
// Route to search product by ID
router.get('/:id', async (req, res) => {
    const productId = parseInt(req.params.id, 10); // Guarantee type int 
    if (isNaN(productId)) {
        return res.status(400).json({ message: 'Invalid ID, ID should be a number.' });
    }
    try {
        const product = await Product.findOne({ id: productId }); // Search by ID
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error while searching product:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});


// Create Product
router.post('/', async (req, res) => {
    const { title, price, image, description, tracklist, singles, sampleUrl, artist, stock, quantitySold, genre } = req.body;

    try { 

        const formattedTracklist = {
            sideA: Array.isArray(tracklist?.sideA) ? tracklist.sideA : [],
            sideB: Array.isArray(tracklist?.sideB) ? tracklist.sideB : []
        };
        
        const formattedSingles = Array.isArray(singles) ? singles : [];
        const formattedGenre = Array.isArray(genre) ? genre : [];

        // Find largest ID on db to create an imediate next one
        const lastProduct = await Product.findOne().sort({ id: -1 }).exec();
        const newId = lastProduct ? lastProduct.id + 1 : 1;  // If there's no products, create with ID 1

        // Create product with generated ID
        const newProduct = new Product({
            id: newId,
            title,
            price,
            image,
            description,
            tracklist: formattedTracklist,
            singles: formattedSingles,
            sampleUrl,
            artist,
            stock,
            quantitySold,
            genre: formattedGenre
        });

        // Save new product
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Error while creating product:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Update product route
router.put('/:id', async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    if (isNaN(productId)) {
        return res.status(400).json({ message: 'Invalid ID, ID should be a number.' });
    }

    const { title, price, image, description, tracklist, singles, sampleUrl, genre } = req.body;

    try {
        const formattedTracklist = {
            sideA: Array.isArray(tracklist?.sideA) ? tracklist.sideA : [],
            sideB: Array.isArray(tracklist?.sideB) ? tracklist.sideB : []
        };

        const formattedSingles = Array.isArray(singles) ? singles : [];
        const formattedGenre = Array.isArray(genre) ? genre : [];

        // Update product
        const updatedProduct = await Product.findOneAndUpdate(
            { id: productId },
            { 
                title,
                price,
                image,
                description,
                tracklist: formattedTracklist,
                singles: formattedSingles,
                sampleUrl,
                genre: formattedGenre
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated succesfully', product: updatedProduct });
    } catch (error) {
        console.error('Error while updating product:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});


router.delete('/:id', async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    if (isNaN(productId)) {
        return res.status(400).json({ message: 'Invalid ID, ID should be a number' });
    }

    try {
        const deletedProduct = await Product.findOneAndDelete({ id: productId });

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error while deleting product:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

router.put('/:id', async (req, res) => {
    const { stock } = req.body;
    const productId = parseInt(req.params.id, 10);

    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { id: productId },
            { stock },
            { new: true }
        );
        
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error while updating product:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});


module.exports = router;
