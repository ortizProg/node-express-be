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
                    },
                    {
                        model: require('../models/user.model'),
                        as: 'doctor',
                        attributes: ['nombre']
                    }
                ],
                order: [['createdAt', 'DESC']]
            });
            return histories;
        } catch (error) {
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const history = await ClinicalHistory.findByPk(id);
            if (!history) {
                throw new Error('Clinical history not found');
            }
            await history.update(data);
            return history;
        } catch (error) {
            throw error;
        }
    }
};
