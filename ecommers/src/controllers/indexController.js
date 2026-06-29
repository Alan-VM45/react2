const cartService = require('../services/cartService');

function getLogin(req, res) {
  res.render('index', {
    error: null,
    username: '',
    cartCount: cartService.getCartItemCount(req.session)
  });
}

function postLogin(req, res) {
  const { username, password } = req.body;
  const errors = [];

  if (!username || username.trim().length < 3) {
    errors.push('El nombre de usuario debe tener al menos 3 caracteres.');
  }
  if (!password || password.trim().length < 4) {
    errors.push('La contraseña debe tener al menos 4 caracteres.');
  }

  if (errors.length > 0) {
    return res.render('index', {
      error: errors.join(' '),
      username,
      cartCount: cartService.getCartItemCount(req.session)
    });
  }

  req.session.user = { username };
  res.redirect('/home');
}

function getProfile(req, res) {
  res.render('profile', {
    cartCount: cartService.getCartItemCount(req.session)
  });
}

module.exports = {
  getLogin,
  postLogin,
  getProfile
};
