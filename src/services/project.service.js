const Project = require('../models/project.model');
const User = require('../models/user.model');
const UserProjectService = require('./project-user-asso.service');

/**
 * Crear un proyecto
 * @param administrador_id
 * @param nombre
 * @param descripcion
*/
exports.createProject = async (administrador_id, nombre, descripcion) => {
    try {

        const proyectExists = await Project.findOne({
            where: {
                administrador_id,
                nombre
            }
        })

        // Valida si el nombre del proyecto ya existe asociado a el administrador
        if(proyectExists) throw new Error('El proyecto ya existe para el administrador');

        // Crea el proyecto
        const newProject = await Project.create({
            administrador_id, 
            nombre, 
            descripcion
        })

        return newProject;

    } catch(err) {
        throw new Error('Error al crear el proyecto')
    }
}
/**
 * Devuelve todos los proyectos
*/
exports.getAllProjects = async () => {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: {attributes: []}
                }
            ]
        })
        return projects;
    } catch (error) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
}
/**
 * Devuelve el proyecto que coincida con el id
 * @param id
*/
exports.getById = async (id) => {
    try {
        const project = await Project.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: {attributes: []}
                }
            ]
        });
        return project;
    } catch (error) {
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
}
/**
 * Devuelve todos los proyectos que coincidan con el administrador_id
 * @param id
*/
exports.getAllProjectByAdministradorId = async (id) => {
    try {
        const projects = await Project.findAll({
            where: {
                administrador_id: id
            },
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: {attributes: []}
                },
            ]
        })
        return projects;
    } catch (error) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
}
/**
 * Devuelve todos los proyectos asociados a un usuario
 * @param user_id
*/
exports.getByUser = async (user_id) => {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre']
                },
                {
                    model: User,
                    as: 'usuarios',
                    where: {
                        id: user_id
                    },
                    attributes: ['id', 'nombre', 'email'],
                    through: {attributes: []}
                }
            ]
        })
        return projects;
    } catch (error) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
}
/**
 * Actualiza el proyecto que tenga el id
 * @param id
 * @param nombre
 * @param descripcion
 * @param administrador_id
 * @param admin_from_token
*/
exports.updateProject = async (id, nombre, descripcion, administrador_id, admin_from_token) => {
    try {
        const project = await Project.findByPk(id);

        // Valida si el administrador que quiere modificar el registro es el admin del proyecto
        if(project.administrador_id != admin_from_token) throw new Error('Acceso denegado, este proyecto no esta bajo su administación');
        
        // Valida si el proyecto no existe
        if(!project) throw new Error('Proyecto no encontrado');

        await project.update({
            nombre,
            descripcion,
            administrador_id
        })

        return project;
    } catch(err) {
        throw new Error('Error al actualizar el proyecto')
    }
}
/**
 * Elimina el proyecto que tenga el id
 * @param id
 * @param admin_from_token
*/
exports.deleteProject = async (id, admin_from_token) => {
    try {
        const project = await Project.findByPk(id);

        // Valida si el administrador que quiere modificar el registro es el admin del proyecto
        if(project.administrador_id != admin_from_token) throw new Error('Acceso denegado, este proyecto no esta bajo su administación');
        
        // Valida si el proyecto no existe
        if(!project) throw new Error('Proyecto no encontrado');

        // Elimina el proyecto
        await project.destroy();

        return {message: 'Proyecto eliminado con éxito'};
    } catch(err) {
        throw new Error(`Error al eliminar al proyecto: ${err.message}`)
    }
}
/**
 * Asociar un usuario a un proyecto
 * @param usuario_id
 * @param proyecto_id
 * @param admin_from_token
*/
exports.associateUser = async (usuario_id, proyecto_id, admin_from_token) => {
    try {
        const project = await Project.findByPk(proyecto_id);

        // Valida si el administrador que quiere crear la asociacion es el admin del proyecto
        if(project.administrador_id != admin_from_token) throw new Error('Acceso denegado, este proyecto no esta bajo su administación');
        
        // Valida si el proyecto no existe
        if(!project) throw new Error('Proyecto no encontrado');

        // Se llama el servicio que creara la asociacion
        const assoProccess = await  UserProjectService.createAssociation(usuario_id, proyecto_id);

        // Si el proceso fallo devolvera el error
        if(assoProccess instanceof Error) throw assoProccess;

        return assoProccess;
       
    } catch(err) {
        throw new Error('Error al crear la asociacion')
    }
}
/**
 * Desasociar un usuario de un proyecto
 * @param usuario_id
 * @param proyecto_id
 * @param admin_from_token
*/
exports.disassociateUser = async (usuario_id, proyecto_id, admin_from_token) => {
    try {
        const project = await Project.findByPk(proyecto_id);

        // Valida si el administrador que quiere eliminar la asociacion es el admin del proyecto
        if(project.administrador_id != admin_from_token) throw new Error('Acceso denegado, este proyecto no esta bajo su administación');
        
        // Valida si el proyecto no existe
        if(!project) throw new Error('Proyecto no encontrado');

        // Se llama el servicio que eliminara la asociacion
        const disassoProccess = await  UserProjectService.removeAssociation(usuario_id, proyecto_id);
        
        // Si el proceso fallo devolvera el error
        if(disassoProccess instanceof Error) throw disassoProccess;

        return disassoProccess;
       
    } catch(err) {
        throw new Error('Error al crear la asociacion')
    }
}