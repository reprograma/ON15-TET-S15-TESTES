const express = require('express')

const router = express.Router()

const controller = require("../controller/artistController")
const authController = require("../controller/authController");


router.get("/all", controller.getAll);
router.get("/create", controller.createArtist);
router.post("/login", authController.login);
router.post('/login', authController.login);

router.patch("/update/:id", controller.updateArtistById);

router.delete("/delete/:id", controller.deleteArtistById);

module.exports = router;