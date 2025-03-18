const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserProject = sequelize.define('usuarios_proyectos', {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'usuarios', key: 'id'}
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'proyectos', key: 'id'}
    },

}, {
    timestamps: false,
    tableName: 'usuarios_proyectos',
})

module.exports = UserProject;