const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get("/all", controller.getAll);
router.post("/create", controller.createUser);
router.post("/login", authController.login);
router.put("/update/:id", controller.updateUser);
router.delete("/delete/:id", controller.deleteUser);

module.exports = router;