'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Posts', 'UserId', Sequelize.INTEGER);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Posts', 'UserId');
  }
};
