const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const AccountVerification = sequelize.define(
    "AccountVerification",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        userId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: "user_id",
        },

        otp: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "expires_at",
        },
    },
    {
        tableName: "account_verifications",
        timestamps: true,
        underscored: true,
    }
);

module.exports = AccountVerification;
