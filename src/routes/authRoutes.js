const express = require("express");
const router = express.Router();

const controller = require("../controllers/authControler");

router.post("/auth", controller.login)
router.post("/login", controller.login)

module.exports = router;