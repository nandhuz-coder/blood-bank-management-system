const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
const request = require("../models/request");


const createRequestController = async (req, res) => {
  try {
    const requestBlood = new request(req.body);
    await requestBlood.save();
    const requestData = await request.find({
      hospitalId: req.body.hospitalId,
      status: "pending",
    });

    return res.status(201).send({
      success: true,
      message: "Request submitted successfully",
      data: requestData
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create request API",
      error,
    });
  }
}

//Get Donor Records
const getDonorsListController = async (req, res) => {
  try {
    const donorData = await userModel
      .find({ role: "donor" })
      .sort({ createdAt: -1 });

    const requestData = await request.find({
      hospitalId: req.body.userId,
      status: "pending",
    });

    return res.status(200).send({
      userData: donorData,
      requestData: requestData,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in donor API",
      error,
    });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const id = req.params.id;
    await request.deleteOne({ _id: id })
    return res.json({
      message: "Removed successfully.",
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete request API",
      error,
    });
  }
}

module.exports = {
  getDonorsListController,
  deleteRequest,
  createRequestController
};
