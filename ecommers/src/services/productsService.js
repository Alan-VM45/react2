const db = require('../../db/database');

/**
 * Normaliza y valida un ID de producto contra la base de datos.
 * @param {*} id - ID a normalizar
 * @returns {object} { isValid: boolean, id: number|null, statusCode: number, error: string|null }
 */
function normalizeId(id) {
  const numId = Number(id);
  
  if (isNaN(numId) || !Number.isInteger(numId) || numId <= 0) {
    return {
      isValid: false,
      id: null,
      statusCode: 400,
      error: 'El ID debe ser un número válido y positivo.'
    };
  }
  
  // Validar si existe en la base de datos
  try {
    const productExists = db.prepare('SELECT 1 FROM products WHERE id = ?').get(numId);
    if (!productExists) {
      return {
        isValid: false,
        id: null,
        statusCode: 404,
        error: 'El producto no existe.'
      };
    }
  } catch (error) {
    console.error('Error al validar ID en BD:', error);
    return {
      isValid: false,
      id: null,
      statusCode: 500,
      error: 'Error interno de la base de datos.'
    };
  }
  
  return {
    isValid: true,
    id: numId,
    statusCode: 200,
    error: null
  };
}

/**
 * Lee todos los productos de la base de datos SQLite
 */
function getAllProducts() {
  try {
    const stmt = db.prepare('SELECT * FROM products');
    const rows = stmt.all();
    return rows.map(r => ({
      ...r,
      top: r.top === 1 || r.top === true,
      suggestions: JSON.parse(r.suggestions || '[]')
    }));
  } catch (error) {
    console.error('Error al obtener productos de SQLite:', error);
    return [];
  }
}

/**
 * Obtiene un producto por ID desde SQLite
 * @param {number} id - ID del producto
 */
function getProductById(id) {
  try {
    const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
    const row = stmt.get(id);
    if (!row) return null;
    return {
      ...row,
      top: row.top === 1 || row.top === true,
      suggestions: JSON.parse(row.suggestions || '[]')
    };
  } catch (error) {
    console.error('Error al obtener producto por ID desde SQLite:', error);
    return null;
  }
}

/**
 * Busca productos por término usando SQL LIKE
 * @param {string} term - Término de búsqueda
 */
function searchProducts(term) {
  const searchTerm = String(term || '').trim();
  if (searchTerm === '') {
    return getAllProducts();
  }
  try {
    const wild = `%${searchTerm}%`;
    const stmt = db.prepare(`
      SELECT * FROM products 
      WHERE title LIKE ? OR description LIKE ? OR category LIKE ?
    `);
    const rows = stmt.all(wild, wild, wild);
    return rows.map(r => ({
      ...r,
      top: r.top === 1 || r.top === true,
      suggestions: JSON.parse(r.suggestions || '[]')
    }));
  } catch (error) {
    console.error('Error al buscar productos en SQLite:', error);
    return [];
  }
}

/**
 * Obtiene productos por categoría desde SQLite
 * @param {string} category - Nombre de la categoría
 */
function getProductsByCategory(category) {
  const normalized = String(category || '').trim();
  if (!normalized) {
    return getAllProducts();
  }
  try {
    const stmt = db.prepare('SELECT * FROM products WHERE LOWER(category) = LOWER(?)');
    const rows = stmt.all(normalized);
    return rows.map(r => ({
      ...r,
      top: r.top === 1 || r.top === true,
      suggestions: JSON.parse(r.suggestions || '[]')
    }));
  } catch (error) {
    console.error('Error al obtener productos por categoría en SQLite:', error);
    return [];
  }
}

/**
 * Obtiene productos filtrados por búsqueda y categoría usando SQL
 * @param {object} filters - Filtros a aplicar { search, category }
 */
function getFilteredProducts({ search, category }) {
  try {
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    
    if (category) {
      sql += ' AND LOWER(category) = LOWER(?)';
      params.push(String(category).trim());
    }
    
    if (search) {
      sql += ' AND (title LIKE ? OR description LIKE ? OR category LIKE ?)';
      const wild = `%${String(search).trim()}%`;
      params.push(wild, wild, wild);
    }
    
    const stmt = db.prepare(sql);
    const rows = stmt.all(...params);
    return rows.map(r => ({
      ...r,
      top: r.top === 1 || r.top === true,
      suggestions: JSON.parse(r.suggestions || '[]')
    }));
  } catch (error) {
    console.error('Error al obtener productos filtrados en SQLite:', error);
    return [];
  }
}

/**
 * Obtiene los top 10 productos desde SQLite
 */
function getTopProducts() {
  try {
    const topStmt = db.prepare('SELECT * FROM products WHERE top = 1');
    const topRows = topStmt.all().map(r => ({
      ...r,
      top: true,
      suggestions: JSON.parse(r.suggestions || '[]')
    }));
    
    if (topRows.length >= 10) {
      return topRows.slice(0, 10);
    }
    
    const otherStmt = db.prepare('SELECT * FROM products WHERE top = 0 ORDER BY RANDOM()');
    const otherRows = otherStmt.all().map(r => ({
      ...r,
      top: false,
      suggestions: JSON.parse(r.suggestions || '[]')
    }));
    
    return [...topRows, ...otherRows].slice(0, 10);
  } catch (error) {
    console.error('Error al obtener top products de SQLite:', error);
    return [];
  }
}

/**
 * Obtiene productos sugeridos desde SQLite
 * @param {object} product - Producto del cual obtener sugerencias
 */
function getSuggestedProducts(product) {
  try {
    if (!product || !product.suggestions || !Array.isArray(product.suggestions) || product.suggestions.length === 0) {
      const stmt = db.prepare('SELECT * FROM products ORDER BY RANDOM() LIMIT 5');
      const rows = stmt.all();
      return rows.map(r => ({
        ...r,
        top: r.top === 1 || r.top === true,
        suggestions: JSON.parse(r.suggestions || '[]')
      }));
    }
    
    const placeholders = product.suggestions.map(() => '?').join(',');
    const stmt = db.prepare(`SELECT * FROM products WHERE id IN (${placeholders})`);
    const rows = stmt.all(...product.suggestions);
    return rows.map(r => ({
      ...r,
      top: r.top === 1 || r.top === true,
      suggestions: JSON.parse(r.suggestions || '[]')
    }));
  } catch (error) {
    console.error('Error al obtener sugerencias en SQLite:', error);
    return [];
  }
}

/**
 * Obtiene productos relacionados por categoría usando SQLite RANDOM()
 * @param {object} product - Producto del cual obtener relacionados
 * @param {number} limit - Límite de productos (default 4)
 */
function getRelatedProducts(product, limit = 4) {
  if (!product || !product.category) {
    return [];
  }
  try {
    const stmt = db.prepare('SELECT * FROM products WHERE LOWER(category) = LOWER(?) AND id <> ? ORDER BY RANDOM() LIMIT ?');
    const rows = stmt.all(product.category, product.id, limit);
    return rows.map(r => ({
      ...r,
      top: r.top === 1 || r.top === true,
      suggestions: JSON.parse(r.suggestions || '[]')
    }));
  } catch (error) {
    console.error('Error al obtener relacionados en SQLite:', error);
    return [];
  }
}

/**
 * Ordena productos por precio
 * @param {array} products - Array de productos a ordenar
 * @param {string} direction - 'asc' para ascendente, 'desc' para descendente
 */
function sortByPrice(products, direction = 'asc') {
  if (!Array.isArray(products) || products.length === 0) {
    return products;
  }
  
  const normalized = String(direction || 'asc').toLowerCase().trim();
  
  if (normalized === 'desc') {
    return [...products].sort((a, b) => b.price - a.price);
  }
  
  return [...products].sort((a, b) => a.price - b.price);
}

module.exports = {
  normalizeId,
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  getFilteredProducts,
  getTopProducts,
  getSuggestedProducts,
  getRelatedProducts,
  sortByPrice
};
