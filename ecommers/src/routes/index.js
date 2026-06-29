const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const cartController = require('../controllers/cartController');

/* GET login page. */
router.get('/', indexController.getLogin);

// POST /home - Procesar login
router.post('/home', indexController.postLogin);

// GET /checkout - Vista temporal (US #5)
router.get('/checkout', cartController.getCheckout);

module.exports = router;