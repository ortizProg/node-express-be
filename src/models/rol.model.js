const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Rol = sequelize.define('roles', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false,
    tableName: 'roles',
    schema: 'general'
})

module.exports = Rol;