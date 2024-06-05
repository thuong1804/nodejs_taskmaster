'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Notification extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Notification.belongsTo(models.User, { foreignKey: 'userId' });

		}
	}
	Notification.init({
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		userId: DataTypes.NUMBER,
		date: DataTypes.DATE,
		link: DataTypes.STRING,
		seen: DataTypes.BOOLEAN,
		userId: DataTypes.NUMBER,
		createBy: DataTypes.NUMBER,
	}, {
		sequelize,
		modelName: 'Notification',
	});
	return Notification;
};