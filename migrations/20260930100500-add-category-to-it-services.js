'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("it_services", "it_service_category_id", {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: "it_service_categories",
        key: "id",
      },
      onDelete: "SET NULL",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("it_services", "it_service_category_id");
  }
};
