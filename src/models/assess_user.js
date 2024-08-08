'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assess_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Assess_User.init({
    userId: DataTypes.STRING,
    notificationId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Assess_User',
  });
  return Assess_User;
};