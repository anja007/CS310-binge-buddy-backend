const express = require("express");
const { getDetails } = require('../controllers/detailsController');

const router = express.Router();

const authenticateToken = require('../middleware/authenticate');
const authorizeRoles = require("../middleware/authorize");

router.get("/:type/:id", authenticateToken, authorizeRoles("USER"), getDetails);

module.exports = router;
