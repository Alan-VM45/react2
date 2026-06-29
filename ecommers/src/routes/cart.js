const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /cart - Página de carrito
router.get('/', cartController.getCartPage);

// POST /cart/add/:id - Agregar al carrito
router.post('/add/:id', cartController.postAddToCart);

// POST /cart/remove/:id - Quitar del carrito
router.post('/remove/:id', cartController.postRemoveFromCart);

// POST /cart/update/:id - Actualizar cantidad
router.post('/update/:id', cartController.postUpdateQuantity);

module.exports = router;