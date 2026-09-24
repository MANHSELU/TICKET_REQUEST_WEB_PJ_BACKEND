"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("it_services", "description", {
            type: Sequelize.STRING(255),
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("it_services", "description", {
            type: Sequelize.STRING(15),
            allowNull: false,
            unique: true,
        });
    },
};
