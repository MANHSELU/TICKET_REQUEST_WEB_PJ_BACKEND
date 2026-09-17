const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED, // UNSIGNED ko cho phép số âm trong my sql
      autoIncrement: true,
      primaryKey: true,
    },

    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "full_name",
    },

    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    role: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    imgUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "img_url",
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_active",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
  },
);

module.exports = User;
