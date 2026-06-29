const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3000; // Mantengo el puerto de la rama prueba

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de sesión (US #4)
app.use(session({
    secret: 'mi_secreto_ecommerce', // Puedes cambiar esto por el secreto que tenías
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 horas
}));

// Middleware para inicializar el carrito en la sesión
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});

// Rutas
const indexRoutes = require('./src/routes/index');
const homeRoutes = require('./src/routes/home');
const registerRoutes = require('./src/routes/register');
const profileRoutes = require('./src/routes/profile');
const cartRoutes = require('./src/routes/cart');
const productRoutes = require('./src/routes/product');
const categoryRoutes = require('./src/routes/category');
const searchRoutes = require('./src/routes/search');

app.use('/', indexRoutes);
app.use('/home', homeRoutes);
app.use('/register', registerRoutes);
app.use('/profile', profileRoutes);
app.use('/cart', cartRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/search', searchRoutes);

// Middleware para errores 404 (US #2)
app.use((req, res, next) => {
    res.status(404).render('errors/404');
});

// Middleware para errores 500 (US #13)
app.use((err, req, res, next) => {
    console.error('Error interno:', err);
    res.status(500).render('500');
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});