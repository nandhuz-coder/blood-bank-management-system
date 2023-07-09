const express=require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { getDonorsListController, getHospitalsListController, getOrganisationsListController, deleteDonorController } = require("../controllers/adminController");
const adminmiddleware = require("../middlewares/adminmiddleware");


//Routes



const router=express.Router();
//Get Donor List
router.get("/donor-list",authmiddleware,adminmiddleware,getDonorsListController);

//get hospital list
router.get("/hospital-list",authmiddleware,adminmiddleware,getHospitalsListController);

//get organisation list
router.get("/org-list",authmiddleware,adminmiddleware,getOrganisationsListController);

//delete donor || get
router.delete("/delete-donor/:id", authmiddleware,adminmiddleware,deleteDonorController);

//delete hospital
router.delete("/delete-hospital/:id", authmiddleware,adminmiddleware,deleteDonorController);

//delete organisation
router.delete("/delete-org/:id", authmiddleware,adminmiddleware,deleteDonorController);

module.exports=router;