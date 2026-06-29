const productsService = require('../services/productsService');
const cartService = require('../services/cartService');



function getCartPage(req, res) {
  const cartItems = cartService.buildCartItems(req.session);
  const total = cartService.calculateTotal(req.session);

  res.render('cart', {
    cart: cartItems,
    cartCount: cartService.getCartItemCount(req.session),
    total,
    error: null
  });
}

function postAddToCart(req, res) {
  // US #17: Validar y normalizar ID y existencia
  const normalizedId = productsService.normalizeId(req.params.id);
  if (!normalizedId.isValid) {
    return res.status(normalizedId.statusCode).render('errors/404', {
      cartCount: cartService.getCartItemCount(req.session)
    });
  }

  const product = productsService.getProductById(normalizedId.id);
  const result = cartService.addToCart(req.session, normalizedId.id);
  if (result.error) {
    const relatedProducts = productsService.getRelatedProducts(product, 4);
    return res.render('product', {
      product,
      relatedProducts,
      cartCount: cartService.getCartItemCount(req.session),
      error: result.error
    });
  }

  res.redirect('/cart');
}

function postRemoveFromCart(req, res) {
  const normalizedId = productsService.normalizeId(req.params.id);
  if (normalizedId.isValid) {
    cartService.removeFromCart(req.session, normalizedId.id);
  }
  res.redirect('/cart');
}

function postUpdateQuantity(req, res) {
  const quantity = Number(req.body.quantity);
  const normalizedId = productsService.normalizeId(req.params.id);
  
  if (!normalizedId.isValid) {
    const cartItems = cartService.buildCartItems(req.session);
    const total = cartService.calculateTotal(req.session);
    return res.render('cart', {
      cart: cartItems,
      cartCount: cartService.getCartItemCount(req.session),
      total,
      error: 'ID de producto inválido.'
    });
  }

  const result = cartService.updateQuantity(req.session, normalizedId.id, quantity);

  if (result.error) {
    const cartItems = cartService.buildCartItems(req.session);
    const total = cartService.calculateTotal(req.session);
    return res.render('cart', {
      cart: cartItems,
      cartCount: cartService.getCartItemCount(req.session),
      total,
      error: result.error
    });
  }

  res.redirect('/cart');
}

function getCheckout(req, res) {
  res.render('checkout', {
    cartCount: cartService.getCartItemCount(req.session)
  });
}

module.exports = {
  getCartPage,
  postAddToCart,
  postRemoveFromCart,
  postUpdateQuantity,
  getCheckout
};
