const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

router.post('/upload', uploadMiddleware.single('file'), uploadController.uploadPdf);

module.exports = router;
