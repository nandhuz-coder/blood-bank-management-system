const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
//const { bloodGroupDetailsController } = require("../controllers/analyticsController");

const router = express.Router();



//get blood data

router.get("/bloodGroups-data", authmiddleware)


module.exports = router;