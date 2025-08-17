const express = require("express");
const router = express.Router();
const {
    getContentForUser,
    addToList,
    removeFromList
} = require("../controllers/contentController");

const authenticateToken = require('../middleware/authenticate');
const authorizeRoles = require("../middleware/authorize");

router.use(authenticateToken, authorizeRoles("USER"));

router.get("/:id/watchlist", getContentForUser("watchlist"));
router.get("/:id/watched",  getContentForUser("watched"));

router.post("/:id/watchlist", addToList);
router.post("/:id/watched", addToList);

router.delete("/:id/watchlist/:itemId", removeFromList("watchlist", "watchlistId"));
router.delete("/:id/watched/:itemId", removeFromList("watched", "watchedId"));

module.exports = router;
