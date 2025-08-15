const express = require("express");
const { getDetails } = require('../controllers/detailsController');

const router = express.Router();

router.get("/:type/:id", getDetails);

module.exports = router;
