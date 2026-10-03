const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database.config");
const ItServiceCategory = require("./itServiceCategory.model");

const It_Service = sequelize.define(
  "It_Service",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED, // UNSIGNED ko cho phép số âm trong my sql
      autoIncrement: true,
      primaryKey: true,
    },

    service_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "service_name",
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

    itServiceCategoryId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      field: "it_service_category_id",
    },
  },
  {
    tableName: "it_services",
    timestamps: true,
    underscored: true,
  },
);

It_Service.belongsTo(ItServiceCategory, {
  foreignKey: "itServiceCategoryId",
  as: "category",
});

module.exports = It_Service;
