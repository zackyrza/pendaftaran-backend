'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Candidates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities',
          key: 'id',
        },
      },
      classId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Classes',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.STRING
      },
      nik: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      placeOfBirth: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATE
      },
      age: {
        type: Sequelize.INTEGER
      },
      education: {
        type: Sequelize.STRING
      },
      bloodType: {
        type: Sequelize.STRING
      },
      rhesusType: {
        allowNull: true,
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.INTEGER
      },
      height: {
        type: Sequelize.INTEGER
      },
      handphone: {
        type: Sequelize.STRING
      },
      religion: {
        type: Sequelize.STRING
      },
      occupation: {
        type: Sequelize.STRING
      },
      maritalStatus: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Candidates');
  }
};