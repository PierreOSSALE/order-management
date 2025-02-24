const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    logging: console.log,
    dialectOptions: {
      timezone: "+02:00", // ou le format adapté à vos besoins
    },
  }
);

// Export the sequelize instance
module.exports = sequelize;
