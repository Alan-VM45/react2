const productsService = require('../services/productsService');

function getProducts(req, res) {

    const { search = '', category = '', sort = '' } = req.query;

    let products = productsService.getFilteredProducts({ search, category });

    if (sort === 'asc' || sort === 'desc') {
        products = productsService.sortByPrice(products, sort);
    }

    return res.status(200).json(products);
}

function getProductById(req, res) {
    const normalizedId = productsService.normalizeId(req.params.id);

    if (!normalizedId.isValid) {
        return res.status(normalizedId.statusCode).json({
        error: normalizedId.error
        });
    }

    const product = productsService.getProductById(normalizedId.id);

    if (!product) {
        return res.status(404).json({
        error: 'El producto no existe.'
        });
    }

    return res.status(200).json(product);
}

function getCategories(req, res) {
    const categories = productsService.getAllCategories();
    return res.status(200).json(categories);
}

function getProductsByCategory(req, res) {
    const category = req.params.category;
    const products = productsService.getProductsByCategory(category);
    return res.status(200).json(products);
}

function getStats(req, res) {
    const stats = productsService.getStats();
    return res.status(200).json(stats);
}

module.exports = {
    getProducts,
    getProductById,
    getCategories,
    getProductsByCategory,
    getStats
};
