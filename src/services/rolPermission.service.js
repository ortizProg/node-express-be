const RolPermission = require('../model/rolPermission.model');

exports.createRolPermission = async (rol_id, permiso_id) => {
    try {
        const permissionExists = await RolPermission.findOne({
            where: {
                rol_id,
                permiso_id
            }
        })

        if(permissionExists) throw new Error('El rolPermiso ya existe');

        const newRolPermission = await RolPermission.create({
            rol_id,
            permiso_id
        })

        return newRolPermission;

    } catch(err) {
        throw new Error('Error al crear el registro')
    }
}

exports.updateRolPermission = async (rol_id, permiso_id) => {
    try {
        const rolPermiso = await RolPermission.findByPk(id);

        if(!rolPermiso) throw new Error('Registro no encontrado');

        await RolPermission.update({
            rol_id,
            permiso_id
        }, id)

        return rolPermiso;
    } catch(err) {
        throw new Error('Error al actualizar el rolPermiso')
    }
}


exports.deleteRolPermission = async (id) => {
    try {
        const rolPermiso = await RolPermission.findByPk(id);

        if(!rolPermiso) throw new Error('Registro no encontrado');

        await rolPermiso.destroy();

        return {message: 'registro eliminado con éxito'};
    } catch(err) {
        throw new Error(`Error al eliminar el registro: ${err.message}`)
    }
}