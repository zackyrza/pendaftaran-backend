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
    return queryInterface.bulkInsert('Sports', [
      {
        name: 'Atletik',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Balap Motor',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Bulu Tangkis',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Basket',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Bola Voli',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Bina Raga',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Bride',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Bilyard',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Catur',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Dayung',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Drum Band',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Karate',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Korf Ball',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Menembak',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Panahan',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Panjat Tebing',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Pencak Silat',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Senam',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Sepak Takraw',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Sepak Bola',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Futsal',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Sepatu Roda',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Tenis Meja',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Tenis Lapangan',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Tinju',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Taekwondo',
        deletedAt: null,
        noteUrl: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('Sports', null, {});
  }
};
