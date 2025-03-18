const UserProject = require('../model/userProject.model');

exports.createUserProject = async (usuario_id, proyecto_id) => {
    try {
        const permissionExists = await UserProject.findOne({
            where: {
                usuario_id,
                proyecto_id
            }
        })

        if(permissionExists) throw new Error('El userProject ya existe');

        const newUserProject = await UserProject.create({
            usuario_id,
            proyecto_id
        })

        return newUserProject;

    } catch(err) {
        throw new Error('Error al crear el registro')
    }
}

exports.updateUserProject = async (usuario_id, proyecto_id) => {
    try {
        const userProject = await UserProject.findByPk(id);

        if(!userProject) throw new Error('Registro no encontrado');

        await UserProject.update({
            usuario_id,
            proyecto_id
        }, id)

        return userProject;
    } catch(err) {
        throw new Error('Error al actualizar el userProject')
    }
}


exports.deleteUserProject = async (id) => {
    try {
        const userProject = await UserProject.findByPk(id);

        if(!userProject) throw new Error('Registro no encontrado');

        await userProject.destroy();

        return {message: 'registro eliminado con éxito'};
    } catch(err) {
        throw new Error(`Error al eliminar el registro: ${err.message}`)
    }
}