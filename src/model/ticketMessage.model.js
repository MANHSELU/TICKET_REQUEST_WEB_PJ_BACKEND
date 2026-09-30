const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const TicketMessage = sequelize.define(
    "TicketMessage",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        ticketId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: "ticket_id",
        },

        senderId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: "sender_id",
        },

        message: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
    },
    {
        tableName: "ticket_messages",
        timestamps: true,
        underscored: true,
    }
);

module.exports = TicketMessage;
