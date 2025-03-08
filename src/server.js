const sequelize = require('./config/database')
const app = require('./app');
const dotenv = require('dotenv');
require('./models/associations');

dotenv.config();

const PORT = proccess.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgresSQL con sequelize');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        })
    }).catch(err => console.error('Error conectando a la base de datos', err))

sequelize.sync({force: false}).then(() => {
    console.log('Base de datos sincronizada')
}).catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
})