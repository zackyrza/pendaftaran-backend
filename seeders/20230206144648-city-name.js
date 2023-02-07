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
    return queryInterface.bulkInsert('Cities', [
      {
        name: 'Barito Selatan',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Barito Timur',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Barito Utara',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Gunung Mas',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Kapuas',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Katingan',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Kotawaringin Barat',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Kotawaringin Timur',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Lamandau',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Murung Raya',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Pulang Pisau',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Sukamara',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Seruyan',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Palangkaraya',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
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
    queryInterface.bulkDelete('Cities', null, {});
  }
};
