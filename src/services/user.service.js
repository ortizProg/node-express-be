const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

/**
 * Crea un usuario
*/
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        const userExists = await User.findOne({
            where: {
                email
            }
        })

        if(userExists) throw new Error('El usuario ya existe');

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            nombre, email, password: hashedPassword, rol_id, administrador_id
        })

        return newUser;

    } catch(err) {
        throw new Error('Error al crear al usuario')
    }
}

/**
 * Devuelve todos los usuarios que coincidan con el administrador_id
*/
exports.getAllUserByAdministradorId = async (administrador_id, email) => {
    try {
        const whereClause = {administrador_id};

        if(email) {
            whereClause.email = email;
        }

        const users = await User.findAll({
            where: whereClause, attributes: {exclude: ['password']}
        })
        return users
    } catch(err) {
        throw new Error('Error al obtener los usuarios')
    }
}

/**
 * Devuelve todos los usuarios que coincidan con el rol_id
*/
exports.getAllUserByRolId = async (rol_id) => {
    try {
        const users = await User.findAll({
            where: {rol_id}, attributes: {exclude: ['password']}
        })
        return users
    } catch(err) {
        throw new Error('Error al obtener los usuarios')
    }
}

/**
 * Actualiza el usuario que tenga el id
*/
exports.updateUser = async (id, nombre, email, rol_id, administrador_id, admin_from_token) => {
    try {
        const user = await User.findByPk(Number(id));

        if(user.administrador_id != admin_from_token) throw new Error('Acceso denegado, este usuario no esta bajo su administación');
        

        if(!user) throw new Error('Usuario no encontrado');

        if(email && email != user.email) {
            const userExists = await User.findOne({
                where: {email}
            })

            if(userExists) throw new Error('El email ya esta en uso');
        }


        await user.update({
            nombre,
            email,
            rol_id,
            administrador_id
        })

        return user;
    } catch(err) {
        throw new Error('Error al actualizar el usuario')
    }
}

/**
 * Elimina el usuario que tenga el id
*/
exports.deleteUser = async (id, admin_from_token) => {
    try {
        if(user.administrador_id != admin_from_token) throw new Error('Acceso denegado, este usuario no esta bajo su administación');
        
        const user = await User.findByPk(id);
        
        if(!user) throw new Error('Usuario no encontrado');

        await user.destroy();

        return {message: 'Usuario eliminado con éxito'};
    } catch(err) {
        throw new Error(`Error al eliminar al usuario: ${err.message}`)
    }
}