const express = require('express');
const router = express.Router();
const clinicalHistoryController = require('../controllers/clinicalHistory.controller');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

router.post('/', uploadMiddleware.single('file'), clinicalHistoryController.createClinicalHistory);

module.exports = router;
