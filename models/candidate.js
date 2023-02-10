// @ts-nocheck
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
      Candidate.belongsTo(models.Registration, {
        foreignKey: 'registrationId',
        as: 'registration',
        onDelete: 'CASCADE',
      });
    }
  }
  Candidate.init({
    name: DataTypes.STRING,
    registrationId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    nik: DataTypes.STRING,
    photo: DataTypes.STRING,
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