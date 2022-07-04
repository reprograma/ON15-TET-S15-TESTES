const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const authController = require("../controllers/authController")

const {checkAuth} = require("../middlewares/auth")

router.post("/signup", controller.signup);
router.post('/login', authController.login);
router.get("/all", controller.getUsers);
router.get('/user/:id', controller.getUserById);
router.patch('/update-password/:id', controller.updateUserPassword);
router.put('/update-user/:id', controller.updateUser);
router.delete('/delete/:id', controller.deleteById);

module.exports = router;

 