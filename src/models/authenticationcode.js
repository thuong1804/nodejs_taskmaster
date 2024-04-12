'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthenticationCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here
    }
  }
  AuthenticationCode.init({
    code: DataTypes.STRING,
    emailUser: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AuthenticationCode',
    timestamps: false
  });
  return AuthenticationCode;
};