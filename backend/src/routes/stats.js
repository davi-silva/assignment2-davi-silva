const express = require("express");
const { getStats } = require("../controllers/stats");

const router = express.Router();

// GET /api/stats
router.get("/", getStats);

module.exports = router;
