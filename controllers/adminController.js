const userModel = require("../models/userModel");

//Get Donor Records
const getDonorsListController = async (req, res) => {
  try {
    const donorData = await userModel
      .find({ role: "donor" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      Totalcount: donorData.length,
      message: "Donor List Fetched Successfully",
      donorData
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

//Get Hospital records
const getHospitalsListController = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      Totalcount: hospitalData.length,
      message: "Hospital List Fetched Successfully",
      hospitalData
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Hospital API",
      error,
    });
  }
};
//Delete donor

const deleteDonorController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Record deleted Successfully"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete API",
      error
    })
  }
}


module.exports = { getDonorsListController, getHospitalsListController, deleteDonorController };
