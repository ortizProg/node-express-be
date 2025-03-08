const User = require('./user.model');
const Project = require('./project.model');
const UserProject = require('./userProject.model');

// Relaciones muchos a muchos
User.belongsToMany(Project, {through: UserProject, foreignKey: 'usuario_id', as: 'proyectos'});
Project.belongsToMany(User, {through: UserProject, foreignKey: 'proyecto_id', as: 'usuarios'});

//Relacion de administrador
Project.belongsTo(User, {foreignKey: 'administador_id', as: 'administrador'});

module.exports = { User, Project, UserProject}