const express = require("express");
const router = express.Router();
const {
    getContentForUser,
    addToList,
    removeFromList
} = require("../controllers/contentController");

const authenticateToken = require('../middleware/authenticate');
const authorizeRoles = require("../middleware/authorize");

router.get("/:id/watchlist", authenticateToken, authorizeRoles("USER", "ADMIN"), getContentForUser("watchlist"));
router.get("/:id/watched",  authenticateToken, authorizeRoles("USER", "ADMIN"), getContentForUser("watched"));

router.post("/:id/watchlist", authenticateToken, authorizeRoles("USER"), addToList);
router.post("/:id/watched", authenticateToken, authorizeRoles("USER"), addToList);

router.delete("/:id/watchlist/:itemId", authenticateToken, authorizeRoles("USER"), removeFromList("watchlist", "watchlistId"));
router.delete("/:id/watched/:itemId", authenticateToken, authorizeRoles("USER"), removeFromList("watched", "watchedId"));

module.exports = router;
