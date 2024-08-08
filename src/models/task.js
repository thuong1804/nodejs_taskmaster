'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User)
    }
  }
  Task.init({
    userId: DataTypes.NUMBER,
    taskTitle: DataTypes.STRING,
    taskDescription: DataTypes.STRING,
    scheduledDate: DataTypes.DATE,
    completedDate: DataTypes.DATE,
    reporter: DataTypes.NUMBER,
    owner: DataTypes.NUMBER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};