const express = require('express');
const router = express.Router();
const clinicalHistoryController = require('../controllers/clinicalHistory.controller');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

router.post('/', uploadMiddleware.single('file'), clinicalHistoryController.createClinicalHistory);
router.get('/patient/:documentNumber', clinicalHistoryController.getClinicalHistoriesByPatientId);

module.exports = router;
