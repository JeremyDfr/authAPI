const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const Role = require('../Models/Role')(sequelize, DataTypes)
const User = require('../Models/User')(sequelize, DataTypes)

sequelize.authenticate()
    .then(() => {
        Role.hasMany(User)
        User.belongsTo(Role)
        Role.sync()
        User.sync()
    })
    .catch(error => {
        console.log(error)
    })

module.exports = { User, Role }