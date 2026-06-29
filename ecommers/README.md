# Ecommerce con Express y EJS

**Integrantes:** Alaniz Agustin, Arillo Maximiliano  
**IA de apoyo:** Gemini, GitHub Copilot y Antigravity (Google DeepMind)

Este proyecto es una aplicación web de ecommerce simple construida con Node.js, Express y EJS, con persistencia relacional en SQLite.

## Estructura del Proyecto

- `app.js`: Archivo principal del servidor Express.
- `db/`: Conexión de base de datos SQLite y scripts de inicialización.
- `migrations/`: Archivos SQL de estructura y definición de tablas.
- `src/`: Carpeta del código fuente.
  - `controllers/`: Controladores encargados de la lógica de respuesta.
  - `routes/`: Enrutamiento HTTP de la aplicación.
  - `services/`: Capa de servicios (acceso a base de datos con SQLite).
  - `views/`: Plantillas HTML dinámicas construidas con EJS.
- `public/`: Archivos estáticos de acceso público (CSS, imágenes).

## Instalación y Configuración

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicializa la base de datos y migra los productos iniciales:
   ```bash
   node migrate.js
   ```

3. Inicia el servidor:
   - En modo producción:
     ```bash
     npm start
     ```
   - En modo desarrollo (recarga automática):
     ```bash
     npm run dev
     ```

4. Abre tu navegador e ingresa a `http://localhost:3000`

## Rutas Disponibles

- `/`: Página de login
- `/home`: Página principal (catálogo de productos y filtros)
- `/register`: Página de registro de nuevos usuarios
- `/profile`: Perfil del usuario autenticado
- `/cart`: Carrito de compras (cálculos de totales y gestión en tiempo real)
- `/products/:id`: Detalle del producto (con control de existencia y sugerencias)
- `/categories/:category`: Filtrado de productos por categoría
- `/search`: Búsqueda de productos

## Tecnologías Utilizadas

- **Entorno de ejecución:** Node.js
- **Framework web:** Express.js
- **Motor de plantillas:** EJS
- **Estilos:** CSS Vanilla
- **Base de datos:** SQLite (administrado con `better-sqlite3`)