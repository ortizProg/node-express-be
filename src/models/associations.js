const User = require('./user.model');
const Project = require('./project.model');
const Rol = require('./rol.model');
const RolPermission = require('./rolPermission.model');
const Permission = require('./permission.model');
const UserProject = require('./userProject.model');

// Relaciones muchos a muchos
User.belongsToMany(Project, {through: UserProject, foreignKey: 'usuario_id', as: 'proyectos'});
Project.belongsToMany(User, {through: UserProject, foreignKey: 'proyecto_id', as: 'usuarios'});

Rol.belongsToMany(Permission, {through: RolPermission, foreignKey: 'rol_id', as: 'permisos'});
Permission.belongsToMany(Rol, {through: RolPermission, foreignKey: 'permiso_id', as: 'rol_id'});

//Relacion de administrador
Project.belongsTo(User, {foreignKey: 'administrador_id', as: 'administrador'});
User.belongsTo(User, {foreignKey: 'administrador_id', as: 'administrador'})


module.exports = { User, Project, UserProject, Rol, Permission, RolPermission}