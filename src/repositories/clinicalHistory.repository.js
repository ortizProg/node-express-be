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
    create,
    findAllByPatientId: async (documentNumber) => {
        try {
            const histories = await ClinicalHistory.findAll({
                where: {
                    numero_documento: documentNumber
                },
                include: [
                    {
                        model: require('../models/healtCenter.model'),
                        as: 'centro_salud',
                        attributes: ['nombre']
                    }
                ],
                order: [['createdAt', 'DESC']]
            });
            return histories;
        } catch (error) {
            throw error;
        }
    }
};
