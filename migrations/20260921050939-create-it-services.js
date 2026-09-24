"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("it_services", {
            id: {
                type: Sequelize.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            service_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            description: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },

            is_active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("it_services");
    },
};