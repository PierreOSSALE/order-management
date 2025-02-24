# 🚀 API de Gestion des Commandes

[![Build Status](https://img.shields.io/travis/user/repo/master.svg)](https://travis-ci.org/user/repo)
[![Dependencies](https://img.shields.io/david/user/repo.svg)](https://david-dm.org/user/repo)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

API REST pour la gestion de commandes avec Node.js, Express et Sequelize

## 📋 Table des matières
- [Fonctionnalités](#-fonctionnalités)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Variables d'environnement](#-variables-denvironnement)
- [Endpoints API](#-endpoints-api)
- [Requêtes complexes](#-requêtes-complexes)
- [Validations](#-validations)
- [Associations](#-associations)
- [Tests](#-tests)
- [Contribuer](#-contribuer)
- [Licence](#-licence)

## 🌟 Fonctionnalités
- Gestion complète des utilisateurs, produits et commandes
- Validation des données côté serveur
- Transactions sécurisées pour les commandes
- Calcul automatique du montant total des commandes
- Gestion des stocks en temps réel

## 🛠 Prérequis
- Node.js v14+
- npm v7+
- MySQL 8+
- Postman/Thunder Client (pour les tests)

## 🚀 Installation
```bash
# Cloner le dépôt
git clone https://github.com/votre-utilisateur/order-management-api.git

# Installer les dépendances
cd order-management-api
npm install

# Créer la base de données MySQL
mysql -u root -p -e "CREATE DATABASE order_management"

# Démarrer le serveur
npm run dev
