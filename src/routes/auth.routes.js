const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const errorHandler = require('../middlewares/error.middleware');

// Rutas de usuarios
router.post('/login', authController.login);

// Middleware para manejar errores
router.use(errorHandler);

module.exports = router;
