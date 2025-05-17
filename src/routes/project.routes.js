const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const {authenticateToken, checkRole} = require('../middlewares/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');

// Rutas de proyectos
router.post('/create', authenticateToken, checkRole([ROLES.ADMIN]), projectController.createProject);
router.put('/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.updateProject);
router.delete('/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.deleteProject);
router.get('', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getAllProjects);
router.get('/:id', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getById);
router.get('/administrator/:id', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getAllProjectByAdministradorId);
router.get('/user/:id', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getByUser);
router.post('/associate/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.deleteProject);
router.post('/associate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.associateUser);
router.delete('/disassociate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.disassociateUser);

// Middleware para manejar errores
router.use(errorHandler);

module.exports = router;
