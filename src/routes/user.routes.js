const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {authenticateToken, checkRole} = require('../middlewares/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');

// Rutas de usuarios
router.post('/create', authenticateToken, checkRole([ROLES.ADMIN]), userController.createUser);
router.put('/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.updateUser);
router.get('/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getById);
router.get('', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUserByAdministradorId);
router.delete('/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.deleteUser);
router.get('/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUserByRolId);

// Middleware para manejar errores
router.use(errorHandler);

module.exports = router;
