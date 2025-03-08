const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define('usuarios', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    rold_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'roles', key: 'id'}
    },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'usuarios', key: 'id'}
    },

}, {
    timestamps: false,
    tableName: 'usuarios',
    schema: 'general'
})

module.exports = User;