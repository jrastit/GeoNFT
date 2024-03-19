const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('./config.js')
const db = {}
const models = path.join(__dirname, 'models') // correct it to path where your model files are


console.error("config:", config);

const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: 'postgres',
  port: config.database.port,
  logging: false,
});

sequelize.query("")

module.exports = sequelize;