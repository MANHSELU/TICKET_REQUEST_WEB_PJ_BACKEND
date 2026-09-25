const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const TicketAttachment = sequelize.define(
    "TicketAttachment",
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

        fileUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "file_url",
        },

        fileName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "file_name",
        },
    },
    {
        tableName: "ticket_attachments",
        timestamps: true,
        underscored: true,
    }
);

module.exports = TicketAttachment;
