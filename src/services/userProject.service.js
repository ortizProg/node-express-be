const UserHealtCenter = require('../model/userHealtCenter.model');

exports.createUserProject = async (usuario_id, healtCenterId) => {
    try {
        const permissionExists = await UserHealtCenter.findOne({
            where: {
                usuario_id,
                healtCenterId
            }
        })

        if(permissionExists) throw new Error('El userProject ya existe');

        const newUserProject = await UserHealtCenter.create({
            usuario_id,
            healtCenterId
        })

        return newUserProject;

    } catch(err) {
        throw new Error('Error al crear el registro')
    }
}

exports.updateUserProject = async (usuario_id, healtCenterId) => {
    try {
        const userProject = await UserHealtCenter.findByPk(id);

        if(!userProject) throw new Error('Registro no encontrado');

        await UserHealtCenter.update({
            usuario_id,
            healtCenterId
        }, id)

        return userProject;
    } catch(err) {
        throw new Error('Error al actualizar el userProject')
    }
}


exports.deleteUserProject = async (id) => {
    try {
        const userProject = await UserHealtCenter.findByPk(id);

        if(!userProject) throw new Error('Registro no encontrado');

        await userProject.destroy();

        return {message: 'registro eliminado con éxito'};
    } catch(err) {
        throw new Error(`Error al eliminar el registro: ${err.message}`)
    }
}