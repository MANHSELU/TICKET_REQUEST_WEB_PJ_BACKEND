const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const Ticket = sequelize.define(
    "Ticket",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        requesterId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: "requester_id",
        },

        itServiceId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: "it_service_id",
        },

        ticketCategoryId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: "ticket_category_id",
        },

        currentTeamId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
            field: "current_team_id",
        },

        currentAssigneeId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
            field: "current_assignee_id",
        },

        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        priority: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "MEDIUM",
        },

        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "OPEN",
        },

        firstResponseDueAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "first_response_due_at",
        },

        resolvedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "resolved_at",
        },

        closedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "closed_at",
        },
    },
    {
        tableName: "tickets",
        timestamps: true,
        underscored: true,
    }
);

module.exports = Ticket;
