const fs = require("fs").promises;
const path = require("path");

const DATA_PATH = path.join(__dirname, "../../../data/items.json");

// Utility to read data
async function readData() {
  const raw = await fs.readFile(DATA_PATH);
  return JSON.parse(raw);
}

const getPaginatedItems = async (req, res, next) => {
  try {
    console.log("Fetching paginated items");
    const data = await readData();
    const { limit = 10, q, page = 1 } = req.query;
    let results = data;

    if (q) {
      results = results.filter((item) =>
        item.name.toLowerCase().includes(q.toLowerCase())
      );
    }

    const total = results.length;
    const start = (page - 1) * limit;
    const end = page * limit;
    results = results.slice(start, end);

    res.set("X-Total-Count", total);
    res.json(results);
  } catch (err) {
    next(err);
  }
};

const getItem = async (req, res, next) => {
  try {
    const data = await readData();
    const item = data.find((i) => i.id === parseInt(req.params.id));
    if (!item) {
      const err = new Error("Item not found");
      err.status = 404;
      throw err;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const postItem = async (req, res, next) => {
  try {
    const item = req.body;
    const data = await readData();
    item.id = Date.now();
    data.push(item);
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPaginatedItems,
  getItem,
  postItem,
};
