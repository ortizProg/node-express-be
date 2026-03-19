const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserHealtCenter = sequelize.define('usuarios_centros_salud', {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'usuarios', key: 'id'}
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'centros_salud', key: 'id'}
    },

}, {
    timestamps: false,
    tableName: 'usuarios_centros_salud',
})

module.exports = UserHealtCenter;