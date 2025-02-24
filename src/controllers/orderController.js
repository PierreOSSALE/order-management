//orderController.js
const {
  Order,
  User,
  Product,
  OrderProduct,
} = require("../../src/models/association");

exports.createOrder = async (req, res) => {
  /* Exemple d'attendu dans le body :
    {
      "userId": 1,
      "products": [
          { "id": 2, "quantity": 3 },
          { "id": 5, "quantity": 1 }
      ]
    }
  */
  try {
    const { userId, products } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    let totalAmount = 0;
    const orderProducts = [];

    // Vérification du stock pour chaque produit
    for (const prod of products) {
      const product = await Product.findByPk(prod.id);
      if (!product)
        return res.status(404).json({ error: `Produit ${prod.id} non trouvé` });
      if (product.stock < prod.quantity) {
        return res
          .status(400)
          .json({ error: `Stock insuffisant pour le produit ${product.name}` });
      }
      totalAmount += product.price * prod.quantity;
      orderProducts.push({ product, quantity: prod.quantity });
    }

    // Création de la commande
    const order = await Order.create({ userId, totalAmount });

    // Ajout des produits dans la commande et mise à jour du stock
    for (const op of orderProducts) {
      await OrderProduct.create({
        orderId: order.id,
        productId: op.product.id,
        quantity: op.quantity,
      });
      // Mise à jour du stock
      op.product.stock -= op.quantity;
      await op.product.save();
    }

    res.status(201).json({ order, orderProducts });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer une commande avec les produits associés

exports.findOrderByPk = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: Product, through: { attributes: ["quantity"] } }],
    });
    if (!order) return res.status(404).json({ error: "Commande non trouvée" });
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
