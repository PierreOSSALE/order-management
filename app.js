const express = require("express");
const userRoutes = require("./src/routes/userRoute");
const productRoutes = require("./src/routes/productRoute");
const orderRoutes = require("./src/routes/orderRoute");

const app = express();

require("dotenv").config();
require("./src/middlewares/mid")(app);

// Add the body parsing middleware
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

const port = process.env.DB_PORT || 3000;

app.listen(port, () => {
  console.log(`Serveur démarré sur le port: http://localhost:${port}`);
});
