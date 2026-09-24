const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const SupportTeam = sequelize.define(
    "SupportTeam",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        teamCode: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            field: "team_code",
        },

        teamName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "team_name",
        },

        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "description",
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "is_active",
        },
    },
    {
        tableName: "support_teams",
        timestamps: true,
        underscored: true,
    }
);

module.exports = SupportTeam;
