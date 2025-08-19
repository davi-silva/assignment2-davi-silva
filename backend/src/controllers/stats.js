const fs = require("fs").promises;
const path = require("path");
const { createCache } = require("../utils/cache");
const { mean } = require("../utils/stats");
const DATA_PATH = path.join(__dirname, "../../data/items.json");

async function calculateStats() {
  const raw = await fs.readFile(DATA_PATH);
  const items = JSON.parse(raw);
  return {
    total: items.length,
    averagePrice: mean(items.map((i) => i.price)),
  };
}

const cache = createCache(DATA_PATH, calculateStats);

const getStats = async (req, res, next) => {
  try {
    const stats = await cache.get();
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStats,
};
