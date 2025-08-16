const express = require("express");
const { getDetails } = require('../controllers/detailsController');

const router = express.Router();

const authorizeRoles = require("../middleware/authorize");

router.get("/:type/:id", authorizeRoles("USER"), getDetails);

module.exports = router;
