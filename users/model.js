const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('usersPro', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'usersPro'
})

module.exports = User