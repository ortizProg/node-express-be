const Project = require('../model/user.model');

exports.createProject = async (administrador_id, nombre, descripcion, fecha_de_creacion) => {
    try {

        const proyectExists = await Project.findOne({
            where: {
                administrador_id,
                nombre
            }
        })

        if(proyectExists) throw new Error('El proyecto ya existe para el administrador');

        const newProject = await Project.create({
            administrador_id, 
            nombre, 
            descripcion,
            fecha_de_creacion
        })

        return newProject;

    } catch(err) {
        throw new Error('Error al crear el proyecto')
    }
}

exports.updateProject = async (administrador_id, nombre, descripcion, fecha_de_creacion, admin_from_token) => {
    try {
        const project = await Project.findByPk(id);

        if(project.administrador_id != admin_from_token) throw new Error('Acceso denegado, este proyecto no esta bajo su administación');
        
        if(!project) throw new Error('Proyecto no encontrado');

        await project.update({
            nombre,
            descripcion,
            fecha_de_creacion,
            administrador_id
        }, id)

        return project;
    } catch(err) {
        throw new Error('Error al actualizar el proyecto')
    }
}


exports.deleteProject = async (id, admin_from_token) => {
    try {
        const project = await Project.findByPk(id);

        if(project.administrador_id != admin_from_token) throw new Error('Acceso denegado, este proyecto no esta bajo su administación');
        
        if(!project) throw new Error('Proyecto no encontrado');

        await project.destroy();

        return {message: 'Proyecto eliminado con éxito'};
    } catch(err) {
        throw new Error(`Error al eliminar al proyecto: ${err.message}`)
    }
}