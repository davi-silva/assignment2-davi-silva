const express = require("express");
const { validateItem } = require("./zod");
const {
  getPaginatedItems,
  getItem,
  postItem,
} = require("../controllers/items");
const router = express.Router();

// GET /api/items
router.get("/", getPaginatedItems);

// GET /api/items/:id
router.get("/:id", getItem);

// POST /api/items
router.post("/", validateItem, postItem);

module.exports = router;
