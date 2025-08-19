const items = require("./items");
const stats = require("./stats");

module.exports = (app) => {
  app.use("/items", items);
  app.use("/stats", stats);
};
