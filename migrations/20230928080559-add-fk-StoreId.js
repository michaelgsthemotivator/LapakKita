'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Products', 'StoreId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Stores',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Products', 'StoreId', {})
  }
};
