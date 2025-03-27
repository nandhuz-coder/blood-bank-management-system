const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { createRequestController,
    deleteRequest, getuserReq,
    getDonorsListController, getIntrested,
    getDonationHistory, getDonorsListController1,
    updateDonorStatus
} = require("../controllers/inventoryController");

const router = express.Router();

router.post("/requests/create-request", authmiddleware, createRequestController);

router.get("/donor-list", authmiddleware, getDonorsListController);

router.delete("/requests/delete-request/:id", authmiddleware, deleteRequest);

router.get('/user/get-requests', authmiddleware, getuserReq);

router.post('/user/intrested', authmiddleware, getIntrested)

router.get('/donation-history', authmiddleware, getDonationHistory)

router.get('/get-donors', authmiddleware, getDonorsListController1);

router.post('/accept-donor', authmiddleware,updateDonorStatus)

module.exports = router; 