const fs = require('fs');
const path = require('path');
const db = require('./db/database');

console.log('Iniciando migración...');

try {
  // 1. Ejecutar schema.sql para crear las tablas
  const schemaPath = path.join(__dirname, 'migrations', 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schemaSql);
  console.log('Tablas inicializadas/verificadas en la base de datos.');

  // 2. Leer products.json
  const productsJsonPath = path.join(__dirname, 'src', 'data', 'products.json');
  if (fs.existsSync(productsJsonPath)) {
    const productsData = fs.readFileSync(productsJsonPath, 'utf8');
    const products = JSON.parse(productsData);

    // 3. Preparar inserción de productos con INSERT OR IGNORE
    const insertStmt = db.prepare(`
      INSERT OR IGNORE INTO products (id, title, image, description, price, category, stock, top, suggestions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Usar transacción para rapidez y seguridad
    const runMigration = db.transaction((productList) => {
      for (const product of productList) {
        insertStmt.run(
          product.id,
          product.title,
          product.image || null,
          product.description || null,
          product.price,
          product.category || null,
          product.stock !== undefined ? product.stock : 0,
          product.top ? 1 : 0,
          JSON.stringify(product.suggestions || [])
        );
      }
    });

    runMigration(products);
    console.log(`Migración de productos completada: se procesaron ${products.length} productos.`);
  } else {
    console.log('products.json no encontrado, omitiendo paso de inserción.');
  }

} catch (error) {
  console.error('Error durante la migración:', error);
  process.exit(1);
}

console.log('Migración finalizada con éxito.');
