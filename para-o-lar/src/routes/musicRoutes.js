const controller = require("../controller/musicController")

const express = require("express")

const router = express.Router()

router.post("/music/create", controller.createMusic)
router.get("/musics", controller.findAllMusic)
router.get("/music/:id", controller.findById)
router.patch("/update/:id", controller.updateById)
router.delete("/delete/:id", controller.deleteById)

module.exports = router