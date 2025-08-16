const express = require("express");
const router = express.Router();
const {
    getContentForUser,
    addToList,
    removeFromList
} = require("../controllers/contentController");

const authorizeRoles = require("../middleware/authorize");

router.get("/:id/watchlist", authorizeRoles("USER", "ADMIN"), getContentForUser("watchlist"));
router.get("/:id/watched",  authorizeRoles("USER", "ADMIN"), getContentForUser("watched"));

router.post("/:id/watchlist", authorizeRoles("USER"), addToList);
router.post("/:id/watched", authorizeRoles("USER"), addToList);

router.delete("/:id/watchlist/:itemId", authorizeRoles("USER"), removeFromList("watchlist", "watchlistId"));
router.delete("/:id/watched/:itemId", authorizeRoles("USER"), removeFromList("watched", "watchedId"));

module.exports = router;
