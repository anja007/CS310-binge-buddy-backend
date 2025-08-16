const express = require("express");
const router = express.Router();
const { getTrending } = require("../controllers/trendingController");

const authorizeRoles = require("../middleware/authorize");

router.get("/:type", authorizeRoles("USER"), getTrending); 

module.exports = router;
