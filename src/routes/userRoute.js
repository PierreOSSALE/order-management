//src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users", userController.createUser);
router.get("/users/:id", userController.findUserByPk);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.get("/users/:id/orders", userController.findAllOrdersForUser);

module.exports = router;
