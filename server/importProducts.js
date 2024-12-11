const mongoose = require('mongoose');
const Product = require('./models/Products'); // Mongo model path
const products = require('../scripts/products');

async function importProducts() {
    try {
        await mongoose.connect('mongodb://localhost:27017/online-store');
        console.log('Conectado ao MongoDB.');

        // Adjust fields to fit mongo model
        const formattedProducts = products.map(product => ({
            id: product.id, // Maps id
            title: product.title,
            artist: product.artist,
            price: product.price,
            description: product.description,
            image: product.image,
            genre: product.genre,
            tracklist: product.tracklist,
            singles: product.singles,
            stock: product.stock,
            quantitySold: product.quantitySold,
        }));

        // Insert products on database
        await Product.insertMany(formattedProducts);
        console.log('Products imported succesfully!');
    } catch (error) {
        console.error('Error while importing products:', error);
    } finally {
        mongoose.connection.close();
    }
}

importProducts();
