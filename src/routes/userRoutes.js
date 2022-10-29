const express = require("express");
const router = express.Router();

const controller = require("../controllers/userControler");

router.get("/all", controller.getAll);
router.post("/create", controller.createUser)
router.patch("/update/:id", controller.updateUserById)

module.exports = router;