// src/models/associations.js
const sequelize = require("../config/database");
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const OrderProduct = require("./OrderProduct");

User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(OrderProduct, {
  foreignKey: "productId",
  as: "ProductOrders", // Nouvel alias
});

// Garder la relation many-to-many si nécessaire ailleurs
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: "productId",
  as: "Orders",
});
// Assurez-vous d'avoir cette association dans models/index.js
sequelize
  .sync({ force: false })
  .then(() =>
    console.log("Les modèles ont bien été synchronisés avec la base de données")
  )
  .catch((err) => console.error("Erreur lors de la synchronisation :", err));

module.exports = { User, Product, Order, OrderProduct };

// Importez tous les modèles d'abord
