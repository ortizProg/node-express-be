const Rol = require('../model/rol.model');

exports.createRol = async (nombre) => {
    try {
        const rolExists = await Rol.findOne({
            where: {
                nombre
            }
        })

        if(rolExists) throw new Error('El rol ya existe');

        const newRol = await Rol.create({
            nombre
        })

        return newRol;

    } catch(err) {
        throw new Error('Error al crear el rol')
    }
}

exports.updateRol = async (nombre) => {
    try {
        const rol = await Rol.findByPk(id);

        if(!rol) throw new Error('Rol no encontrado');

        await Rol.update({
            nombre,
        }, id)

        return rol;
    } catch(err) {
        throw new Error('Error al actualizar el rol')
    }
}


exports.deleteRol = async (id) => {
    try {
        const rol = await Rol.findByPk(id);

        if(!rol) throw new Error('Rol no encontrado');

        await rol.destroy();

        return {message: 'Rol eliminado con éxito'};
    } catch(err) {
        throw new Error(`Error al eliminar el rol: ${err.message}`)
    }
}