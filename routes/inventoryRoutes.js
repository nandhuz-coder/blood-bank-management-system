const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryHospitalController, getRecentBloodRecord } = require("../controllers/inventoryController");
const router = express.Router();

//ADD INVENTORY
router.post("/create-inventory",authmiddleware,createInventoryController);


//Get all blood records

router.get("/get-inventory",authmiddleware,getInventoryController);

//Get all blood records

router.get("/get-recent-inventory",authmiddleware,getRecentBloodRecord);

//Get hospital blood records
router.post("/get-inventory-hospital",authmiddleware,getInventoryHospitalController);

//get donar records

router.get("/get-donors",authmiddleware,getDonarsController)

//get hospital records
//get donar records

router.get("/get-hospitals",authmiddleware,getHospitalController);

//get organisation
router.get("/get-organisation",authmiddleware,getOrganisationController);

//get organisation for hospital
router.get("/get-organisation-for-hospital",authmiddleware,getOrganisationForHospitalController);
module.exports=router;