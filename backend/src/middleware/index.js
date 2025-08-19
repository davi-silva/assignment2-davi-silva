const { json } = require("express");
const morgan = require("morgan");
const cors = require("cors");

const corsOptions = require("../config/cors");

module.exports = (app) => {
  app.use(cors(corsOptions));
  app.use(json());
  app.use(morgan("dev"));
};
