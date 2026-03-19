const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HealtCenter = sequelize.define('centros_salud', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'usuarios', key: 'id'}
    },
    nombre: {type: DataTypes.STRING, allowNull: false},
    descripcion: {type: DataTypes.STRING, allowNull: false},
    fecha_de_creacion: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
}, {
    timestamps: false,
    tableName: 'centros_salud',
    hooks: {
        afterCreate: (healtCenter, options) => {
            if(healtCenter.fecha_de_creacion) {
                healtCenter.fecha_de_creacion.setHours(healtCenter.fecha_de_creacion.getHours() - 5)
            }
        }
    }
})

module.exports = HealtCenter;