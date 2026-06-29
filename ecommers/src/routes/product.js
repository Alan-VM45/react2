const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /product/:id - Página de producto
router.get('/:id', productController.getProductDetail);

module.exports = router;