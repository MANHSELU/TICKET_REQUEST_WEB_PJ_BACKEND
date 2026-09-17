"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                type: Sequelize.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            full_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            phone: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },

            email: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: true,
            },

            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },

            role: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1,
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
        await queryInterface.dropTable("users");
    },
};