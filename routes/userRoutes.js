const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");

const authenticateToken = require('../middleware/authenticate');
const authorizeRoles = require("../middleware/authorize");

router.get("/all", authenticateToken, authorizeRoles("ADMIN"), getAllUsers);

module.exports = router;
