const Sequelize = require('sequelize');
const sequelize = require('../db');

const ToDo = sequelize.define('todos', {
  todoName: {
    type: Sequelize.STRING,
    field: 'todo_name',
    allowNull: false
  },
  responsiblePerson: {
    type: Sequelize.STRING,
    field: 'responsible_person',
    allowNull: true
  },
},
{
  timestamps: false,
  tableName: 'todos'
});

module.exports = ToDo;