const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patient = sequelize.define('pacientes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_expedicion: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    numero_documento: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
    tableName: 'pacientes',
});

module.exports = Patient;
