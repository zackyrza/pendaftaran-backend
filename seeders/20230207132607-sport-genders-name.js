'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    queryInterface.bulkInsert('SportGenders', [
      {
        name: 'Putra',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }, {
        name: 'Putri',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }, {
        name: 'Campuran',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('SportGenders', null, {});
  }
};
