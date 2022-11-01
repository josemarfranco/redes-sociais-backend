const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControler");
const authController = require("../controllers/authControler");

router.get("/all", [authController.checkAuth, userController.getAll]);
router.post("/create", userController.createUser)
router.patch("/update/:id", [authController.checkAuth, userController.updateUserById])
router.delete("/delete/:id", [authController.checkAuth, userController.deleteUserById])

module.exports = router;