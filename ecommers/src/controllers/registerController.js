const cartService = require('../services/cartService');
// Podrías importar un userService aquí si quieres persistir en JSON, 
// por ahora mantengo la lógica del usuario con las validaciones del Sprint 2.

function getRegister(req, res) {
  res.render('register', {
    errors: [],
    oldData: {},
    cartCount: cartService.getCartItemCount(req.session)
  });
}

function postRegister(req, res) {
  const { username, email, password } = req.body;
  const errors = {};

  // Validaciones del Sprint 2 (US #3)
  if (!username || username.trim().length < 3) {
    errors.username = 'El nombre de usuario debe tener al menos 3 caracteres.';
  }
  if (!email || !email.includes('@')) {
    errors.email = 'Debes ingresar un correo válido.';
  }
  if (!password || password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.';
  }

  if (Object.keys(errors).length > 0) {
    return res.render('register', {
      errors,
      oldData: req.body,
      cartCount: cartService.getCartItemCount(req.session)
    });
  }

  // Si todo está bien, simulamos el registro
  req.session.user = { username, email };
  res.redirect('/');
}

module.exports = {
  getRegister,
  postRegister
};
