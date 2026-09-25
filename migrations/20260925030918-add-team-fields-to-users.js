'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "team_id", {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: "support_teams",
        key: "id",
      },
      onDelete: "SET NULL",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "team_id");
  }
};
