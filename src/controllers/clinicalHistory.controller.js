const clinicalHistoryService = require('../services/clinicalHistory.service');

const createClinicalHistory = async (req, res) => {
    try {
        const { nombre, fecha, centro_salud_id, numero_documento } = req.body;
        const file = req.file;
        const createdBy = req.user.id;

        if (!nombre || !fecha || !centro_salud_id || !numero_documento) {
            return res.status(400).json({ message: 'Missing required fields: nombre, fecha, centro_salud_id, numero_documento' });
        }

        const newHistory = await clinicalHistoryService.createClinicalHistory({ nombre, fecha, centro_salud_id, numero_documento, createdBy }, file);

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
    },
    updateClinicalHistory: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, fecha, centro_salud_id, numero_documento } = req.body;
            const file = req.file;
            const updatedBy = req.user.id;

            const updatedHistory = await clinicalHistoryService.updateClinicalHistory(id, { nombre, fecha, centro_salud_id, numero_documento, updatedBy }, file);

            res.status(200).json({
                message: 'Clinical history updated successfully',
                data: updatedHistory
            });
        } catch (error) {
            console.error('Error updating clinical history:', error);
            res.status(500).json({
                message: 'Error updating clinical history',
                error: error.message
            });
        }
    },
    getMyClinicalHistories: async (req, res) => {
        try {
            // req.user is populated by authenticateToken middleware
            // For patients, we expect numero_documento in the token or associated user record
            const { numero_documento } = req.user;

            if (!numero_documento) {
                return res.status(400).json({ message: 'User does not have a document number associated' });
            }

            const histories = await clinicalHistoryService.getClinicalHistoriesByPatientId(numero_documento);
            res.status(200).json(histories);
        } catch (error) {
            console.error('Error fetching my clinical histories:', error);
            res.status(500).json({
                message: 'Error fetching clinical histories',
                error: error.message
            });
        }
    }
};
