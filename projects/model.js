const Sequelize = require('sequelize');
const sequelize = require('../db');
const ToDo = require('../todos/model');

const Project = sequelize.define('projects', {
  projectName: {
    type: Sequelize.STRING,
    field: 'project_name',
    allowNull: false
  },
  responsiblePerson: {
    type: Sequelize.STRING,
    field: 'responsible_person',
    allowNull: true
  },
  todoId: {
    type: Sequelize.INTEGER,
    field: 'todo_id'
  }
},
{
  timestamps: false,
  tableName: 'projects'
});

Project.belongsTo(ToDo);

module.exports = Project;