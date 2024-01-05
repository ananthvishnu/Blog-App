const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('mydatabase', 'root', 'Vishnu2002@', {
//   host: 'localhost',
//   dialect: 'mysql',
// });


const sequelize = new Sequelize('bpuimhpednzk8ebzbzxg', 'uxwbhkqhrhocxx1h', 'NXxYdz7ZXbCNhy1R6oQo', {
  host: 'bpuimhpednzk8ebzbzxg-mysql.services.clever-cloud.com',
  dialect: 'mysql'
});

module.exports = sequelize;