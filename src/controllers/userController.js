//src/routes/userRoutes.js

const { User, Order, Product } = require("../../src/models/association");

// Créer un utilisateur
// Créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res
      .status(201)
      .json({ message: "Utilisateur créé avec succès", data: user });
  } catch (err) {
    console.error(err); // Log the error for debugging
    if (
      err.name === "SequelizeValidationError" ||
      err.name === "SequelizeUniqueConstraintError"
    ) {
      const messages = err.errors.map((err) => err.message);
      res
        .status(400)
        .json({ message: "Erreur de validation", errors: messages });
    } else {
      res.status(500).json({
        message: "Erreur lors de la création de l'utilisateur",
        err: err.message,
      });
    }
  }
};
// Récupérer un utilisateur spécifique
exports.findUserByPk = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur trouvé", data: user });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'utilisateur",
      error: err.message,
    });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const user = await User.findByPk(req.params.id);
    res.json({ message: "Utilisateur modifié avec succès", data: user });
  } catch (err) {
    if (
      err.name === "SequelizeValidationError" ||
      err.name === "SequelizeUniqueConstraintError"
    ) {
      // Gestion des erreurs de validation
      const messages = err.errors.map((err) => err.message);
      res.status(400).json({
        message: "Erreur de validation",
        errors: messages,
      });
    } else {
      // Gestion des autres erreurs
      res.status(500).json({
        message: "Erreur lors de la création de l'utilisateur",
        error: err.message,
      });
    }
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted)
      return res
        .status(404)
        .json({ error: `L'utilisateur ${deleted.name} non trouvé` });
    res.json({ message: `L'utilisateur ${deleted.name} supprimé` });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'utilisateur",
      error: er.message,
    });
  }
};

// Lister toutes les commandes d'un utilisateur

exports.findAllOrdersForUser = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.id },
      include: [{ model: Product }],
    });
    res.json({ message: "Commandes trouvées", data: orders });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des commandes",
      error: err.message,
    });
  }
};
