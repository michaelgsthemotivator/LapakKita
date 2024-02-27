'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('Stores', 'profilePicture', {
      type: Sequelize.STRING
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Stores', 'profilePicture', {})
  }
};
