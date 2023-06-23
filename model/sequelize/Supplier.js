const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Supplier = sequelize.define('Supplier', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierac od 2 do 60 znaków"
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Pole powinno zawierać prawidłowy adres email zgodny ze wzorcem"
            },
        }
    },
});

module.exports = Supplier;