// @ts-nocheck
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SportGender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SportGender.hasMany(models.Registration, {
        foreignKey: 'sportGenderId',
        as: 'registrations',
        onDelete: 'CASCADE',
      });
    }
  }
  SportGender.init({
    name: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SportGender',
  });
  return SportGender;
};