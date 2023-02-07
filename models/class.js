// @ts-nocheck
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.Sport, {
        foreignKey: 'sportId',
        as: 'sport',
        onDelete: 'CASCADE',
      });
    }
  }
  Class.init({
    name: DataTypes.STRING,
    sportId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};