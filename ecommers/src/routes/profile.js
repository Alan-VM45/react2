const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// GET /profile - Perfil
router.get('/', indexController.getProfile);

module.exports = router;