const productsService = require('./productsService');

/**
 * Obtiene el contador de items en el carrito
 * @param {object} session - Sesión del usuario
 */
function getCartItemCount(session) {
  if (!session || !session.cart) {
    return 0;
  }
  return session.cart.reduce((count, item) => count + (item.quantity || 0), 0);
}

/**
 * Obtiene el carrito completo
 * @param {object} session - Sesión del usuario
 */
function getCart(session) {
  return (session && session.cart) ? session.cart : [];
}

/**
 * Agrega un producto al carrito
 * @param {object} session - Sesión del usuario
 * @param {number} productId - ID del producto
 * @param {number} quantity - Cantidad (default 1)
 */
function addToCart(session, productId, quantity = 1) {
  if (!session) {
    return { success: false, error: 'No se pudo acceder a la sesión.' };
  }
  
  if (!session.cart) {
    session.cart = [];
  }

  // Validar que el producto existe y tiene stock
  const product = productsService.getProductById(productId);
  if (!product) {
    return { success: false, error: 'El producto no existe.' };
  }
  
  if (product.stock === 0) {
    return { success: false, error: 'El producto no está disponible.' };
  }

  const item = session.cart.find((entry) => entry.id === productId);
  if (item) {
    item.quantity += quantity;
  } else {
    session.cart.push({ id: productId, quantity });
  }

  return { success: true };
}

/**
 * Quita un producto del carrito
 * @param {object} session - Sesión del usuario
 * @param {number} productId - ID del producto
 */
function removeFromCart(session, productId) {
  if (!session || !session.cart) return;
  session.cart = session.cart.filter((item) => item.id !== productId);
}

/**
 * Actualiza la cantidad de un producto en el carrito
 * @param {object} session - Sesión del usuario
 * @param {number} productId - ID del producto
 * @param {number} quantity - Nueva cantidad
 */
function updateQuantity(session, productId, quantity) {
  if (!session) {
    return { success: false, error: 'No se pudo acceder a la sesión.' };
  }
  
  if (!session.cart) {
    session.cart = [];
  }

  const item = session.cart.find((entry) => entry.id === productId);
  if (!item) {
    return { success: false, error: 'Producto no encontrado en el carrito.' };
  }

  if (quantity <= 0) {
    removeFromCart(session, productId);
    return { success: true };
  }

  item.quantity = quantity;
  return { success: true };
}

/**
 * Vacía el carrito
 * @param {object} session - Sesión del usuario
 */
function clearCart(session) {
  if (!session) return;
  session.cart = [];
}

/**
 * Calcula el total del carrito
 * @param {object} session - Sesión del usuario
 */
function calculateTotal(session) {
  const cart = getCart(session);
  let total = 0;

  cart.forEach((item) => {
    const product = productsService.getProductById(item.id);
    if (product) {
      total += product.price * item.quantity;
    }
  });

  return total;
}

/**
 * Construye un array de items del carrito con información del producto
 * @param {object} session - Sesión del usuario
 */
function buildCartItems(session) {
  const rawCart = getCart(session);
  return rawCart.map((item) => {
    const product = productsService.getProductById(item.id);
    return {
      ...item,
      product,
      subtotal: product ? product.price * item.quantity : 0
    };
  });
}

module.exports = {
  getCartItemCount,
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  calculateTotal,
  buildCartItems
};
