const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

function getAllProducts() {
  const productsJSON = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(productsJSON);
}

function getProductById(id) {
  const products = getAllProducts();
  const productId = Number(id);
  return products.find((product) => product.id === productId);
}

function searchProducts(term) {
  const products = getAllProducts();
  const searchTerm = String(term || '').trim().toLowerCase();
  if (searchTerm === '') {
    return products;
  }
  return products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  });
}

function getProductsByCategory(category) {
  const products = getAllProducts();
  const normalized = String(category || '').trim().toLowerCase();
  if (!normalized) {
    return products;
  }
  return products.filter((product) => product.category.toLowerCase() === normalized);
}

function getTopProducts() {
  const products = getAllProducts();
  const topProducts = products.filter((product) => product.top);
  
  if (topProducts.length >= 10) {
    return topProducts.slice(0, 10);
  }
  
  // Si hay menos de 10, completar con aleatorios que no estén ya en la lista
  const otherProducts = products.filter((product) => !product.top);
  const shuffledOthers = otherProducts.sort(() => 0.5 - Math.random());
  
  return [...topProducts, ...shuffledOthers].slice(0, 10);
}

function getSuggestedProducts(product) {
  const products = getAllProducts();
  if (!product || !product.suggestions) {
    // US #6: Retornar 5 productos aleatorios
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }
  return products.filter((item) => product.suggestions.includes(item.id));
}

module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  getTopProducts,
  getSuggestedProducts
};
