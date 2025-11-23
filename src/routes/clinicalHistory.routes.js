const express = require('express');
const router = express.Router();
const clinicalHistoryController = require('../controllers/clinicalHistory.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

router.post('/', authenticateToken, uploadMiddleware.single('file'), clinicalHistoryController.createClinicalHistory);
router.get('/patient/:documentNumber', clinicalHistoryController.getClinicalHistoriesByPatientId);
router.put('/:id', authenticateToken, uploadMiddleware.single('file'), clinicalHistoryController.updateClinicalHistory);

module.exports = router;
