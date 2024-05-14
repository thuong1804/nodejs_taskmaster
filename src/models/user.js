'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
      User.belongsTo(models.Group)
      User.hasMany(models.Notification, { foreignKey: 'userId' });
    }
  }
  User.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    birthDay: DataTypes.DATE,
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};