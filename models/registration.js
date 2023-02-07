// @ts-nocheck
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Registration.belongsTo(models.City, { foreignKey: 'cityId' });
      Registration.belongsTo(models.Sport, { foreignKey: 'sportId' });
      Registration.belongsTo(models.Class, { foreignKey: 'classId' });
      Registration.belongsTo(models.SportGender, { foreignKey: 'sportGenderId' });
      Registration.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Registration.init({
    quantity: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,
    sportId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    sportGenderId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Registration',
  });
  return Registration;
};