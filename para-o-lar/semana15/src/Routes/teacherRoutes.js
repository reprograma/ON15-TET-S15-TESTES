const express = require("express");
const router = express.Router();

const controller = require("../Controller/teacherController");

router.get("/all", controller.getAllTeacher);

router.post("/create", controller.createTeacher);

router.put("/update/:id", controller.updateTeacher);

router.delete("/delete/:id", controller.deleteTeacher);

module.exports = router;