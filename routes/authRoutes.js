const express = require("express");
const { registerController, loginController, currentUserController} = require("../controllers/authController");
const authmiddleware = require("../middlewares/authmiddleware");


const router = express.Router();

//ro
router.post("/register",authmiddleware, registerController);

//LOGIN || POST
router.post("/login",authmiddleware,loginController);

router.get("/current-user",authmiddleware,currentUserController );

module.exports = router;
