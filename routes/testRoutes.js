const express=require("express");
const { testController } = require("../controllers/testController");

const router=express.Router();

router.get("/",testController);

//export the routes that we put in this file
module.exports=router;
