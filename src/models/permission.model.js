const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Permission = sequelize.define('permisos', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false,
    tableName: 'permisos',
    schema: 'general'
})

module.exports = Permission;