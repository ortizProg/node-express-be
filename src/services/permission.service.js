const Permission = require('../model/permission.model');

exports.createPermission = async (nombre) => {
    try {
        const permissionExists = await Permission.findOne({
            where: {
                nombre
            }
        })

        if(permissionExists) throw new Error('El permiso ya existe');

        const newPermission = await Permission.create({
            nombre
        })

        return newPermission;

    } catch(err) {
        throw new Error('Error al crear el permiso')
    }
}

exports.updatePermission = async (nombre) => {
    try {
        const permiso = await Permission.findByPk(id);

        if(!permiso) throw new Error('Permiso no encontrado');

        await Permission.update({
            nombre,
        }, id)

        return permiso;
    } catch(err) {
        throw new Error('Error al actualizar el permiso')
    }
}


exports.deletePermission = async (id) => {
    try {
        const permiso = await Permission.findByPk(id);

        if(!permiso) throw new Error('Permiso no encontrado');

        await permiso.destroy();

        return {message: 'Permiso eliminado con éxito'};
    } catch(err) {
        throw new Error(`Error al eliminar el permiso: ${err.message}`)
    }
}