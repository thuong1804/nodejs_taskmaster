'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', [

      {
        taskTitle: 'ReactJs',
        taskDescription: 'ReactJs',
        scheduledDate: new Date(),
        completedDate: new Date(),
        reporter: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 23,
      },
      {
        taskTitle: 'PHP',
        taskDescription: 'PHP',
        scheduledDate: new Date(),
        completedDate: new Date(),
        reporter: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 23,
      },
      {
        taskTitle: 'RUBY',
        taskDescription: 'RUBY',
        scheduledDate: new Date(),
        completedDate: new Date(),
        reporter: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 23,
      },
      {
        taskTitle: 'C#',
        taskDescription: 'C#',
        scheduledDate: new Date(),
        completedDate: new Date(),
        reporter: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 23,
      },
      {
        taskTitle: 'C++',
        taskDescription: 'C++',
        scheduledDate: new Date(),
        completedDate: new Date(),
        reporter: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 23,
      },
      {
        taskTitle: 'VUE',
        taskDescription: 'VUE',
        scheduledDate: new Date(),
        completedDate: new Date(),
        reporter: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 23,
      },
      {
        taskTitle: 'Angular',
        taskDescription: 'Angular',
        scheduledDate: new Date(),
        completedDate: new Date(),
        reporter: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 23,
      },
      {
        taskTitle: 'NextJS',
        taskDescription: 'NextJS',
        scheduledDate: new Date(),
        completedDate: new Date(),
        reporter: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 23,
      },
      {
        taskTitle: 'Java',
        taskDescription: 'Java',
        scheduledDate: new Date(),
        completedDate: new Date(),
        reporter: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 23,
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
