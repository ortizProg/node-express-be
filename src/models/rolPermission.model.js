const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RolPermission = sequelize.define('roles_permisos', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rold_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'roles', key: 'id'}
    },
    permiso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'permisos', key: 'id'}
    },

}, {
    timestamps: false,
    tableName: 'roles_permisos',
})

module.exports = RolPermission;