const { Sequelize} = require('sequelize');

const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(proccess.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: proccess.env.DB_HOST,
    dialect: 'postgres',
    port: proccess.env.DB_PORT,
    logging: false,
    timezone: '-05:00'
})

module.exports = sequelize;