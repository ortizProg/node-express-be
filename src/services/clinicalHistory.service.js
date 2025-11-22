const clinicalHistoryRepository = require('../repositories/clinicalHistory.repository');
const storageService = require('./storageService');

const createClinicalHistory = async (data, file) => {
    try {
        if (!file) {
            throw new Error('File is required');
        }

        // Upload file to 'clinical-histories' folder
        const fileUrl = await storageService.uploadFile(file, 'clinical-histories');

        const historyData = {
            ...data,
            archivo_url: fileUrl
        };

        const newHistory = await clinicalHistoryRepository.create(historyData);
        return newHistory;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createClinicalHistory,
    getClinicalHistoriesByPatientId: async (documentNumber) => {
        try {
            const histories = await clinicalHistoryRepository.findAllByPatientId(documentNumber);
            return histories;
        } catch (error) {
            throw error;
        }
    },
    updateClinicalHistory: async (id, data, file) => {
        try {
            let historyData = { ...data };

            if (file) {
                const fileUrl = await storageService.uploadFile(file, 'clinical-histories');
                historyData.archivo_url = fileUrl;
            }

            const updatedHistory = await clinicalHistoryRepository.update(id, historyData);
            return updatedHistory;
        } catch (error) {
            throw error;
        }
    }
};
