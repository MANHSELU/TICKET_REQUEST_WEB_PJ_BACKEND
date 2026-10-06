const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");
const User = require("./users.model");

const Announcement = sequelize.define(
    "Announcement",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        authorId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: "author_id",
        },

        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        imageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "image_url",
        },
    },
    {
        tableName: "announcements",
        timestamps: true,
        underscored: true,
    }
);

Announcement.belongsTo(User, {
    foreignKey: "authorId",
    as: "author",
});

module.exports = Announcement;
