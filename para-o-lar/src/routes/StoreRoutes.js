const express = require("express");
const router = express.Router();

const controller = require("../controllers/StoreController");
const authController = require("../controllers/authController");


router.get("/all", controller.getAll);

router.post("/create", controller.createStoreUser);

router.post('/login', authController.login);

router.put("/update/:id", controller.updateStore);

router.delete("/delete/:id", controller.deleteStoreUser)

module.exports = router;