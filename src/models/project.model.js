const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Project = sequelize.define('proyectos', {
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
    tableName: 'proyectos',
    hooks: {
        afterCreate: (project, options) => {
            if(project.fecha_de_creacion) {
                project.fecha_de_creacion.setHours(project.fecha_de_creacion.getHours() - 5)
            }
        }
    }
})

module.exports = Project;