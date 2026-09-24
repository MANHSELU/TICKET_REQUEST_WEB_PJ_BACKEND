const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const Ticket_Category = sequelize.define(
  "Ticket_Category",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED, // UNSIGNED ko cho phép số âm trong my sql
      autoIncrement: true,
      primaryKey: true,
    },

    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "category_name",
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    tableName: "ticket_categories",
    timestamps: true,
    underscored: true,
  },
);

module.exports = Ticket_Category;
