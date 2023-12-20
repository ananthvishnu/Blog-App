const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydatabase', 'root', 'Vishnu2002@', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;