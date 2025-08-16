const express = require("express");
const { searchTMDB } = require('../controllers/searchController');

const router = express.Router();

const authenticateToken = require('../middleware/authenticate');
const authorizeRoles = require("../middleware/authorize");


router.get("/search", authenticateToken, authorizeRoles("USER"), searchTMDB);

module.exports = router;
