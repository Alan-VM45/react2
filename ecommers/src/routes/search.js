const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// GET /search - Búsqueda de productos
router.get('/', searchController.getSearchResults);

module.exports = router;
