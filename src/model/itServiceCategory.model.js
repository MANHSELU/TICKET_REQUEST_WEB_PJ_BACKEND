const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");

const ItServiceCategory = sequelize.define(
  "ItServiceCategory",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    categoryName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: "category_name",
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
    tableName: "it_service_categories",
    timestamps: true,
    underscored: true,
  },
);

module.exports = ItServiceCategory;
