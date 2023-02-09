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
      Registration.belongsTo(models.City, { foreignKey: 'cityId', as: 'city', onDelete: 'CASCADE' });
      Registration.belongsTo(models.Class, { foreignKey: 'classId', as: 'class', onDelete: 'CASCADE' });
      Registration.belongsTo(models.SportGender, { foreignKey: 'sportGenderId', as: 'sportGender', onDelete: 'CASCADE' });
      Registration.belongsTo(models.User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
      Registration.hasMany(models.Candidate, { foreignKey: 'registrationId', as: 'candidates', onDelete: 'CASCADE' })
    }
  }
  Registration.init({
    quantity: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,
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