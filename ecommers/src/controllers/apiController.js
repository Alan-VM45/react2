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

function createProduct(req, res) {
    const payload = req.body;

    if (!payload || !payload.title || payload.price === undefined || payload.stock === undefined) {
        return res.status(400).json({ error: 'Título, precio y stock son obligatorios.' });
    }

    try {
        const product = productsService.createProduct(payload);
        return res.status(201).json(product);
    } catch (error) {
        console.error('Error creando producto:', error);
        return res.status(500).json({ error: 'No se pudo crear el producto.' });
    }
}

function updateProduct(req, res) {
    const normalizedId = productsService.normalizeId(req.params.id);
    if (!normalizedId.isValid) {
        return res.status(normalizedId.statusCode).json({ error: normalizedId.error });
    }

    const payload = req.body;
    if (!payload || !payload.title || payload.price === undefined || payload.stock === undefined) {
        return res.status(400).json({ error: 'Título, precio y stock son obligatorios.' });
    }

    try {
        const product = productsService.updateProduct(normalizedId.id, payload);
        if (!product) {
            return res.status(404).json({ error: 'El producto no existe.' });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error actualizando producto:', error);
        return res.status(500).json({ error: 'No se pudo actualizar el producto.' });
    }
}

function deleteProduct(req, res) {
    const normalizedId = productsService.normalizeId(req.params.id);
    if (!normalizedId.isValid) {
        return res.status(normalizedId.statusCode).json({ error: normalizedId.error });
    }

    try {
        const success = productsService.deleteProduct(normalizedId.id);
        if (!success) {
            return res.status(404).json({ error: 'El producto no existe.' });
        }
        return res.status(200).json({ message: 'Producto eliminado correctamente.' });
    } catch (error) {
        console.error('Error eliminando producto:', error);
        return res.status(500).json({ error: 'No se pudo eliminar el producto.' });
    }
}

function createCategory(req, res) {
    const name = String(req.body?.name || '').trim();
    if (!name) {
        return res.status(400).json({ error: 'El nombre de la categoría es obligatorio.' });
    }

    try {
        const category = productsService.createCategory(name);
        return res.status(201).json(category);
    } catch (error) {
        console.error('Error creando categoría:', error);
        return res.status(500).json({ error: 'No se pudo crear la categoría.' });
    }
}

function updateCategory(req, res) {
    const normalizedId = productsService.normalizeCategoryId(req.params.id);
    if (!normalizedId.isValid) {
        return res.status(normalizedId.statusCode).json({ error: normalizedId.error });
    }

    const name = String(req.body?.name || '').trim();
    if (!name) {
        return res.status(400).json({ error: 'El nombre de la categoría es obligatorio.' });
    }

    try {
        const category = productsService.updateCategory(normalizedId.id, name);
        if (!category) {
            return res.status(404).json({ error: 'La categoría no existe.' });
        }
        return res.status(200).json(category);
    } catch (error) {
        console.error('Error actualizando categoría:', error);
        return res.status(500).json({ error: 'No se pudo actualizar la categoría.' });
    }
}

function deleteCategory(req, res) {
    const normalizedId = productsService.normalizeCategoryId(req.params.id);
    if (!normalizedId.isValid) {
        return res.status(normalizedId.statusCode).json({ error: normalizedId.error });
    }

    try {
        const success = productsService.deleteCategory(normalizedId.id);
        if (!success) {
            return res.status(404).json({ error: 'La categoría no existe.' });
        }
        return res.status(200).json({ message: 'Categoría eliminada correctamente.' });
    } catch (error) {
        console.error('Error eliminando categoría:', error);
        return res.status(500).json({ error: 'No se pudo eliminar la categoría.' });
    }
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
    createProduct,
    updateProduct,
    deleteProduct,
    createCategory,
    updateCategory,
    deleteCategory,
    getStats
};
