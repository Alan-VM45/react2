const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /categories/:category
router.get('/:category', productController.getByCategory);

module.exports = router;
