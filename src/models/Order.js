// models/Order.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0, // Calculé lors de la création de la commande
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
