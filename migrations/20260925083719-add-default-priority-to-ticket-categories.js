'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("ticket_categories", "default_priority", {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "MEDIUM",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("ticket_categories", "default_priority");
  }
};
