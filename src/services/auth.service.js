const jwt = require('jsonwebtoken'); //Importar libreria jsonwebtoken para generar tokens
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const RolePermission = require('../models/rolPermission.model');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET; // Obtener la clave secreta desde las variables de entorno

exports.loginUser = async (email, password) => {
    try {
        // Verificar que el usuario exista
        const user = await User.findOne({
            where: { email }
        })
        if (!user) throw new Error('Usuario no encontrado');

        // Verificar si la contraseña es corecta
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) throw new Error('Contraseña incorrecta');

        // Consultar los permisos del rol
        const rolePermissions = await RolePermission.findAll({
            where: {
                rol_id: user.rol_id,
            },
            attributes: ['permiso_id']
        });

        const permisos = rolePermissions.map(rp => rp.permiso_id);

        // Generar un token JWT
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id, permisos },
            SECRET_KEY,
            { expiresIn: '1h' }
        )

        return token;
    } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión')
    }
}

exports.loginPatient = async (numero_documento, fecha_expedicion) => {
    try {
        const Patient = require('../models/patient.model');

        const patient = await Patient.findOne({
            where: { numero_documento }
        });

        if (!patient) {
            throw new Error('Paciente no encontrado');
        }

        // Comparar fechas (asegurarse de que el formato coincida o usar librería de fechas si es necesario)
        // Sequelize devuelve fecha_expedicion como string 'YYYY-MM-DD' si es DATEONLY
        if (patient.fecha_expedicion !== fecha_expedicion) {
            throw new Error('Fecha de expedición incorrecta');
        }

        // Generar token para paciente (puede tener un rol especial o claims diferentes)
        const token = jwt.sign(
            { id: patient.id, nombre: patient.nombre, numero_documento: patient.numero_documento, role: 'Paciente' },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        return token;
    } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión del paciente');
    }
}