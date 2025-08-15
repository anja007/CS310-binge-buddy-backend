const express = require("express");
const { searchTMDB } = require('../controllers/searchController');

const router = express.Router();

router.get("/search", searchTMDB);

module.exports = router;
