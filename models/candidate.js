'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Candidate.belongsTo(models.City, {
        foreignKey: 'cityId',
        as: 'city',
        onDelete: 'CASCADE',
      });
      Candidate.belongsTo(models.Class, {
        foreignKey: 'classId',
        as: 'class',
        onDelete: 'CASCADE',
      });
    }
  }
  Candidate.init({
    name: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    nik: DataTypes.STRING,
    gender: DataTypes.STRING,
    placeOfBirth: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    age: DataTypes.INTEGER,
    education: DataTypes.STRING,
    bloodType: DataTypes.STRING,
    rhesusType: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    handphone: DataTypes.STRING,
    religion: DataTypes.STRING,
    occupation: DataTypes.STRING,
    maritalStatus: DataTypes.STRING,
    email: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Candidate',
  });
  return Candidate;
};