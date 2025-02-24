// models/OrderProduct.js
const { DataTypes, Op } = require("sequelize");
const sequelize = require("../config/database");

module.exports = sequelize.define(
  "OrderProduct",
  {
    quantity: {
      type: DataTypes.INTEGER,
      field: "quantity", // Force le nom de colonne
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: "La quantité doit être supérieure à 0",
        },
      },
    },
  },
  {
    tableName: "order_products", // Nom explicite de la table
  }
);
