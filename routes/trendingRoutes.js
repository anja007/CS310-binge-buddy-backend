const express = require("express");
const router = express.Router();
const { getTrending } = require("../controllers/trendingController");

const authenticateToken = require('../middleware/authenticate');
const authorizeRoles = require("../middleware/authorize");

router.get("/:type", authenticateToken, authorizeRoles("USER"), getTrending); 

module.exports = router;
