const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// GET /register - Mostrar formulario
router.get('/', registerController.getRegister);

// POST /register - Procesar registro (US #3)
router.post('/', registerController.postRegister);

module.exports = router;