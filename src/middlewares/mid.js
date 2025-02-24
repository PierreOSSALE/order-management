const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
module.exports = (app) => {
  app.use(morgan("dev")).use(express.json()).use(cors());
};
