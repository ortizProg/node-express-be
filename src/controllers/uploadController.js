const storageService = require('../services/storageService');

const uploadPdf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a PDF file' });
        }

        const fileUrl = await storageService.uploadFile(req.file);

        res.status(200).json({
            message: 'File uploaded successfully',
            url: fileUrl,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({
            message: 'Error uploading file',
            error: error.message,
        });
    }
};

module.exports = {
    uploadPdf,
};
