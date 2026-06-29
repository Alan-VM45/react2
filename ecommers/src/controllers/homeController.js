const productsService = require('../services/productsService');
const cartService = require('../services/cartService');

function getHome(req, res) {
  const category = req.query.category || '';
  const search = req.query.search || '';
  const sort = req.query.sort || '';

  let products = productsService.getFilteredProducts({ search, category });
  
  if (sort === 'asc' || sort === 'desc') {
    products = productsService.sortByPrice(products, sort);
  }

  const topProducts = productsService.getTopProducts();
  const suggestedProducts = productsService.getSuggestedProducts();
  const popularProducts = productsService.getTopProducts();

  res.render('home', {
    products,
    topProducts,
    suggestedProducts,
    popularProducts,
    search,
    category,
    sort,
    cartCount: cartService.getCartItemCount(req.session)
  });
}

module.exports = {
  getHome
};
