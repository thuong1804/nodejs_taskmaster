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
        address: '1212212',
        password: '1212212',
        gender: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'Hahahaha@hhih.com',
        username: 'John Doe',
        address: '1212212',
        password: '1212212',
        gender: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'Hahahaha@hhih.com',
        username: 'John Doe',
        address: '1212212',
        password: '1212212',
        gender: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
