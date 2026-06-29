// db/database.js
const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Activar soporte de claves foráneas
try {
  db.pragma('foreign_keys = ON');
} catch (e) {
  console.warn('No fue posible establecer PRAGMA foreign_keys:', e.message);
}

module.exports = db;

