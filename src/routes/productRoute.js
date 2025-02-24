//src/controllers/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/products", productController.createProduct);
router.get("/products", productController.findAllProducts);
router.get("/products/:id", productController.findProductByPk);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);
router.get("/product", productController.findProductsByPriceRange);
router.get(
  "/products/top/most-ordered",
  productController.findTopSellingProducts
);

module.exports = router;
