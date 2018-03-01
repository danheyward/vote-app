'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ballots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      vote: {
        type: Sequelize.STRING
      },
      sen1: {
        type: Sequelize.STRING
      },
      sen1phone: {
        type: Sequelize.STRING
      },
      sen2: {
        type: Sequelize.STRING
      },
      sen2phone: {
        type: Sequelize.STRING
      },
      rep: {
        type: Sequelize.STRING
      },
      repphone: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ballots');
  }
};