const express = require('express')
const router = express.Router()

const controller = require('../controller/userController')
const authcontroller = require("../controller/authController")



// router.get("/all", controller.findAllfilms)

// router.post("/film/create", controller.createFilm)

router.get("/all", controller.getAll)
router.post("/create/user", controller.createUser)
router.post("/login", authcontroller.login)
router.patch("/update/:id", controller.updateUserById);
router.delete("/delete/:id", controller.deleteUserById);

// router.post("/login", authcontroller.login)

// router.delete("/delete/:id", controller.deleteFilm)

// router.put("/update/:id", controller.updateFilm)

module.exports = router
