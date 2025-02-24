// src/models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Le nom ne doit pas être vide",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: {
      msg: "Cet email est déjà utilisé",
    },
    allowNull: false,
    validate: {
      isEmail: {
        msg: "L'email n'est pas valide",
      },
      customValidator(value) {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,30}$/.test(value)) {
          throw new Error(
            "L'email ne respecte pas le format attendu, exemple: exemple@gmail.com"
          );
        }
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6], // Longueur minimale de 6 caractères
        msg: "Le mot de passe doit être au moins de 6 caractères",
      },
    },
  },
});
