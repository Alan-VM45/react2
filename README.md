# Poryecto final Dashboard Ecommerce

## INTEGRANTES: Alaniz Agustin, Arillo Maximiliano 
## IA'S: Google Gemini, Copilot

## Descripción del proyecto

Este proyecto es un sistema de ecommerce con dos partes principales:

- `ecommers/`: backend Express + SQLite + EJS que expone una API REST (`/api/...`) y mantiene la lógica de productos, categorías y carrito.
- `dashboard/`: frontend React + Vite + Tailwind que funciona como panel de administración para gestionar productos y categorías.

El dashboard consume la API del backend mediante un proxy configurado en Vite.

## Tecnologías usadas

### Backend
- Node.js
- Express
- SQLite con `better-sqlite3`
- `cors`
- `express-session`
- `ejs` (para las vistas tradicionales del sitio principal)
- `uuid`

### Frontend
- React 19
- Vite
- TypeScript
- React Router DOM
- Tailwind CSS
- `@tailwindcss/vite`

## Estructura principal

- `ecommers/`
  - `app.js`: servidor Express principal y configuración de rutas.
  - `src/routes/api.js`: rutas de API REST para productos, categorías, stats.
  - `src/controllers/apiController.js`: controladores de la API.
  - `src/services/productsService.js`: lógica de acceso a datos con SQLite.
  - `db/database.js`: conexión a SQLite.
  - `migrations/schema.sql`: definición del esquema de la base de datos.

- `dashboard/`
  - `src/App.tsx`: rutas del dashboard.
  - `src/services/productsApi.ts`: cliente HTTP para consumir `/api`.
  - `src/Pages/Products`: páginas de listado, vista, creación y edición de productos.
  - `src/Pages/Categories`: gestión de categorías.
  - `vite.config.ts`: proxy `/api` hacia `http://localhost:3000`.

## Cómo ejecutar el proyecto

### 1. Iniciar el backend

Abrir una terminal en `ecommers/` y ejecutar:

```bash
cd c:\Users\Alaniz Agustin\Desktop\TiendaZapatilla\Trabajo_Final_Web1_Dashboard_ecommerce\ecommers
npm install
npm start
```

O en modo desarrollo:

```bash
npm run dev
```

El backend debe quedar corriendo en:

- `http://localhost:3000`

### 2. Iniciar el dashboard

Abrir otra terminal en `dashboard/` y ejecutar:

```bash
cd c:\Users\Alaniz Agustin\Desktop\TiendaZapatilla\Trabajo_Final_Web1_Dashboard_ecommerce\dashboard
npm install
npm run dev
```

El dashboard quedará en:

- `http://localhost:5173`

### 3. Flujo de conexión

- El frontend carga páginas React.
- Las llamadas a `/api/products` y `/api/categories` pasan por el proxy Vite hacia `http://localhost:3000/api/...`.
- El backend resuelve esas rutas usando SQLite.

## Qué funciona hoy

- Listado de productos con búsqueda y filtro por categoría.
- Creación de nuevos productos con precio, stock y categoría.
- Vista de detalle de producto.
- Edición y eliminación de producto.
- Gestión de categorías: crear, editar y eliminar.
- Estadísticas básicas expuestas por la API.

## Notas importantes

- Asegúrate de que el backend esté corriendo antes de abrir el dashboard.
- Si `localhost:3000` no está disponible, el dashboard mostrará errores de proxy.
- El proxy de Vite está configurado en `dashboard/vite.config.ts`.

## Comandos principales

- Backend:
  - `npm start`
  - `npm run dev`
- Frontend:
  - `npm run dev`
  - `npm run build`
  - `npm run preview`

## Recomendación

Para trabajar sin interrupciones, ejecuta primero el backend y luego el dashboard en otra terminal. De esta forma el panel puede consumir la API correctamente.
