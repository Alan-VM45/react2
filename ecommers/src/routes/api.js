const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/products', apiController.getProducts);
router.get('/products/:id', apiController.getProductById);
router.get('/categories', apiController.getCategories);
router.get('/categories/:category', apiController.getProductsByCategory);
router.get('/stats', apiController.getStats);

module.exports = router;
