const express = require("express");
const { searchTMDB } = require('../controllers/searchController');

const router = express.Router();

const authorizeRoles = require("../middleware/authorize");


router.get("/search", authorizeRoles("USER"), searchTMDB);

module.exports = router;
