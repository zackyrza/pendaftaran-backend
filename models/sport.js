// @ts-nocheck
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sport.hasMany(models.Class, {
        foreignKey: 'sportId',
        as: 'classes',
        onDelete: 'CASCADE',
      });
    }
  }
  Sport.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    noteUrl: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Sport',
  });
  return Sport;
};