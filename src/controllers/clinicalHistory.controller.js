const clinicalHistoryService = require('../services/clinicalHistory.service');

const createClinicalHistory = async (req, res) => {
    try {
        const { nombre, fecha, centro_salud_id, numero_documento } = req.body;
        const file = req.file;

        if (!nombre || !fecha || !centro_salud_id || !numero_documento) {
            return res.status(400).json({ message: 'Missing required fields: nombre, fecha, centro_salud_id, numero_documento' });
        }

        const newHistory = await clinicalHistoryService.createClinicalHistory({ nombre, fecha, centro_salud_id, numero_documento }, file);

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
    createClinicalHistory,
    getClinicalHistoriesByPatientId: async (req, res) => {
        try {
            const { documentNumber } = req.params;
            const histories = await clinicalHistoryService.getClinicalHistoriesByPatientId(documentNumber);
            res.status(200).json(histories);
        } catch (error) {
            console.error('Error fetching clinical histories:', error);
            res.status(500).json({
                message: 'Error fetching clinical histories',
                error: error.message
            });
        }
    }
};
