const User = require('../model/user.model');
const bcript = require('bcryptjs');
const userService = require('../services/user.service');

/**
 * Crea un usuario
*/
exports.createUser = async (req, res) => {
    try {
        const admin_from_token = req.user.id;
        const {email } = req.query;
        const result = await userService.createUser(admin_from_token, email);
        res.status(200).json({message: 'Usuarios consultados con exito', result});

    } catch(error) {
        res.status(200).json({message: 'Error al obtener los usuarios', error});
    }
}

/**
 * Devuelve todos los usuarios que coincidan con el administrador_id
*/
exports.getAllUserByAdministradorId = async (req, res) => {
    try {
        const admin_from_token = req.user.id;
        const {email } = req.query;
        const users = await userService.getAllUsersByAdministradorId(admin_from_token, email);
        res.status(200).json({message: 'Usuarios consultados con exito', users});

    } catch(error) {
        res.status(500).json({message: 'Error al obtener los usuarios', error});
    }
}

/**
 * Devuelve todos los usuarios que coincidan con el rol_id
*/
exports.getAllUserByRolId = async (req, res) => {
    try {
        const users = await userService.getAllUsersByRolId(req.params.id);
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