const productsService = require('../services/productsService');
const cartService = require('../services/cartService');

function getSearchResults(req, res) {
  // Obtener el término de búsqueda desde el query string
  const query = req.query.query || '';
  
  // Buscar productos usando el servicio existente
  const results = productsService.searchProducts(query);
  
  res.render('search', {
    query,
    results,
    resultCount: results.length,
    cartCount: cartService.getCartItemCount(req.session)
  });
}

module.exports = {
  getSearchResults
};
