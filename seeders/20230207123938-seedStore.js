"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Stores",
      [
        {
          name: "Store 1",
          address: "123 Main St",
          email: "store1@example.com",
          description: "This is the description for Store 1.",
          dateOpen: new Date(),
          rating: 4,
          profilePicture: "store1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Store 2",
          address: "456 Oak St",
          email: "store2@example.com",
          description: "This is the description for Store 2.",
          dateOpen: new Date(),
          rating: 5,
          profilePicture: "store2.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Store 3",
          address: "456 Oak St",
          email: "store3@example.com",
          description: "This is the description for Store 3.",
          dateOpen: new Date(),
          rating: 6,
          profilePicture: "store2.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Stores", null, {});
  },
};
