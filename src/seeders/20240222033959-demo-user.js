'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        email: 'Hahahaha@hhih.com',
        username: 'John Doe',
        password: '1212212',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'bebbee@hhih.com',
        username: 'John @@',
        password: '1212212',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'kakkaaa@hhih.com',
        username: 'John ccc',
        password: '1212212',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
