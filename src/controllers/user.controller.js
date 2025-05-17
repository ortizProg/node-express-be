const userService = require('../services/user.service');
const { validateStringParam } = require('../utils/utils')

/**
 * Crea un usuario
*/
exports.createUser = async (req, res) => {
    try {
        const admin_from_token = req.user.id;
        const {nombre, email, password, rol_id } = req.body;
        const result = await userService.createUser(nombre, email, password, rol_id, admin_from_token);
        res.status(200).json({message: 'Usuario creado con exito', result});

    } catch(error) {
        res.status(500).json({message: 'Error al crear los usuarios', error});
    }
}


/**
 * Devuelve todos los usuarios que coincidan con el administrador_id
*/
exports.getAllUserByAdministradorId = async (req, res) => {
    try {
        const {id} = req.user;
        const {nombre, email} = req.query;
        const users = await userService.getAllUserByAdministradorId(id, validateStringParam(nombre), validateStringParam(email));
        res.status(200).json({message: 'Usuarios consultados con exito', users});

    } catch(error) {
        res.status(500).json({message: 'Error al obtener los usuarios', error});
    }
}

/**
 * Devuelve el registro del usuario que coincida con el id
*/
exports.getById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userService.getById(id);
        res.status(200).json({message: 'Usuario consultado con exito', user});

    } catch(error) {
        res.status(500).json({message: 'Error al obtener el usuario', error});
    }
}

/**
 * Devuelve todos los usuarios que coincidan con el rol_id
*/
exports.getAllUserByRolId = async (req, res) => {
    try {
        const users = await userService.getAllUserByRolId(req.params.id);
        res.status(200).json({message: 'Usuarios consultados con exito', users});

    } catch(error) {
        res.status(500).json({message: 'Error al obtener los usuarios', error});
    }
}

/**
 * Actualiza el usuario que tenga el id
*/
exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const admin_from_token = req.user.id;
        const {nombre, email, rol_id, administrador_id } = req.body;
        const result = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);
        res.status(200).json({message: 'Usuario actualizado con exito', result});
    } catch(error) {
        res.status(500).json({message:  error.message});
    }
}

/**
 * Elimina el usuario que tenga el id
*/
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const admin_from_token = req.user.id;
        const result = await userService.deleteUser(id, admin_from_token);
        res.status(200).json({message: 'Usuario eliminado con exito', result});
    } catch(error) {
        res.status(500).json({message:  error.message});
    }
}