"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tickets", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      requester_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      it_service_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "it_services",
          key: "id",
        },
        onDelete: "RESTRICT",
      },

      ticket_category_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "ticket_categories",
          key: "id",
        },
        onDelete: "RESTRICT",
      },

      current_team_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: "support_teams",
          key: "id",
        },
        onDelete: "SET NULL",
      },

      current_assignee_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
      },

      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      priority: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "MEDIUM",
      },

      status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "OPEN",
      },

      first_response_due_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      resolved_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      closed_at: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable("tickets");
  },
};
