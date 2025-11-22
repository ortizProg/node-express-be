const User = require('./user.model');
const HealtCenter = require('./healtCenter.model');
const Rol = require('./rol.model');
const RolPermission = require('./rolPermission.model');
const Permission = require('./permission.model');
const UserHealtCenter = require('./userHealtCenter.model');

// Relaciones muchos a muchos
User.belongsToMany(HealtCenter, {through: UserHealtCenter, foreignKey: 'usuario_id', as: 'centros_salud'});
HealtCenter.belongsToMany(User, {through: UserHealtCenter, foreignKey: 'centro_salud_id', as: 'usuarios'});

Rol.belongsToMany(Permission, {through: RolPermission, foreignKey: 'rol_id', as: 'permisos'});
Permission.belongsToMany(Rol, {through: RolPermission, foreignKey: 'permiso_id', as: 'rol_id'});

//Relacion de administrador
HealtCenter.belongsTo(User, {foreignKey: 'administrador_id', as: 'administrador'});
User.belongsTo(User, {foreignKey: 'administrador_id', as: 'administrador'})


module.exports = { User, HealtCenter, UserHealtCenter, Rol, Permission, RolPermission}