const express = require("express")
const router = express.Router()

const controller = require("../controllers/movieController")

router.get("/all", controller.getAll)
router.post("/create", controller.createMovie)
router.patch("/update/:id", controller.updateById)
router.delete("/delete/:id", controller.deleteById)

module.exports = router