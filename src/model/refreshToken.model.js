const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const RefreshToken = sequelize.define(
    "RefreshToken",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        userId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            unique: true,
            field: "user_id",
        },

        token: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "expires_at",
        },
    },
    {
        tableName: "refresh_tokens",
        timestamps: true,
        underscored: true,
    }
);

module.exports = RefreshToken;
