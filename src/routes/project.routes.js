const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const {authenticateToken, checkRole} = require('../middlewares/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');

// Rutas de proyectos
router.post('/projects/create', authenticateToken, checkRole([ROLES.ADMIN]), projectController.createProject);
router.put('/projects/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.updateProject);
router.delete('/projects/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.deleteProject);
router.get('/projects', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getAllProjects);
router.get('/projects/:id', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getById);
router.get('/projects/administrator/:id', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getAllProjectByAdministradorId);
router.get('/projects/user/:id', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getByUser);
router.post('/projects/associate/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.deleteProject);
router.post('/projects/associate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.associateUser);
router.delete('/projects/disassociate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.disassociateUser);

// Middleware para manejar errores
router.use(errorHandler);

module.exports = router;
