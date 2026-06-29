const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// GET /home - Página principal
router.get('/', homeController.getHome);

module.exports = router;