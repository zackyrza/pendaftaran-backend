// @ts-nocheck
'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Registration, {
        foreignKey: 'userId',
        as: 'registrations',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) {
        const hash = bcrypt.hashSync(value, 8);
        this.setDataValue("password", hash);
      }
    },
    fullName: DataTypes.STRING,
    role: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });

  User.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  User.isValidPassword = function (password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  return User;
};