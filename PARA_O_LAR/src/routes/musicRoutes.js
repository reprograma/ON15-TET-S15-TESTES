const express = require("express")
const router = express.Router()

const controller = require('../controller/musicController')


router.get("/all", controller.getAllMusic)
router.post("/create", controller.createMusic)
router.put("/update/:id", controller.updateMusic)
router.delete("/delete/:id", controller.deleteMusic)


module.exports = router


