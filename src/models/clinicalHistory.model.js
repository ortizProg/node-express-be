const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ClinicalHistory = sequelize.define('historias_clinicas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    centro_salud_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    archivo_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true, // Adding timestamps for createdAt/updatedAt is usually good practice, but user didn't specify. Defaulting to true or matching user.model pattern.
    // User model has timestamps: false. Let's stick to that if not specified, but usually history needs timestamps.
    // Let's check user model again. It has timestamps: false.
    // I'll set timestamps: true for this one as it's a history record, useful to know when created.
    tableName: 'historias_clinicas',
});

module.exports = ClinicalHistory;
