//src/controllers/productController.js
const { fn, col, Op } = require("sequelize");
const { Product, OrderProduct } = require("../../src/models/association");
const sequelize = require("../../src/config/database");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      message: "Produit créé avec succès",
      data: product,
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({
        errors: { message: "Erreur de validation", error: messages },
      });
    } else {
      res.status(500).json({
        error: {
          message: "Erreur lors de la création du produit",
          error: error.message,
        },
      });
    }
  }
};

exports.findAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    if (!products) {
      return res.status(404).json({ message: "Aucun produit trouvé" });
    }
    res.status(200).json({
      message: "Liste de tous les produits récupérée avec succès",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: "Erreur lors de la récupération des produits",
        error: err.message,
      },
    });
  }
};

exports.findProductByPk = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    res.status(200).json({
      message: "Produit récupéré avec succès",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: "Erreur lors de la récupération du produit",
        error: err.message,
      },
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    const product = await Product.findByPk(req.params.id);
    res
      .status(200)
      .json({ message: "Produit mis à jour avec succès", data: product });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({
        errors: { message: "Erreur de validation", error: messages },
      });
    } else {
      res.status(500).json({
        error: {
          message: "Erreur lors de la création du produit",
          error: error.message,
        },
      });
    }
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Produit non trouvé" });
    res.json({ message: "Produit supprimé" });
  } catch (err) {
    res.status(400).json({
      error: {
        message: "Erreur lors de la suppression du produit",
        error: err.message,
      },
    });
  }
};

// Lister tous les produits avec option de filtrage par prix
exports.findProductsByPriceRange = async (req, res) => {
  try {
    const filter = {};
    if (req.query.minPrice) {
      filter.price = { [Op.gt]: req.query.minPrice };
    }
    const products = await Product.findAll({ where: filter });
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer les 5 produits les plus commandés

exports.findTopSellingProducts = async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        p.id,
        p.name,
        SUM(op.quantity) AS totalOrdered
      FROM Products p
      INNER JOIN order_products op ON p.id = op.productId
      GROUP BY p.id
      ORDER BY totalOrdered DESC
      LIMIT 5
    `);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
