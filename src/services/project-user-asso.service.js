const UserProject = require('../models/userProject.model');

/**
 * Crea la asociación entre un usuario y un proyecto
 * @param usuario_id
 * @param proyecto_id
*/
exports.createAssociation = async (usuario_id, proyecto_id) => {
    try {
        
        //Obtiene el registro de la asociación que coincida con el usuario_id y el proyecto_id
        const assoExists = await UserProject.findOne({
            where: {
                usuario_id,
                proyecto_id
            }
        })

        // Valida si la asociación ya existe previamente
        if(assoExists) throw new Error('Esta asociación ya existe');

        // Crea la asociación
        const newAsso = await UserProject.create({
            usuario_id, 
            proyecto_id, 
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
exports.removeAssociation = async (usuario_id, proyecto_id) => {
    try {

        //Obtiene el registro de la asociación que coincida con el usuario_id y el proyecto_id
        const association = await UserProject.findOne({
            where: {
                usuario_id,
                proyecto_id
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