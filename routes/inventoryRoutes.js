const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { createRequestController,
    deleteRequest,
    getDonorsListController
} = require("../controllers/inventoryController");

const router = express.Router();

router.post("/requests/create-request", authmiddleware, createRequestController);

router.get("/donor-list", authmiddleware, getDonorsListController);

router.delete("/requests/delete-request/:id", authmiddleware, deleteRequest)

module.exports = router;