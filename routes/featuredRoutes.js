const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticate');
const authorizeRoles = require("../middleware/authorize");
const {
  getFeatured,
  addFeatured,
  updateFeatured,
  deleteFeatured
} = require("../controllers/featuredController");

router.get("/all", authenticateToken, authorizeRoles("ADMIN", "USER"), getFeatured);

router.post("/add", authenticateToken, authorizeRoles("ADMIN"), addFeatured);

router.put("/:id", authenticateToken, authorizeRoles("ADMIN"), updateFeatured);

router.delete("/:id", authenticateToken, authorizeRoles("ADMIN"), deleteFeatured);

module.exports = router;
