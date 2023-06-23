const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-projekt-Osiak-s22852-sequelize','root','root', {
    dialect: "mysql",
    host: 'localhost'
});

module.exports = sequelize;