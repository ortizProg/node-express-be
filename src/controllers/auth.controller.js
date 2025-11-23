const authService = require('../services/auth.service');

//Iniciar sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await authService.loginUser(email, password);
        res.status(200).json({ message: 'Inicio de sesión exitoso', token })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Iniciar sesión paciente
exports.loginPatient = async (req, res) => {
    const { numero_documento, fecha_expedicion } = req.body;
    try {
        console.log(numero_documento, fecha_expedicion);
        const token = await authService.loginPatient(numero_documento, fecha_expedicion);
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}