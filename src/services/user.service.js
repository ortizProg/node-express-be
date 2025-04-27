const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

/**
 * Crea un usuario
 * @param nombre
 * @param email
 * @param password
 * @param rol_id
 * @param administrador_id
*/
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        const userExists = await User.findOne({
            where: {
                email
            }
        })

        // Valida si el email ya se encuentra registrado
        if(userExists) throw new Error('El usuario ya existe');

        // Encripta la contraseña del usuario
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea el registro del usuario
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
 * @param administrador_id
*/
exports.getAllUserByAdministradorId = async (administrador_id) => {
    try {
        const whereClause = {administrador_id};

        const users = await User.findAll({
            where: whereClause, attributes: {exclude: ['password']}
        })
        return users
    } catch(err) {
        throw new Error('Error al obtener los usuarios')
    }
}

/**
 * Devuelve el registro del usuario que coincida con el id
 * @param id
*/
exports.getById = async (id) => {
    try {
        const user = await User.findByPk(id, {
           attributes: {exclude: ['password']}
        })
        return user
    } catch(err) {
        throw new Error('Error al obtener el usuario')
    }
}

/**
 * Devuelve todos los usuarios que coincidan con el rol_id
 * @param rol_id
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
 * @param id
 * @param nombre
 * @param email
 * @param password
 * @param rol_id
 * @param administrador_id
 * @param admin_from_token
*/
exports.updateUser = async (id, nombre, email, rol_id, administrador_id, admin_from_token) => {
    try {
        const user = await User.findByPk(Number(id));
        
        // Valida si el administrador que quiere modificar el registro es el admin del usuario
        if(user.administrador_id != admin_from_token) throw new Error('Acceso denegado, este usuario no esta bajo su administación');
        
        // Valida si el usuario no existe
        if(!user) throw new Error('Usuario no encontrado');

        // Valida si el email no se encuentra registrado en otro usuario
        if(email && email != user.email) {
            const userExists = await User.findOne({
                where: {email}
            })

            if(userExists) throw new Error('El email ya esta en uso');
        }

        // Actualiza a el usuario
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
 * @param id
 * @param admin_from_token
*/
exports.deleteUser = async (id, admin_from_token) => {
    try {

        // Valida si el administrador que quiere eliminar el registro es el admin del usuario
        if(user.administrador_id != admin_from_token) throw new Error('Acceso denegado, este usuario no esta bajo su administación');
        
        const user = await User.findByPk(id);
        
        // Valida si el usuario no existe
        if(!user) throw new Error('Usuario no encontrado');

        // Elimina el usuario
        await user.destroy();

        return {message: 'Usuario eliminado con éxito'};
    } catch(err) {
        throw new Error(`Error al eliminar al usuario: ${err.message}`)
    }
}