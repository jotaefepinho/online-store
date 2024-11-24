const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.post('/', productController.addProduct); // Admin only
router.put('/:id', productController.updateProduct); // Admin only
router.delete('/:id', productController.deleteProduct); // Admin only

module.exports = router;
