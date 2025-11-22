const express = require('express');
const router = express.Router();
const clinicalHistoryController = require('../controllers/clinicalHistory.controller');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

router.post('/', uploadMiddleware.single('file'), clinicalHistoryController.createClinicalHistory);
router.get('/patient/:documentNumber', clinicalHistoryController.getClinicalHistoriesByPatientId);
router.put('/:id', uploadMiddleware.single('file'), clinicalHistoryController.updateClinicalHistory);

module.exports = router;
