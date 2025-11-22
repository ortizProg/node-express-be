const ClinicalHistory = require('../models/clinicalHistory.model');

const create = async (data) => {
    try {
        const newHistory = await ClinicalHistory.create(data);
        return newHistory;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    create
};
