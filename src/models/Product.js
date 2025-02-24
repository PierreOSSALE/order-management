// src/models/Product.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Le nom ne doit pas être vide",
      },
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: [0.01],
        msg: "Le prix doit être supérieur à 0",
      },
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: "Le stock doit être supérieur ou égal à 0",
      },
    },
  },
});

module.exports = Product;
