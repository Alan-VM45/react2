const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/products', apiController.getProducts);
router.get('/products/:id', apiController.getProductById);
router.post('/products', apiController.createProduct);
router.put('/products/:id', apiController.updateProduct);
router.delete('/products/:id', apiController.deleteProduct);

router.get('/categories', apiController.getCategories);
router.get('/categories/products/:category', apiController.getProductsByCategory);
router.post('/categories', apiController.createCategory);
router.put('/categories/:id', apiController.updateCategory);
router.delete('/categories/:id', apiController.deleteCategory);

router.get('/stats', apiController.getStats);

module.exports = router;
