const express = require("express");
const { searchMovies, searchTVShows } = require('../controllers/searchController');

const router = express.Router();

router.get("/search/movies", searchMovies);
router.get("/search/tvShows", searchTVShows);

module.exports = router;
