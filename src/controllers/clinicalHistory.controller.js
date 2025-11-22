const clinicalHistoryService = require('../services/clinicalHistory.service');

const createClinicalHistory = async (req, res) => {
    try {
        const { nombre, fecha, centro_salud_id } = req.body;
        const file = req.file;

        if (!nombre || !fecha || !centro_salud_id) {
            return res.status(400).json({ message: 'Missing required fields: nombre, fecha, centro_salud_id' });
        }

        const newHistory = await clinicalHistoryService.createClinicalHistory({ nombre, fecha, centro_salud_id }, file);

        res.status(201).json({
            message: 'Clinical history created successfully',
            data: newHistory
        });
    } catch (error) {
        console.error('Error creating clinical history:', error);
        res.status(500).json({
            message: 'Error creating clinical history',
            error: error.message
        });
    }
};

module.exports = {
    createClinicalHistory
};
