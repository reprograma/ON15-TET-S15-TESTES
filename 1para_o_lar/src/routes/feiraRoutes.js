const express = require("express");
const router = express.Router();

const controller = require("../controllers/feiraController");
const authController = require("../controllers/authController");

router.get("/all", controller.getAll);

router.post("/register", controller.registerBusiness);

router.post('/login', authController.login);

router.delete("/delete/:id", controller.deleteBusiness);

module.exports = router;