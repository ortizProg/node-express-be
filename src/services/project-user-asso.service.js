const UserHealtCenter = require('../models/userHealtCenter.model');

/**
 * Crea la asociación entre un usuario y un proyecto
 * @param usuario_id
 * @param healtCenterId
*/
exports.createAssociation = async (usuario_id, healtCenterId) => {
    try {
        
        //Obtiene el registro de la asociación que coincida con el usuario_id y el healtCenterId
        const assoExists = await UserHealtCenter.findOne({
            where: {
                usuario_id,
                healtCenterId
            }
        })

        // Valida si la asociación ya existe previamente
        if(assoExists) throw new Error('Esta asociación ya existe');

        // Crea la asociación
        const newAsso = await UserHealtCenter.create({
            usuario_id, 
            healtCenterId, 
        })

        return newAsso;

    } catch(err) {
        throw new Error('Error al crear la asociacion')
    }
}

/**
 * Elimina la asociación entre un usuario y un proyecto
 * @param usuario_id
 * @param proyecto_id
*/
exports.removeAssociation = async (usuario_id,healtCenterId) => {
    try {

        //Obtiene el registro de la asociación que coincida con el usuario_id y el healtCenterId
        const association = await UserHealtCenter.findOne({
            where: {
                usuario_id,
                healtCenterId
            }
        })

        // Valida si la asociación no existe
        if(!association) throw new Error('Esta asociación no existe');

        await association.destroy();

        return {message: 'Asociación eliminada con éxito'};

    } catch(err) {
        throw new Error('Error al eliminar la asociacion')
    }
}