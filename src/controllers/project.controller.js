const projectservice = require('../services/project.service');

/**
 * Crear un proyecto
*/
exports.createProject = async (req, res) => {
    try {
        const admin_from_token = req.user.id;
        const {nombre, descripcion } = req.body;
        const result = await projectservice.createProject(admin_from_token, nombre, descripcion);
        res.status(200).json({message: 'Proyecto creado con exito', result});

    } catch(error) {
        res.status(500).json({message: 'Error al crear el Proyecto', error});
    }
}

/**
 * Devuelve todos los proyectos que coincidan con el administrador_id
*/
exports.getAllProjectByAdministradorId = async (req, res) => {
    try {
        const {id} = req.params;
        const projects = await projectservice.getAllProjectByAdministradorId(id);
        res.status(200).json({message: 'Proyectos consultados con exito', projects});

    } catch(error) {
        res.status(500).json({message: 'Error al obtener los Proyectos', error});
    }
}

/**
 * Devuelve todos los proyectos
*/
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectservice.getAllProjects();
        res.status(200).json({message: 'Proyectos consultados con exito', projects});

    } catch(error) {
        res.status(500).json({message: 'Error al obtener los Proyectos', error});
    }
}

/**
 * Actualiza el proyecto que tenga el id
*/
exports.updateProject = async (req, res) => {
    try {
        const {id} = req.params;
        const admin_from_token = req.user.id;
        const {nombre, descripcion, administrador_id } = req.body;
        const result = await projectservice.updateProject(id, nombre, descripcion, administrador_id, admin_from_token);
        res.status(200).json({message: 'proyecto actualizado con exito', result});
    } catch(error) {
        res.status(500).json({message:  error.message});
    }
}

/**
 * Elimina el proyecto que tenga el id
*/
exports.deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const admin_from_token = req.user.id;
        const result = await projectservice.deleteProject(id, admin_from_token);
        res.status(200).json({message: 'proyecto eliminado con exito', result});
    } catch(error) {
        res.status(500).json({message:  error.message});
    }
}

/**
 * Devuelve el proyecto que coincida con el id
*/
exports.getById = async (req, res) => {
    try {

        const {id} = req.params;

        const projects = await projectservice.getById(id);
        res.status(200).json({message: 'Proyecto consultado con exito', projects});

    } catch(error) {
        res.status(500).json({message: 'Error al obtener el proyecto', error});
    }
}

/**
 * Devuelve todos los proyectos asociados a un usuario
*/
exports.getByUser = async (req, res) => {
    try {
        const projects = await projectservice.getByUser(req.params.id);
        res.status(200).json({message: 'Proyectos consultados con exito', projects});

    } catch(error) {
        res.status(500).json({message: 'Error al obtener los Proyectos', error});
    }
}

/**
 * Asociar un usuario a un proyecto
*/
exports.associateUser = async (req, res) => {
    try {
        const admin_from_token = req.user.id;
        const {usuario_id, proyecto_id} = req.body;
        const result = await projectservice.associateUser(usuario_id, proyecto_id, admin_from_token);
        res.status(200).json({message: 'Asociacion creada con exito', result});

    } catch(error) {
        res.status(500).json({message: 'Error al crear la asociacion', error});
    }
}

/**
 * Desasociar un usuario de un proyecto
*/
exports.disassociateUser = async (req, res) => {
    try {
        const admin_from_token = req.user.id;
        const {usuario_id, proyecto_id} = req.body;
        const result = await projectservice.disassociateUser(usuario_id, proyecto_id, admin_from_token);
        res.status(200).json({message: 'Asociacion creada con exito', result});

    } catch(error) {
        res.status(500).json({message: 'Error al crear la asociacion', error});
    }
}